import { Chooser, InputField } from '@/components/form'
import Visualization from './Visualization'
import { Trash } from 'lucide-react'
import Rater from '@/components/Rater'
import Image from 'next/image'

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

interface LastProp {
  id: number
  date: Date
  commentary: string | null
  movieId: number
}

interface ModifyProps {
  data: dataProps
  last: LastProp | undefined
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean
}

async function deleteView(
  id: number,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  refresh: boolean,
) {
  try {
    await fetch(`/api/view/delete?viewId=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    setRefresh(!refresh)
  } catch (error) {
    console.log(error)
  }
}

function Modify({ data, last, setRefresh, refresh }: ModifyProps) {
  return (
    <div className="flex w-full gap-3">
      <div className="flex w-[500px] flex-col items-center rounded-lg bg-[#18181B] p-3">
        <div className="mb-5 flex w-full items-center justify-between gap-2">
          <div className="h-[330px] w-[220px] self-start shadow-cardShadow">
            <Image
              alt="Poster"
              src={data.img}
              width={220}
              height={330}
              priority
              className="h-[330px] w-[220px] rounded-md object-cover object-center shadow-imageShadow"
            />
          </div>
          <div className="flex flex-1 items-center">
            {last && (
              <div
                key={last.id}
                className="flex w-full items-center justify-between gap-6"
              >
                <div className="flex w-full flex-col gap-4">
                  {/* <h2 className="text-lg">Último comentário</h2> */}
                  <div className="flex flex-col gap-1 bg-[#18181B] p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <h3 className="w-[160px] truncate">{data.name}</h3>
                        <h4 className="text-white/70">{data.year}</h4>
                      </div>
                      <button>
                        <Trash className="w-[1.5em]" />
                      </button>
                    </div>
                    <Rater defaultValue={data.value} width="w-[100px] mb-3" />
                    <h2 className="text-white/50">
                      Assistido em{' '}
                      {new Date(last.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </h2>
                    <div className="overflow-y-scroll pr-2">
                      <p className="trucante max-h-[220px] text-white/90">
                        {last.commentary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full rounded-lg bg-[#18181B] p-2">
          <h2 className="text-lg">Histórico</h2>
          <hr className="border border-white" />
          <div className="flex h-[100px] flex-col overflow-y-auto">
            {data.views.map((e) => (
              <div
                key={`${e.id}`}
                className="flex w-full items-center justify-between gap-6"
              >
                <div className="flex w-full flex-col gap-2 py-5 pr-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white/60">
                      Assistido em{' '}
                      {new Date(e.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        deleteView(e.id, setRefresh, refresh)
                      }}
                    >
                      <Trash className="w-[1.5em]" />
                    </button>
                  </div>
                  <div>
                    <p>{e.commentary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <InputField name="name" text="Nome" placeholder={data.name} />
        <div className="flex items-center justify-between gap-6">
          <Chooser />
          <InputField
            name="movieDate"
            text="Lançamento"
            placeholder={data.year}
          />
        </div>
        <div className="flex items-center justify-between gap-6">
          <InputField name="time" text="Duração" placeholder={data.time} />
          <InputField
            name="direction"
            text="Diretor(a)"
            placeholder={data.direction}
          />
        </div>
        <div className="flex items-center justify-between gap-6">
          <InputField name="imdb" text="Id" placeholder={data.imdb} />
        </div>
        <Visualization />
      </div>
    </div>
  )
}

export default Modify
