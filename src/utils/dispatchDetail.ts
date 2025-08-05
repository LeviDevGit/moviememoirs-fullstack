export interface MediaView {
  id: number
  date: string // formato ISO: "2025-06-13T03:00:00.000Z"
  commentary: string | null
  rating: number
  mediaId: number
}

export interface dataProps {
  id: number
  name: string
  year: string
  time: string
  creator: string
  value: number
  img: string
  categoryId: number
  views: MediaView[]
}

async function dispatchDetail(
  id: string,
  setData: React.Dispatch<React.SetStateAction<dataProps | undefined>>,
) {
  try {
    const response = await fetch(`/api/retrieve?mediaId=${Number(id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)

    setData(data)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export default dispatchDetail
