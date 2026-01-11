import { dataFetchProps } from '@/types/interfaces'
import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

interface useSubmitDataProps {
  direction: number
  filterContent: {
    filter: string
  }
  setDataFetch: (
    value: React.SetStateAction<dataFetchProps | undefined>,
  ) => void
  updater: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setDirection: React.Dispatch<React.SetStateAction<number>>
}

function useSubmitData({
  direction,
  filterContent,
  setDataFetch,
  updater,
  setLoading,
}: useSubmitDataProps) {
  const submitData = useCallback(async () => {
    setLoading(true)

    console.log(filterContent)

    const cleanFilters = Object.fromEntries(
      Object.entries(filterContent).filter(
        ([, v]) => v !== undefined && v !== '',
      ),
    )

    // 2. Constrói os params de forma limpa
    const queryParams = new URLSearchParams({
      start: direction.toString(),
      ...cleanFilters,
    })

    try {
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
      setDataFetch(undefined)
      console.error(error)
      console.log(error)
      toast.error('Here is your toast.')
    } finally {
      setLoading(false)
    }
  }, [direction, filterContent, setDataFetch, setLoading])

  useEffect(() => {
    submitData()
  }, [updater, direction, submitData])
}

export default useSubmitData
