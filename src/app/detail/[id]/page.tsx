'use client'

import { use, useEffect, useState } from 'react'
import dispatchDetail, {
  DetailResponse,
  MediaView,
} from '@/shared/utils/dispatchDetail'
import retrieveExtraSectionById from '@/lib/api/ExtraSection/retrieve'
import Spinner from '@/shared/ui/Spinner'
import { TrashIcon } from 'lucide-react'
import updateMediaByData from '@/lib/api/Media/update'
import { notFound } from 'next/navigation'
import MediaPoster from '@/features/detail/media-poster/components/MediaPoster'
import MediaInfo from '@/features/detail/extra-info/components/MediaInfo'
import ToastEditMode from '@/features/detail/edit-mode/components/ToastEditMode'
import DeleteConfirmModal from '@/features/detail/modals/components/DeleteConfirmModal'
import { Modal } from '@/shared/ui/Modal'

interface PageProps {
  params: Promise<{ id: string }>
}

function Page({ params }: PageProps) {
  const [data, setData] = useState<DetailResponse>()

  const { id } = use(params)

  useEffect(() => {
    dispatchDetail(id, setData)
  }, [id])

  const [, setExtraSectionData] = useState([])

  useEffect(() => {
    if (!data || 'error' in data) return

    async function fetchData(id: number) {
      const result = await retrieveExtraSectionById(id)
      if ('error' in result) {
        setExtraSectionData([])
      } else {
        setExtraSectionData(result)
      }
    }

    if (data) {
      fetchData(data.categoryId)
    }
  }, [data])

  const [editMode, setEditMode] = useState(false)

  const [modalView, setModalView] = useState<MediaView | undefined>(undefined)

  if (!data)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-[50px]"></div>
        <Spinner />
      </div>
    )

  if ('error' in data) {
    return notFound()
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-[50px]"></div>
      <div className="flex h-full w-full justify-center gap-2">
        <form
          id="detail-form"
          className="relative flex h-[1000px] justify-center gap-40"
          onSubmit={(e) => {
            e.preventDefault()
            if (editMode) {
              updateMediaByData(e, Number(id))
            }
            setEditMode((prev) => !prev)
          }}
        >
          <MediaPoster
            data={data}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <MediaInfo
            data={data}
            editMode={editMode}
            setModalView={setModalView}
            id={id}
            modalView={modalView}
          />
        </form>
        <ToastEditMode onCancel={setEditMode} mode={editMode} id={id} />
        <div className="w-5">
          {editMode && (
            <Modal.Root>
              <Modal.Trigger asChild>
                <button type="button">
                  <TrashIcon />
                </button>
              </Modal.Trigger>
              <Modal.Content>
                <DeleteConfirmModal id={id} />
                <Modal.Close>
                  <span>Fechar</span>
                </Modal.Close>
              </Modal.Content>
            </Modal.Root>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
