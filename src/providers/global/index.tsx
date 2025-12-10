import { FilterContent } from '@/app/page'
import { createContext, ReactNode, useState } from 'react'

interface GlobalContextProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  filterContent: FilterContent
  setFilterContent: React.Dispatch<React.SetStateAction<FilterContent>>
  direction: number
  setDirection: React.Dispatch<React.SetStateAction<number>>
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined,
)

interface GlobalProviderProps {
  children: ReactNode
}

const initialFilterContent: FilterContent = {
  searchString: '',
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
