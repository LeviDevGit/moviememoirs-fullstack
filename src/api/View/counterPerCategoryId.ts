import { CategoryAndCountType } from '@/components/features/profile/category-panel/useCategoryPanel'
import { MediaType } from '@/types/interfaces'

async function counterPerCategoryId(
  categories: MediaType[],
  setCategories: (value: React.SetStateAction<CategoryAndCountType[]>) => void,
) {
  try {
    const categoryNames = categories
      .map((c) => encodeURIComponent(c.name))
      .join(',')

    console.log(categoryNames)

    const response = await fetch(
      `/api/view/counterPerCategoryId?categoryName=${categoryNames}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    const apiData: { name: string; total: number }[] = await response.json()

    console.log(apiData)

    setCategories(apiData)
  } catch (error) {
    console.error(error)
  }
}

export default counterPerCategoryId
