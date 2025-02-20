import Image from 'next/image'
import { useEffect, useState } from 'react'

interface DetailProps {
  id: number
}

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
    movieId: number
  }[]
}

async function submitData(
  id: number,
  setData: React.Dispatch<React.SetStateAction<dataProps | undefined>>,
) {
  try {
    const response = await fetch(`/api/retrieve?mediaId=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const teste = await fetch('https://graph.imdbapi.dev/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            {
              title(id: "tt15398776") {
                id
                type
                primary_title
              }
            }
          `,
      }),
    })

    const data = await response.json()

    console.log(data)
    setData(data)

    const testeData = await teste.json()
    console.log(testeData)
  } catch (error) {
    console.error(error)
  }
}

function Detail({ id }: DetailProps) {
  const [data, setData] = useState<dataProps>()

  useEffect(() => {
    submitData(id, setData)
  }, [id, setData])

  return (
    <div className="w-[700px] rounded-lg bg-[#27272a] p-5 text-white">
      <h1>{data?.name}</h1>
      <div className="flex flex-col items-center gap-4">
        {data?.img && (
          <Image
            alt="Poster"
            src={data.img}
            width={220}
            height={330}
            priority
            className="aspect-[345/518] rounded-md object-cover object-center shadow-imageShadow"
          />
        )}
        <p>{data?.value}</p>
      </div>
      <div className="h-11/12 flex flex-col justify-between">
        <p>{data?.name}</p>
        <div className="flex items-center justify-between gap-6">
          <p>{data?.type}</p>
          <p>{data?.year}</p>
        </div>
        <div className="flex items-center justify-between gap-6">
          {data?.time}
          {data?.direction}
        </div>
        <div className="flex items-center justify-between gap-6">
          <p>{data?.imdb}</p>
        </div>
        {data?.views.map((e) => (
          <div key={`${e.id}`}>
            {e.commentary && (
              <textarea
                defaultValue={e.commentary}
                className="bg-black"
              ></textarea>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Detail
