import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface dataMovieProps {
  id: number
  date: string
  name: string
  time: string
  direction: string
  value: number
  img: string
  type: string
}

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface ModalDashboardProps {
  children: React.ReactNode
  updaterState: updaterStateProps
}

export default function ModalDashboard({
  children,
  updaterState,
}: ModalDashboardProps) {
  const [data, setData] = useState<dataMovieProps[]>([])
  const [safetyButton, setSafetyButton] = useState<
    [number, string] | undefined
  >(undefined)
  const [page, setPage] = useState(1)

  const submitData = async (pageProp: number) => {
    try {
      const response = await fetch(`/api/pagination?page=${pageProp}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    submitData(page)
  }, [page, data])

  const deleteData = async (movieId: number, movieImagePath: string) => {
    try {
      await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, movieImagePath }),
      })
    } catch (error) {
      console.error(error)
    } finally {
      updaterState.setUpdater(!updaterState.updater)
    }
  }

  function handlePage(next: boolean = false) {
    if (next) {
      setPage(page + 1)
    } else {
      if (page > 1) setPage(page - 1)
    }
  }

  return (
    <div className="flex h-[620px] w-[1200px] flex-col justify-between bg-[#27272a] p-5 text-white">
      <div className="flex flex-col gap-2">
        <div className="grid w-full auto-cols-auto grid-flow-col justify-between py-3">
          <h2 className="w-[300px]">Nome</h2>
          <h2 className="w-[200px]">Diretor</h2>
          <h2 className="w-[40px]">Ano</h2>
          <h2 className="w-[60px]">Tipo</h2>
          <h2 className="w-[80px] text-start"></h2>
        </div>
        <hr />
        {data.map((element, index) => (
          <div
            key={`${index}`}
            className="flex flex-col py-3 hover:bg-black/10"
          >
            <div className="grid h-fit w-full auto-cols-auto grid-flow-col justify-between">
              <p className="w-[300px]">{element.name}</p>
              <h1 className="w-[200px] truncate">{element.direction}</h1>
              <h1 className="w-[40px]">{element.date}</h1>
              <h1 className="w-[60px]">{element.type}</h1>
              <button
                className="w-[80px] text-start text-red-500"
                onClick={() => {
                  setSafetyButton([element.id, element.img])
                }}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
      {safetyButton && (
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
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => {
              handlePage()
            }}
            disabled={page === 1}
          >
            <ChevronLeft />
          </button>
          <h2>{page}</h2>
          <button
            onClick={() => {
              handlePage(true)
            }}
          >
            <ChevronRight />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
