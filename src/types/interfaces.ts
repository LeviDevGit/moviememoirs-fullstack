export interface CardProps {
  source: {
    movie: {
      id: number
      name: string
      year: string
      time: string
      direction: string
      value: number
      img: string
      type: string
      imdb: string
    }
  } & {
    id: number
    date: Date
    commentary: string | null
    movieId: number
  }
}

export type dataFetchProps = ({
  movie: {
    id: number
    name: string
    year: string
    time: string
    direction: string
    value: number
    img: string
    type: string
    imdb: string
  }
} & {
  id: number
  date: Date
  commentary: string | null
  movieId: number
})[]
