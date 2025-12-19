import { DetailResponse } from '@/utils/dispatchDetail'
import { useEffect } from 'react'

interface useExtraSectionProps {
  data: DetailResponse | undefined
  setExtraSectionData: (value: React.SetStateAction<never[]>) => void

  retrieveExtraSectionById(id: number): Promise<
    | never[]
    | {
        error: string
      }
  >
}

function useExtraSection({
  data,
  setExtraSectionData,
  retrieveExtraSectionById,
}: useExtraSectionProps) {
  useEffect(() => {
    if (!data || 'error' in data) return

    async function fetchData(id: number) {
      const result = await retrieveExtraSectionById(id)
      if ('error' in result) {
        setExtraSectionData([])
      } else {
        setExtraSectionData(result)
      }
    }

    if (data) {
      fetchData(data.categoryId)
    }
  }, [data, retrieveExtraSectionById, setExtraSectionData])
}

export default useExtraSection
