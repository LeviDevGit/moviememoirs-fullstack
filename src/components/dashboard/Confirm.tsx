import { useEffect, useState } from 'react'
import { Calendar, Chooser, InputField, Textarea } from '../form'
import Image from 'next/image'

interface ConfirmProps {
  deleteData: (movieId: number, movieImagePath: string) => Promise<void>
  safetyButton: [number, string]
  setSafetyButton: (
    value: React.SetStateAction<[number, string] | undefined>,
  ) => void
}

interface dataProps {
  id: number
  date: string
  name: string
  time: string
  direction: string
  value: number
  img: string
  type: string
  views: {
    id: number
    date: Date
    commentary: string | null
    movieId: number
  }[]
}

async function updateMedia(id: number, e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)

  if (formData) {
    const response = await fetch(`/api/update?mediaid=${id}`, {
      method: 'PATCH',
      body: formData,
    })

    const data = await response.json()

    console.log(data)
  }
}

function Confirm({ deleteData, safetyButton, setSafetyButton }: ConfirmProps) {
  const [data, setData] = useState<dataProps>()

  const submitData = async (id: number) => {
    try {
      const response = await fetch(`/api/retrieve?mediaId=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      console.log(data)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    submitData(safetyButton[0])
  }, [safetyButton])

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70">
      <div>
        <div className="relative aspect-[345/518] shadow-cardShadow duration-[2500ms] hover:blur hover:grayscale">
          {data && (
            <Image
              alt="Poster"
              src={data?.img}
              width={345}
              height={518}
              priority
              className="aspect-[345/518] rounded-md object-cover object-center shadow-imageShadow"
            />
          )}
        </div>
      </div>
      <div className="page-specific w-[600px] rounded-2xl bg-[#27272a] p-5 text-white">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-xl font-medium">
            Editar <span className="text-[#dd4d51]">Mídia</span>
          </h1>
          <p className="text-xs text-[#e0e0e0]">
            Ajude a construir um registro detalhado do que você assiste.
          </p>
        </div>
        {data && (
          <form
            className="flex flex-col gap-3"
            autoComplete="off"
            onSubmit={(e) => updateMedia(safetyButton[0], e)}
          >
            <InputField name="name" text="Nome" placeholder={data.name} />
            <div className="flex items-center justify-between gap-6">
              <Chooser />
              <InputField
                name="movieDate"
                text="Lançamento"
                placeholder={data.date}
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
            <div className="w-full">
              <InputField
                name="movieValue"
                text="Nota"
                placeholder={data.value.toString()}
              />
            </div>
            {data.views.map((e) => (
              <div
                key={`${e.id}`}
                className="flex items-center justify-between gap-6"
              >
                <Calendar
                  custom={new Date(e.date).toISOString().slice(0, 10)}
                />

                <div className="w-1/2">
                  <Textarea custom={e.commentary} />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <button
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold"
                onClick={() => {
                  deleteData(safetyButton[0], safetyButton[1])
                  setSafetyButton(undefined)
                }}
                type="button"
              >
                Deletar
              </button>
              <div className="flex w-full items-center justify-end gap-4">
                <button
                  className="rounded-xl px-4 py-2 text-sm font-bold"
                  onClick={() => {
                    setSafetyButton(undefined)
                  }}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Confirm
