import Confirm from './confirm'
import Controls from './Controls'
import List from './List'
import Paginator from './Paginator'

import { PaginatedData } from '@/types/interfaces'
import { useEffect, useState } from 'react'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface DashboardProps {
  updaterState: updaterStateProps
}

function Dashboard({ updaterState }: DashboardProps) {
  const [data, setData] = useState<PaginatedData[]>([])
  const [safetyButton, setSafetyButton] = useState<
    [number, string] | undefined
  >(undefined)
  const [page, setPage] = useState(1)
  const [counter, setCounter] = useState<number>()

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

      const counterFetch = await fetch(`/api/movie/counter?filter=${teste}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const counterData = await counterFetch.json()

      if (counterData % 6) {
        setCounter(Math.floor(counterData / 6) + 1)
        if (counterData + 1 < page * 6) {
          setPage(1)
        }
      } else {
        setCounter(Math.floor(counterData / 6))
        if (counterData < page * 6) {
          setPage(1)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [filter, setFilter] = useState<string>()

  useEffect(() => {
    if (safetyButton) {
      console.log(safetyButton[0])
    }
    submitData(page, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, safetyButton])

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
          updaterState={updaterState}
          safetyButton={safetyButton}
          setSafetyButton={setSafetyButton}
        />
      )}
      <Paginator handlePage={handlePage} page={page} counter={counter} />
    </div>
  )
}

export default Dashboard

export { Confirm, Controls, List, Paginator }
