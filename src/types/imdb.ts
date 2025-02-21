type Avatar = {
  url: string
  width: number
  height: number
}

type Person = {
  id: string
  display_name: string
  avatars: Avatar[] | null
}

type Director = {
  name: Person
}

type Writer = {
  name: Person
}

type Cast = {
  name: Person
  characters: string[]
}

type Title = {
  id: string
  primary_title: string
  genres: string[]
  plot: string
  directors: Director[]
  writers: Writer[]
  casts: Cast[]
}

export type MovieDataImdb = {
  data: {
    title: Title
  }
  errors?: {
    message: string
  }
}
