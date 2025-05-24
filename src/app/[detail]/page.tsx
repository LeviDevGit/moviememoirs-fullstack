'use client'

import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { MovieDataImdb } from '@/types/imdb'
import { ImageOff, UserRound } from 'lucide-react'
import Rater from '@/components/Rater'

interface dataProps {
  id: number
  year: string
  name: string
  time: string
  direction: string
  value: number
  img: string
  type: string
  imdb: string
  views: {
    id: number
    date: Date
    commentary: string | null
    rating: number
    movieId: number
  }[]
}

async function submitData(
  id: string,
  setData: React.Dispatch<React.SetStateAction<dataProps | undefined>>,
  setApi: React.Dispatch<React.SetStateAction<MovieDataImdb | undefined>>,
) {
  try {
    const response = await fetch(`/api/retrieve?mediaId=${Number(id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    const teste = await fetch('https://graph.imdbapi.dev/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            {
  title(id: "${data.imdb}") {
    id
    primary_title
    genres
    plot
 
    # Get the first 5 directors
    directors: credits(first: 5, categories:[ "director" ]) {
      name {
        id
        display_name
        avatars {
          url
          width
          height
        }
      }
    }
 
    # Get the first 5 directors
    writers: credits(first: 5, categories:[ "writer" ]) {
      name {
        id
        display_name
        avatars {
          url
          width
          height
        }
      }
    }
 
    # Get the first 5 casts
    casts: credits(first: 5, categories:[ "actor", "actress" ]) {
      name {
        id
        display_name
        avatars {
          url
          width
          height
        }
      }
      characters
    }
  }
}
          `,
      }),
    })

    setData(data)

    const testeData = await teste.json()
    setApi(testeData)
  } catch (error) {
    console.error(error)
  }
}

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
  id: number
  params: Promise<{ detail: string }>
}

function Page({ id, params }: PageProps) {
  const [data, setData] = useState<dataProps>()
  const [api, setApi] = useState<MovieDataImdb>()

  const { detail } = use(params)

  useEffect(() => {
    submitData(detail, setData, setApi)
  }, [id, setData, detail])

  if (!data) return <p>Carregando...</p>
  if (!api) return <p>Erro com o id do imdb.</p>
  if (api.errors) return <p className="text-white">Erro com o request da api</p>

  return (
    <div className="flex h-full w-full bg-[#27272a] p-5 text-white">
      <div className="flex h-[600px] w-full justify-between gap-4 p-2">
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
