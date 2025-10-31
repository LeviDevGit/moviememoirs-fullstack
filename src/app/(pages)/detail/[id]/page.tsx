'use client'

import { use, useEffect, useState } from 'react'
import dispatchDetail, {
  DetailResponse,
  MediaView,
} from '@/utils/dispatchDetail'
import retrieveExtraSectionById from '@/lib/api/ExtraSection/retrieve'
import Spinner from '@/components/ui/Spinner'
import { TrashIcon } from 'lucide-react'
import updateMediaByData from '@/lib/api/Media/update'
import MediaInfo from './_components/Main/MediaInfo'
import ToastEditMode from './_components/ToastEditMode'
import EditTitleYearModal from './_components/modals/EditTitleYearModal'
import EditCreatorModal from './_components/modals/EditCreatorModal'
import EditViewModal from './_components/modals/EditViewModal'
import DeleteConfirmModal from './_components/modals/DeleteConfirmModal'
import MediaPoster from './_components/Aside/MediaPoster'
import { notFound } from 'next/navigation'

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

  // 0: title/year | 1: creator | 2: commentary | 3: delete
  const [toggleModal, setToggleModal] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ])

  const [modalView, setModalView] = useState<MediaView | undefined>(undefined)

  if (!data) return <Spinner />

  if ('error' in data) {
    return notFound()
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-[100px]"></div>
      <div className="flex h-full w-full justify-center gap-2 overflow-y-scroll">
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
            setToggleModal={setToggleModal}
            setModalView={setModalView}
          />
        </form>
        <ToastEditMode
          onCancel={setEditMode}
          onDelete={setToggleModal}
          mode={editMode}
        />
        <div className="w-5">
          {editMode && (
            <button
              type="button"
              onClick={() => setToggleModal([false, false, false, true])}
            >
              <TrashIcon />
            </button>
          )}
        </div>
      </div>
      {toggleModal[0] ? (
        <EditTitleYearModal
          data={data}
          setToggleModal={setToggleModal}
          id={id}
        />
      ) : toggleModal[1] ? (
        <EditCreatorModal data={data} setToggleModal={setToggleModal} />
      ) : toggleModal[2] ? (
        <EditViewModal setToggleModal={setToggleModal} modalView={modalView} />
      ) : (
        toggleModal[3] && (
          <DeleteConfirmModal id={id} setToggleModal={setToggleModal} />
        )
      )}
    </div>
  )
}

export default Page
