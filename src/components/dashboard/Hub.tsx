import { dataFetchProps } from '@/types/interfaces'
import { useEffect, useState } from 'react'
import {
  Confirm,
  Controls,
  List,
  Paginator,
  TopBar,
} from '@/components/dashboard'

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

  const submitData = async (pageProp: number) => {
    try {
      const response = await fetch(`/api/pagination?page=${pageProp}`, {
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
    <div className="flex flex-col justify-between gap-3 rounded-2xl bg-[#27272a] p-5 text-xs text-white">
      <TopBar />
      <Controls />
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
