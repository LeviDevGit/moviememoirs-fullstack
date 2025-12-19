import { FilterOrdering } from '@/features/home/filters/types'
import { dataFetchProps } from '@/types/interfaces'
import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

interface useSubmitDataProps {
  direction: number
  filterContent: {
    filter: string
    directorString: string | undefined
    yearString: string | undefined
    valueString: string | undefined
  }
  setDataFetch: (value: React.SetStateAction<dataFetchProps>) => void
  updater: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setDirection: React.Dispatch<React.SetStateAction<number>>
  filterOrdering: FilterOrdering
}

function useSubmitData({
  direction,
  filterContent,
  setDataFetch,
  updater,
  setLoading,
  filterOrdering,
}: useSubmitDataProps) {
  const submitData = useCallback(async () => {
    setLoading(true)
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filterContent).filter(
          ([, v]) => v !== undefined && v !== '',
        ),
      )

      // 2. Constrói os params de forma limpa
      const queryParams = new URLSearchParams({
        start: direction.toString(),
        order: filterOrdering.orderBy,
        type: filterOrdering.typeBy,
        ...cleanFilters,
      })

      console.log(cleanFilters)

      console.log(queryParams)

      const response = await fetch(`api/view/read?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

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
  }, [direction, filterContent, setDataFetch, setLoading, filterOrdering])

  useEffect(() => {
    submitData()
  }, [updater, direction, submitData])
}

export default useSubmitData
