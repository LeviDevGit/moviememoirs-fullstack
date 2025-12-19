export interface Media {
  id: number
  name: string
  year: string
  time: string
  creator: string
  value: number
  img: string
  categoryId: number
}

export interface ViewItem {
  id: number
  date: string // em formato ISO, ex: "2022-02-09T03:00:00.000Z"
  commentary: string | null
  rating: number
  mediaId: number
  media: Media
}

export interface dataFetchProps {
  items: ViewItem[]
  totalItems: number
}

export interface CardProps {
  source: ViewItem
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

export interface MediaType {
  id: number
  name: string
  proportion: 'RECTANGLE' | 'SQUARE'
}
