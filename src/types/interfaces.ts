export interface CardProps {
  source: {
    movie: {
      id: number
      date: string
      name: string
      time: string
      direction: string
      value: number
      img: string
      type: string
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
    date: string
    name: string
    time: string
    direction: string
    value: number
    img: string
    type: string
  }
} & {
  id: number
  date: Date
  commentary: string | null
  movieId: number
})[]
