import { dataFetchProps } from '@/types/interfaces'
import { useEffect } from 'react'

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
}

function useSubmitData({
  direction,
  filterContent,
  setDataFetch,
  updater,
  setTotalItems,
}: useSubmitDataProps) {
  useEffect(() => {
    const submitData = async () => {
      try {
        const filters = new URLSearchParams({
          name: filterContent.searchString.toString(),
          director: filterContent.directorString
            ? filterContent.directorString.toString()
            : '',
          year: filterContent.yearString
            ? filterContent.yearString.toString()
            : '',
          value: filterContent.valueString
            ? filterContent.valueString.toString()
            : '',
        })

        const response = await fetch(
          `api/read?start=${direction}&${filters.toString()}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const data = await response.json()

        if (data) {
          setTotalItems(data.totalItems)
          setDataFetch(data.items)
        }
      } catch (error) {
        console.error(error)
      }
    }

    submitData()
  }, [direction, filterContent, setDataFetch, updater, setTotalItems])
}
export default useSubmitData
