import { MovieDataImdb } from '@/types/imdb'

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
  setApi: React.Dispatch<React.SetStateAction<MovieDataImdb | undefined>>,
) {
  try {
    const response = await fetch(`/api/retrieve?mediaId=${Number(id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    const teste = await fetch('https://graph.imdbapi.dev/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
              {
    title(id: "${data.imdb}") {
      id
      primary_title
      genres
      plot
   
      # Get the first 5 directors
      directors: credits(first: 5, categories:[ "director" ]) {
        name {
          id
          display_name
          avatars {
            url
            width
            height
          }
        }
      }
   
      # Get the first 5 directors
      writers: credits(first: 5, categories:[ "writer" ]) {
        name {
          id
          display_name
          avatars {
            url
            width
            height
          }
        }
      }
   
      # Get the first 5 casts
      casts: credits(first: 5, categories:[ "actor", "actress" ]) {
        name {
          id
          display_name
          avatars {
            url
            width
            height
          }
        }
        characters
      }
    }
  }
            `,
      }),
    })

    setData(data)

    const testeData = await teste.json()
    setApi(testeData)
  } catch (error) {
    console.error(error)
  }
}

export default dispatchDetail
