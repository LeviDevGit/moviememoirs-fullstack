import { useEffect, useState } from 'react'
import { InputField } from '../form'

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
  view: {
    id: number
    date: Date
    commentary: string | null
    movieId: number
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
      <div className="flex w-[300px] flex-col gap-4 bg-white p-5">
        <h1 className="text-center">Tem certeza disso?</h1>
        <div className="flex items-center justify-between">
          <button
            className="border border-black text-green-500"
            onClick={() => {
              deleteData(safetyButton[0], safetyButton[1])
              setSafetyButton(undefined)
            }}
          >
            Sim, deletar
          </button>
          <button
            className="border border-black text-red-500"
            onClick={() => {
              setSafetyButton(undefined)
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
      <div className="page-specific w-[600px] rounded-2xl bg-[#27272a] p-5 text-white">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-xl font-medium">
            Registrar <span className="text-[#dd4d51]">Mídia</span>
          </h1>
          <p className="text-xs text-[#e0e0e0]">
            Ajude a construir um registro detalhado do que você assiste.
          </p>
        </div>
        {data && (
          <form
            className="flex flex-col gap-3"
            // onSubmit={(e) => dispatchForm({ e, updaterState })}
            autoComplete="off"
          >
            <InputField name="name" text="Nome" placeholder={data.name} />
            {/* <Pair>
            <Chooser />
            <InputField
              name="movieDate"
              text="Lançamento"
              placeholder="Ex: 2004"
            />
          </Pair>
          <Pair>
            <InputField name="time" text="Duração" placeholder="Ex: 2hr 2min" />
            <InputField
              name="direction"
              text="Diretor(a)"
              placeholder="Digite o nome do(a) diretor(a)"
            />
          </Pair>
          <Pair>
            <Calendar />
            <InputField name="movieValue" text="Nota" placeholder="De 0 a 5" />
          </Pair>
          <Dropzone />
          <Textarea />
          <div className="flex w-full items-center justify-end">
            <button
              type="submit"
              className="rounded-xl bg-[#8f001a] px-4 py-2 text-sm font-bold"
            >
              Registrar
            </button>
          </div> */}
          </form>
        )}
      </div>
    </div>
  )
}

export default Confirm
