import { dataFetchProps } from '@/types/interfaces'
import { useEffect, useState } from 'react'
import { Confirm, Controls, List, Paginator } from '@/components/dashboard'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface HubProps {
  updaterState: updaterStateProps
}

function Hub({ updaterState }: HubProps) {
  const [data, setData] = useState<dataFetchProps>([])
  const [safetyButton, setSafetyButton] = useState<
    [number, string] | undefined
  >(undefined)
  const [page, setPage] = useState(1)

  const submitData = async (pageProp: number, filter: string | undefined) => {
    let teste = ''

    if (filter && filter !== '') {
      teste = filter
    }

    try {
      const response = await fetch(
        `/api/pagination?page=${pageProp}&filter=${teste}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      )

      const data = await response.json()

      console.log(data)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const [filter, setFilter] = useState<string>()

  useEffect(() => {
    submitData(page, filter)
  }, [page, filter, safetyButton])

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
    <div className="flex h-[620px] flex-col gap-3 rounded-lg bg-[#27272a] p-7 text-xs text-white">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Lista de <span className="text-[#dd4d51]">Mídias</span>
        </h1>
        <p className="text-sm text-[#e0e0e0]">
          Com este painel, organize, filtre e acompanhe suas mídias com
          facilidade.
        </p>
      </div>
      <Controls setFilter={setFilter} />
      <List data={data} setSafetyButton={setSafetyButton} />
      {safetyButton && (
        <Confirm
          deleteData={deleteData}
          safetyButton={safetyButton}
          setSafetyButton={setSafetyButton}
        />
      )}
      <Paginator handlePage={handlePage} page={page} />
    </div>
  )
}

export default Hub
