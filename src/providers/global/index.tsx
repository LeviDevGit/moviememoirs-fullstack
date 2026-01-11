import { createContext, ReactNode, useState } from 'react'

export type MediaFilters = {
  category: string
  order: 'recent' | 'release' | 'rating_desc' | 'rating_asc'
  creator: string
  fromYear?: string
  toYear?: string
  minRating: number
  filter: string
}

interface GlobalContextProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  filterContent: MediaFilters
  setFilterContent: React.Dispatch<React.SetStateAction<MediaFilters>>
  direction: number
  setDirection: React.Dispatch<React.SetStateAction<number>>
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined,
)

interface GlobalProviderProps {
  children: ReactNode
}

export const initialFilterContent: MediaFilters = {
  category: 'Todas',
  order: 'recent',
  creator: '',
  fromYear: undefined,
  toYear: undefined,
  minRating: 0,
  filter: '',
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  // State updater
  const [updater, setUpdater] = useState<boolean>(false)

  const [filterContent, setFilterContent] =
    useState<MediaFilters>(initialFilterContent)

  const [direction, setDirection] = useState(0)

  return (
    <GlobalContext.Provider
      value={{
        updater,
        setUpdater,
        filterContent,
        setFilterContent,
        direction,
        setDirection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
