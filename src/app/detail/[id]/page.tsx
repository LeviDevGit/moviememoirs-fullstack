'use client'

import Image from 'next/image'
import { use, useContext, useEffect, useState } from 'react'
import Rater from '@/components/shared/Rater'
import dispatchDetail, { dataProps } from '@/utils/dispatchDetail'
import { GlobalContext } from '@/providers/global'
import Confirm from '@/components/features/form-media-edit'
import MediaInfo from '@/components/features/media-info/MediaInfo'
import retrieveExtraSectionById from '@/lib/api/ExtraSection/retrieve'

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

  const [extraSectionData, setExtraSectionData] = useState()

  useEffect(() => {
    async function fetchData(id: number) {
      const result = await retrieveExtraSectionById(id)
      setExtraSectionData(result)
    }

    if (data?.categoryId) fetchData(data.categoryId)
    console.log(extraSectionData)
  }, [data?.categoryId])

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { updater, setUpdater } = context

  const updaterState = { updater, setUpdater }

  if (!data)
    return (
      <div className="flex h-full w-full items-center">
        <div className="flex h-full w-full items-center justify-center border-red-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        </div>
      </div>
    )

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-[200px]"></div>
      <div className="flex h-full w-full overflow-y-scroll">
        <div className="relative flex h-[1000px] w-full flex-1 justify-center gap-40">
          <div className="sticky top-1 flex h-fit flex-col items-center justify-start gap-4">
            {data.img && (
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
            <div className="flex w-[80px] justify-end font-semibold text-[#e0e0e0]">
              <button
                className="rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
                onClick={() => {
                  setSafetyButton(Number(id))
                }}
              >
                Editar
              </button>
            </div>
          </div>
          <MediaInfo data={data} />
        </div>
        {safetyButton && (
          <Confirm
            updaterState={updaterState}
            safetyButton={safetyButton}
            setSafetyButton={setSafetyButton}
            dataImageSrc={data.img}
          />
        )}
      </div>
    </div>
  )
}

export default Page
