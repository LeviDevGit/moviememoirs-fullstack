import { FilterContent } from '@/app/page'
import { FilterOrdering } from '@/components/features/home/filters/types'
import { createContext, ReactNode, useState } from 'react'

interface GlobalContextProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  filterContent: FilterContent
  setFilterContent: React.Dispatch<React.SetStateAction<FilterContent>>
  direction: number
  setDirection: React.Dispatch<React.SetStateAction<number>>
  filterOrdering: FilterOrdering
  setFilterOrdering: React.Dispatch<React.SetStateAction<FilterOrdering>>
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined,
)

interface GlobalProviderProps {
  children: ReactNode
}

const initialFilterContent: FilterContent = {
  filter: '',
  directorString: undefined,
  yearString: undefined,
  valueString: undefined,
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  // State updater
  const [updater, setUpdater] = useState<boolean>(false)

  const [filterContent, setFilterContent] =
    useState<FilterContent>(initialFilterContent)

  const [direction, setDirection] = useState(0)

  const [filterOrdering, setFilterOrdering] = useState<FilterOrdering>({
    typeBy: 'all',
    orderBy: 'recent',
  })

  return (
    <GlobalContext.Provider
      value={{
        updater,
        setUpdater,
        filterContent,
        setFilterContent,
        direction,
        setDirection,
        filterOrdering,
        setFilterOrdering,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
