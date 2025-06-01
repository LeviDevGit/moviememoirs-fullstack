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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function useSubmitData({
  direction,
  filterContent,
  setDataFetch,
  updater,
  setLoading,
}: useSubmitDataProps) {
  useEffect(() => {
    const submitData = async () => {
      setLoading(true)
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
          `api/read?start=${direction}${searchParams.size > 0 ? `&${searchParams}` : ''}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const data = await response.json()
        console.log(data)

        if (data) {
          setDataFetch(data)
          if (data.totalItems === 0) {
            toast.error('Sem retornos')
          }
        }
      } catch (error) {
        console.error(error)
        console.log(error)
        toast.error('Here is your toast.')
      } finally {
        setLoading(false)
      }
    }

    submitData()
  }, [direction, filterContent, setDataFetch, updater, setLoading])
}
export default useSubmitData
