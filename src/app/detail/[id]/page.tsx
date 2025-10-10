'use client'

import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import Rater from '@/components/shared/Rater'
import dispatchDetail, { dataProps, MediaView } from '@/utils/dispatchDetail'
import MediaInfo from '@/components/features/media-info/MediaInfo'
import retrieveExtraSectionById from '@/lib/api/ExtraSection/retrieve'
import Spinner from '@/components/ui/Spinner'
import { PencilIcon, TrashIcon, UndoIcon } from 'lucide-react'
import updateMediaByData from '@/lib/api/Media/update'
import PosterDropzone from '@/components/shared/PosterDropzone'
import EditTitleYearModal from '@/components/features/media-info/modals/EditTitleYearModal'
import EditCreatorModal from '@/components/features/media-info/modals/EditCreatorModal'
import EditViewModal from '@/components/features/media-info/modals/EditViewModal'
import DeleteConfirmModal from '@/components/features/media-info/modals/DeleteConfirmModal'
import ToastEditMode from '@/components/features/media-info/ToastEditMode'

interface PageProps {
  params: Promise<{ id: string }>
}

function Page({ params }: PageProps) {
  const [data, setData] = useState<dataProps>()

  const { id } = use(params)

  useEffect(() => {
    dispatchDetail(id, setData)
  }, [id])

  const [, setExtraSectionData] = useState([])

  useEffect(() => {
    async function fetchData(id: number) {
      const result = await retrieveExtraSectionById(id)
      setExtraSectionData(result)
    }

    if (data?.categoryId) fetchData(data.categoryId)
  }, [data?.categoryId])

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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-[200px]"></div>
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
          <div className="sticky top-1 flex h-fit flex-col items-center justify-start gap-4">
            {editMode ? (
              <PosterDropzone />
            ) : (
              data.img && (
                <div className="h-[330px] w-[220px] shadow-cardShadow">
                  <Image
                    alt="Poster"
                    src={`${data.img}?timestamp=${Date.now()}`}
                    width={220}
                    height={330}
                    priority
                    className="h-[330px] w-[220px] rounded-md object-cover object-center shadow-imageShadow"
                  />
                </div>
              )
            )}
            <div className="w-[150px]">
              {data && (
                <Rater
                  defaultValue={data.value}
                  width="w-[150px] mb-3"
                  readOnly={true}
                />
              )}
            </div>
            <div className="flex w-[80px] flex-col items-center justify-center gap-4 font-semibold text-[#e0e0e0]">
              {!editMode ? (
                <button
                  className="ml-2 rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
                  type="button"
                  onClick={() => {
                    setEditMode(true)
                  }}
                >
                  <PencilIcon />
                </button>
              ) : (
                <button
                  className="ml-2 rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
                  type="button"
                  onClick={() => {
                    setEditMode(false)
                  }}
                >
                  <UndoIcon />
                </button>
              )}
            </div>
          </div>
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
        <EditTitleYearModal data={data} setToggleModal={setToggleModal} />
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
