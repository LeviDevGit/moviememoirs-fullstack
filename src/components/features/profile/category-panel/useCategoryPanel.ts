import readCategory from '@/api/Category/read'
import counterPerCategoryId from '@/api/View/counterPerCategoryId'
import { useEffect } from 'react'

export type CategoryAndCountType = {
  name: string
  total: number
}

interface useCategoryPanelProps {
  setCategories: (value: React.SetStateAction<CategoryAndCountType[]>) => void
}

export function useCategoryPanel({ setCategories }: useCategoryPanelProps) {
  useEffect(() => {
    async function handleReadCategory() {
      const fetched = await readCategory()
      await counterPerCategoryId(fetched, setCategories)
    }
    handleReadCategory()
  }, [setCategories])
}
