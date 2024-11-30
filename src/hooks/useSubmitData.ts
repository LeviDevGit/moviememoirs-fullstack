import { dataFetchProps } from '@/types/interfaces'
import { useEffect } from 'react'

interface useSubmitDataProps {
  direction: {
    start: number
    end: number
  }
  isInitializedRef: React.MutableRefObject<boolean>
  reqBody: string
  setDataFetch: (value: React.SetStateAction<dataFetchProps>) => void
}

export default function useSubmitData({
  direction,
  isInitializedRef,
  reqBody,
  setDataFetch,
}: useSubmitDataProps) {
  useEffect(() => {
    const submitData = async () => {
      try {
        const response = await fetch(
          `/api/read${reqBody && `?searchString=${reqBody}`}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const data = await response.json()

        let modifiedData = data

        if (!isInitializedRef.current) {
          const lastItem = data[data.length - 1]
          modifiedData = [lastItem, ...data.slice(0, data.length - 1)]
          isInitializedRef.current = true
        }

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
  }, [direction, isInitializedRef, reqBody, setDataFetch])
}
