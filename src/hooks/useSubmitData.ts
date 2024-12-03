import { dataFetchProps } from '@/types/interfaces'
import { useEffect } from 'react'

interface useSubmitDataProps {
  direction: {
    start: number
    end: number
  }
  filterContent: {
    searchString: string
    directorString: string | undefined
    yearString: string | undefined
    valueString: string | undefined
  }
  setDataFetch: (value: React.SetStateAction<dataFetchProps>) => void
}

export default function useSubmitData({
  direction,
  filterContent,
  setDataFetch,
}: useSubmitDataProps) {
  useEffect(() => {
    const submitData = async () => {
      try {
        console.log(filterContent)

        const queryParams = new URLSearchParams()

        if (filterContent.searchString) {
          queryParams.append('searchString', filterContent.searchString)
        }

        if (filterContent.directorString) {
          queryParams.append('directorString', filterContent.directorString)
        }
        if (filterContent.yearString) {
          queryParams.append('yearString', filterContent.yearString)
        }

        if (filterContent.valueString) {
          queryParams.append('valueString', filterContent.valueString)
        }

        const response = await fetch(`/api/read?${queryParams.toString()}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()

        let modifiedData = data
        console.log(data)

        const lastItem = modifiedData.pop()

        modifiedData = [lastItem, ...modifiedData]

        const finalArray = []

        for (let index = direction.start; index < direction.end; index++) {
          const adjustedIndex =
            ((index % modifiedData.length) + modifiedData.length) %
            modifiedData.length
          finalArray.push(modifiedData[adjustedIndex])
        }

        setDataFetch(finalArray)
      } catch (error) {
        console.error(error)
      }
    }
    submitData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, filterContent])
}
