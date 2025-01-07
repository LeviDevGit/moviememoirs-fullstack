import { dataFetchProps } from '@/types/interfaces'
import { useEffect, useState } from 'react'
import Paginator from './Paginator'
import { Plus, Search } from 'lucide-react'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface ModalDashboardProps {
  updaterState: updaterStateProps
}

export default function ModalDashboard({ updaterState }: ModalDashboardProps) {
  const [data, setData] = useState<dataFetchProps>([])
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

      console.log(data[0])
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    submitData(page)
  }, [page])

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
    <div className="flex h-[620px] flex-col justify-between rounded-2xl bg-[#27272a] p-5 text-xs text-white">
      <div className="flex items-center justify-between py-5">
        <h1 className="text-2xl font-bold">Lista de mídias</h1>
        <div className="flex items-center gap-2 bg-[#8f001a] text-sm font-bold">
          <Plus className="h-[1.2em] w-[1.2em]" strokeWidth={3} />
          <button className="">Add Nova Mídia</button>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex w-full items-center gap-2 border border-white px-2">
          <Search className="h-[1.2em] w-[1.2em]" />
          <input
            type="text"
            name=""
            placeholder="Procurar por nome, diretor ..."
            className="bg-transparent"
          />
        </div>
        <select
          name=""
          className="w-[150px] border border-white bg-transparent"
        >
          <option value="">Filme</option>
          <option value="">Série</option>
          <option value="">Documentário</option>
          <option value="">Curta</option>
        </select>
        <button className="w-fit bg-[#8f001a]">Procurar</button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid w-full auto-cols-auto grid-flow-col justify-between py-3">
          <h2 className="w-[250px]">Nome</h2>
          <h2 className="w-[150px]">Diretor</h2>
          <h2 className="w-[60px]">Ano</h2>
          <h2 className="w-[60px]">Tipo</h2>
          <h2 className="w-[80px]">Visto em</h2>
          <h2 className="w-[80px] text-start"></h2>
        </div>
        <hr />
        {data.map((element, index) => (
          <div
            key={`${index}`}
            className="flex h-[50px] flex-col rounded-xl px-2 py-3 hover:bg-black/10"
          >
            <div className="grid h-fit w-full auto-cols-auto grid-flow-col items-start justify-between">
              <p className="w-[250px]">{element.movie.name}</p>
              <h1 className="w-[150px] truncate">{element.movie.direction}</h1>
              <h1 className="w-[60px]">{element.movie.date}</h1>
              <h1 className="w-[60px]">{element.movie.type}</h1>
              <h1 className="w-[80px]">
                {new Date(element.date).toLocaleDateString()}
              </h1>
              <button
                className="w-[80px] rounded-xl border border-gray-500 p-1 text-center text-white hover:bg-black/10"
                onClick={() => {
                  setSafetyButton([element.id, element.movie.img])
                }}
              >
                Editar
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
      <Paginator handlePage={handlePage} page={page} />
    </div>
  )
}
