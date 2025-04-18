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

export interface dataFetchProps {
  items: ({
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
  totalItems: number
}

export interface PaginatedData {
  id: number
  date: Date
  commentary: string | null
  movieId: number
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
}
