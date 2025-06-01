'use client'

import Image from 'next/image'
import { use, useContext, useEffect, useState } from 'react'
import { MovieDataImdb } from '@/types/imdb'
import { ImageOff, UserRound } from 'lucide-react'
import Rater from '@/components/Rater'
import dispatchDetail, { dataProps } from '@/utils/dispatchDetail'
import { GlobalContext } from '@/providers/global'
import Confirm from '@/components/confirm'

interface ImageWithFallbackProps {
  src: string
}

const ImageWithFallback = ({ src }: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false)

  console.log(src)

  return hasError ? (
    <div className="flex h-[169px] w-[113px] items-center justify-center rounded-lg bg-[#e5e5e5]">
      <ImageOff className="h-[50px] w-[50px]" color="#cecece" />
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Avatar"
      onError={(e) => {
        setHasError(true)
        console.log('teste')
        e.currentTarget.textContent = 'Error'
      }}
      className="h-[169px] w-[113px] rounded-lg object-cover object-center"
    />
  )
}

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
      <div className="flex h-[650px] w-[1200px] justify-between gap-4 border border-red-500 p-2">
        <div className="flex flex-col items-center justify-start gap-4">
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
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-center gap-4">
              <p>{data.name}</p>
              <p className="text-white/70 underline">{data?.year}</p>
            </div>
            <p className="max-w-[250px] truncate text-white/60">
              Dirigido por{' '}
              <span className="text-white/70 underline">{data?.direction}</span>
            </p>
          </div>
          <div className="h-full w-[250px]">
            <p className="line-clamp-4 h-[100px] max-w-[250px] select-none overflow-hidden text-justify text-[#9ab]">
              {api.data.title.plot}
            </p>
          </div>
        </div>
        <div className="flex w-[600px] flex-col justify-between gap-2">
          <div className="flex w-full flex-col gap-2">
            <h1>Elenco e Equipe</h1>
            <div className="w-full overflow-x-auto whitespace-nowrap py-2 pb-6">
              <div className="flex w-max gap-10">
                {api.data.title.casts.map((e, index) => (
                  <div
                    key={`${e.characters} ${index}`}
                    className="flex w-[120px] flex-col items-center gap-1"
                  >
                    {e.name.avatars && e.name.avatars[0].url ? (
                      <ImageWithFallback src={e.name.avatars[0].url} />
                    ) : (
                      <div className="flex h-[169px] w-[113px] items-center justify-center rounded-lg bg-[#e5e5e5]">
                        <UserRound
                          className="h-[50px] w-[50px]"
                          color="#cecece"
                        />
                      </div>
                    )}
                    <h3 className="w-[113px] truncate text-center text-sm">
                      {e.name.display_name}
                    </h3>
                    <h4 className="w-[113px] truncate text-center text-xs text-white/60">
                      Como {e.characters && e.characters[0]}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {api.data.title.genres.map((e) => (
                <p
                  key={`${e}`}
                  className="inline-block whitespace-nowrap rounded-[3px] bg-[#283038] px-[6px] py-[3px] leading-[1.5] text-[#9ab] shadow-inner shadow-[hsla(0,0%,100%,0.05)]"
                >
                  {e}
                </p>
              ))}
            </div>
          </div>
          <div className="h-full w-full overflow-y-scroll">
            {data.views.map((e) => (
              <div
                key={e.id}
                className="flex w-full items-center justify-between gap-6"
              >
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col rounded-lg bg-[#18181B] p-5">
                    <Rater
                      defaultValue={e.rating}
                      width="w-[100px] mb-3"
                      readonly={true}
                    />
                    <h2 className="mb-3 text-sm text-white/50">
                      Assistido em{' '}
                      {new Date(e.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </h2>
                    <div className="pr-3">
                      <p className="text-white/90">{e.commentary}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
