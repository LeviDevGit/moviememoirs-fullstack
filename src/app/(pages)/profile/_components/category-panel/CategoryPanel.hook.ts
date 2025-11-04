import readCategory from '@/lib/api/Category/read'
import counterPerCategoryId from '@/lib/api/View/counterPerCategoryId'
import { useEffect } from 'react'

export type CategoryAndCountType = {
  id: number
  name: string
  proportion: 'RECTANGLE' | 'SQUARE'
  count?: number
}

interface useCategoryPanelProps {
  setCategories: (value: React.SetStateAction<CategoryAndCountType[]>) => void
}

export function useCategoryPanel({ setCategories }: useCategoryPanelProps) {
  useEffect(() => {
    async function handleReadCategory() {
      const fetched = await readCategory()
      setCategories(fetched)
      await counterPerCategoryId(fetched, setCategories)
    }
    handleReadCategory()
  }, [setCategories])
}
