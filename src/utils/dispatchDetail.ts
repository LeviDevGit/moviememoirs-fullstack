export interface dataProps {
  id: number
  year: string
  name: string
  time: string
  direction: string
  value: number
  img: string
  type: string
  imdb: string
  views: {
    id: number
    date: Date
    commentary: string | null
    rating: number
    movieId: number
  }[]
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

    setData(data)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export default dispatchDetail
