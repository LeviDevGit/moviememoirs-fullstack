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
    valueString: number | undefined
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
        const response = await fetch(
          `/api/read${filterContent.searchString && `?searchString=${filterContent.searchString}`}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )

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
