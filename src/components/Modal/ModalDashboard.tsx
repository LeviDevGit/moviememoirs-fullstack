import { dataFetchProps } from '@/types/interfaces'
import { useEffect, useState } from 'react'

export default function ModalDashboard() {
  const [data, setData] = useState<dataFetchProps>([])
  const [safetyButton, setSafetyButton] = useState<
    [number, string] | undefined
  >(undefined)

  useEffect(() => {
    const submitData = async () => {
      try {
        const response = await fetch('/api/read', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()

        setData(data)
      } catch (error) {
        console.error(error)
      }
    }
    submitData()
  }, [])

  const deleteData = async (movieId: number, movieImagePath: string) => {
    try {
      await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, movieImagePath }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-[800px] w-[700px] overflow-y-scroll p-5">
      {/* ESSA MERDA ESTA FAZENDO O REQUEST PARA UM READ QUE ESTÁ ORDENADO PELA DATA DO VIEW
          ENTÃO SE VOCÊ COLOCAR UMA DATA ANTERIOR AS OUTRAS QUE JÁ ESTÃO NO BANCO DE DADOS VOCÊ
          DEVE PROCURAR O ID E NOME CERTO PARA APAGAR A PRIMEIRA POR COSTUME!!!
        */}
      {data.map((element, index) => (
        <div key={`${index}`} className="flex flex-col gap-4">
          <div className="flex h-fit w-full items-center justify-between">
            <h1>O id é {element.movieId}</h1>
            <p>{element.movie.name}</p>
            <button
              className="text-red-500"
              onClick={() => {
                setSafetyButton([element.movie.id, element.movie.img])
              }}
            >
              Deletar
            </button>
          </div>
          <hr />
        </div>
      ))}
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
    </div>
  )
}
