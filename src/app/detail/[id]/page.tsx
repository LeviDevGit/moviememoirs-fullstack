'use client'

import Image from 'next/image'
import { use, useContext, useEffect, useState } from 'react'
import { MovieDataImdb } from '@/types/imdb'
import Rater from '@/components/Rater'
import dispatchDetail, { dataProps } from '@/utils/dispatchDetail'
import { GlobalContext } from '@/providers/global'
import Confirm from '@/components/confirm'
import MediaInfo from '@/components/features/detail/media-info'

interface PageProps {
  params: Promise<{ id: string }>
}

function Page({ params }: PageProps) {
  const [safetyButton, setSafetyButton] = useState<number | undefined>(
    undefined,
  )
  const [data, setData] = useState<dataProps>()
  const [api, setApi] = useState<MovieDataImdb>()

  const { id } = use(params)

  useEffect(() => {
    dispatchDetail(id, setData, setApi)
  }, [id, setData])

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
  if (!api) return <p>Erro com o id do imdb.</p>
  if (api.errors) return <p className="text-white">Erro com o request da api</p>

  return (
    <div className="flex h-full w-full items-center justify-center p-5 text-white">
      <div className="flex h-[650px] w-[1200px] justify-between gap-4 overflow-y-scroll border border-red-500 p-2">
        <div className="relative flex h-[1000px] w-full flex-1 justify-around">
          <div className="sticky top-11 flex h-fit flex-col items-center justify-start gap-4">
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
            {safetyButton && (
              <Confirm
                updaterState={updaterState}
                safetyButton={safetyButton}
                setSafetyButton={setSafetyButton}
                dataImageSrc={data.img}
              />
            )}
          </div>
          <MediaInfo data={data} api={api} />
        </div>
      </div>
    </div>
  )
}

export default Page
