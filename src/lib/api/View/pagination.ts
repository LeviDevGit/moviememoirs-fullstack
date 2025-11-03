type Order = 'asc' | 'desc'

interface PaginationViewProps {
  page?: number
  filter?: string
  size: number
  order: Order
}

async function PaginationView({
  page,
  filter,
  size,
  order,
}: PaginationViewProps) {
  try {
    const response = await fetch(
      `/api/view/pagination?page=${page}&size=${size}&order=${order}&filter=${filter || ''}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default PaginationView
