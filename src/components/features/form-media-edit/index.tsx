import { useEffect, useState } from 'react'
import Modify from './Modify'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface ConfirmProps {
  updaterState: updaterStateProps
  safetyButton: number
  setSafetyButton: (value: React.SetStateAction<number | undefined>) => void
  dataImageSrc: string
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
    rating: number
    movieId: number
  }[]
}

interface LastProp {
  id: number
  date: Date
  commentary: string | null
  rating: number
  movieId: number
}

async function updateMedia(
  id: number,
  e: React.FormEvent<HTMLFormElement>,
  setSafetyButton: (value: React.SetStateAction<number | undefined>) => void,
) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)

  console.log(formData)

  if (formData) {
    const response = await fetch(`/api/media/update?mediaid=${id}`, {
      method: 'PATCH',
      body: formData,
    })

    const data = await response.json()

    console.log(data)
    if (data) setSafetyButton(undefined)
  }
}

async function deleteData(
  movieId: number,
  movieImagePath: string,
  updaterState: updaterStateProps,
) {
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

function handleFormChange(
  e: React.FormEvent<HTMLFormElement>,
  initialType: string,
  setFilled: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const formData = new FormData(e.currentTarget)
  const hasValue = Array.from(formData.entries()).some(([key, value]) => {
    if (key === 'type') {
      return value !== initialType
    } else {
      return value.toString().trim() !== ''
    }
  })

  setFilled(hasValue)
}

function Confirm({
  updaterState,
  safetyButton,
  setSafetyButton,
  dataImageSrc,
}: ConfirmProps) {
  const [data, setData] = useState<dataProps>()
  const [last, setLast] = useState<LastProp>()
  const [refresh, setRefresh] = useState(false)
  const [filled, setFilled] = useState(false)

  const submitData = async (id: number) => {
    try {
      const response = await fetch(`/api/retrieve?mediaId=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      console.log(data)
      const ultimoFilme = data.views.pop()
      // console.log(ultimoFilme)

      setLast(ultimoFilme)

      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    submitData(safetyButton)
  }, [safetyButton, refresh])

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-modal-overlay/90">
      <div className="page-specific rounded-2xl bg-background p-5">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-xl font-medium">
            Editar <span className="text-primary">Mídia</span>
          </h1>
        </div>
        {data && (
          <form
            className="flex w-full flex-col gap-3"
            autoComplete="off"
            onSubmit={(e) => updateMedia(safetyButton, e, setSafetyButton)}
            onChange={(e) => handleFormChange(e, data.type, setFilled)}
          >
            <Modify
              data={data}
              last={last}
              setRefresh={setRefresh}
              refresh={refresh}
            />
            <div className="flex items-center justify-between">
              <button
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold"
                onClick={() => {
                  deleteData(safetyButton, dataImageSrc, updaterState)
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
                  className={`rounded-xl px-4 py-2 text-sm font-bold ${filled ? 'bg-green-600' : 'bg-gray-500'}`}
                  disabled={!filled}
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
