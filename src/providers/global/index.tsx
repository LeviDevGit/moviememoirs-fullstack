import { FilterContent } from '@/app/page'
import { createContext, ReactNode, useState } from 'react'

interface GlobalContextProps {
  toggleModalList: boolean[]
  setToggleModalList: React.Dispatch<React.SetStateAction<boolean[]>>
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  filterContent: FilterContent
  setFilterContent: React.Dispatch<React.SetStateAction<FilterContent>>
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
  // 0: FormMedia, 1: Filter,
  const [toggleModalList, setToggleModalList] = useState([false, false])

  // State updater
  const [updater, setUpdater] = useState<boolean>(false)

  const [filterContent, setFilterContent] =
    useState<FilterContent>(initialFilterContent)

  return (
    <GlobalContext.Provider
      value={{
        toggleModalList,
        setToggleModalList,
        updater,
        setUpdater,
        filterContent,
        setFilterContent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
