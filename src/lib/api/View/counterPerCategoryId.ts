import { MediaType } from '@/shared/layout/header/components/FormMedia'

async function counterPerCategoryId(
  categories: MediaType[],
  setCategories: React.Dispatch<React.SetStateAction<MediaType[]>>,
) {
  try {
    const counters = await Promise.all(
      categories.map(async (category) => {
        const response = await fetch(
          `/api/view/counterPerCategoryId?categoryName=${category.name}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch counter per category ID')
        }

        const data: { count?: number } | number = await response.json()
        const count = typeof data === 'number' ? data : (data.count ?? 0)

        return { id: category.id, count }
      }),
    )

    setCategories((prev) =>
      prev.map((category) => {
        const match = counters.find((item) => item.id === category.id)
        return match ? { ...category, count: match.count } : category
      }),
    )
  } catch (error) {
    console.error(error)
  }
}

export default counterPerCategoryId
