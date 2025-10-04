'use client'

import Image from 'next/image'
import { use, useContext, useEffect, useState } from 'react'
import Rater from '@/components/shared/Rater'
import dispatchDetail, { dataProps } from '@/utils/dispatchDetail'
import { GlobalContext } from '@/providers/global'
import Confirm from '@/components/features/form-media-edit'
import MediaInfo from '@/components/features/media-info/MediaInfo'
import retrieveExtraSectionById from '@/lib/api/ExtraSection/retrieve'
import Spinner from '@/components/ui/Spinner'
import { CheckIcon, PencilIcon, UndoIcon } from 'lucide-react'
import updateMediaByData from '@/lib/api/Media/update'
import PosterDropzone from '@/components/shared/PosterDropzone'
import EditTitleYearModal from '@/components/features/media-info/modals/EditTitleYearModal'
import EditCreatorModal from '@/components/features/media-info/modals/EditCreatorModal'

interface PageProps {
  params: Promise<{ id: string }>
}

function Page({ params }: PageProps) {
  const [safetyButton, setSafetyButton] = useState<number | undefined>(
    undefined,
  )
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

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { updater, setUpdater } = context

  const updaterState = { updater, setUpdater }

  const [editMode, setEditMode] = useState(false)

  const [toggleModal, setToggleModal] = useState<boolean[]>([false, false])

  if (!data) return <Spinner />

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-[200px]"></div>
      <div className="flex h-full w-full overflow-y-scroll">
        <form
          className="relative flex h-[1000px] w-full flex-1 justify-center gap-40"
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
                    src={data.img}
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
                  readonly={true}
                />
              )}
            </div>
            <div className="flex w-[80px] flex-col items-center justify-center gap-4 font-semibold text-[#e0e0e0]">
              <button
                className="rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
                onClick={() => {
                  setSafetyButton(Number(id))
                }}
              >
                Editar
              </button>
              <div className="flex gap-4">
                <button
                  className="ml-2 rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
                  type="submit"
                >
                  {editMode ? <CheckIcon /> : <PencilIcon />}
                </button>
                {editMode && (
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
          </div>
          <MediaInfo
            data={data}
            editMode={editMode}
            setToggleModal={setToggleModal}
          />
        </form>
        {safetyButton && (
          <Confirm
            updaterState={updaterState}
            safetyButton={safetyButton}
            setSafetyButton={setSafetyButton}
            dataImageSrc={data.img}
          />
        )}
      </div>
      {toggleModal[0] ? (
        <EditTitleYearModal data={data} setToggleModal={setToggleModal} />
      ) : (
        toggleModal[1] && (
          <EditCreatorModal data={data} setToggleModal={setToggleModal} />
        )
      )}
    </div>
  )
}

export default Page
