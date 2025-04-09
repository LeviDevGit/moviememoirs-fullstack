import { dataFetchProps } from '@/types/interfaces'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface useSubmitDataProps {
  direction: number
  filterContent: {
    searchString: string
    directorString: string | undefined
    yearString: string | undefined
    valueString: string | undefined
  }
  setDataFetch: (value: React.SetStateAction<dataFetchProps>) => void
  updater: boolean
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
  takeLimit: number
}

function useSubmitData({
  direction,
  filterContent,
  setDataFetch,
  updater,
  setTotalItems,
  takeLimit,
}: useSubmitDataProps) {
  useEffect(() => {
    const submitData = async () => {
      try {
        const filters: Record<string, string> = {}

        if (filterContent.searchString) {
          filters.name = filterContent.searchString.toString()
        }
        if (filterContent.directorString) {
          filters.director = filterContent.directorString.toString()
        }

        if (filterContent.yearString) {
          filters.year = filterContent.yearString.toString()
        }

        if (filterContent.valueString) {
          filters.value = filterContent.valueString.toString()
        }

        const searchParams = new URLSearchParams(filters)

        const response = await fetch(
          `api/read?takeLimit=${takeLimit}&start=${direction}${searchParams.size > 0 ? `&${searchParams}` : ''}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const data = await response.json()

        if (data) {
          setTotalItems(data.totalItems)
          setDataFetch(data.items)

          if (data.totalItems === 0) {
            // Resetar os filtros
            toast.error('Sem retornos')
          }
        }
      } catch (error) {
        console.error(error)
        console.log(error)
        toast.error('Here is your toast.')
      }
    }

    submitData()
  }, [
    direction,
    filterContent,
    setDataFetch,
    updater,
    setTotalItems,
    takeLimit,
  ])
}
export default useSubmitData
