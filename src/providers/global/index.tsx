import { createContext, ReactNode, useState } from 'react'

interface GlobalContextProps {
  toggleModalList: boolean[]
  setToggleModalList: React.Dispatch<React.SetStateAction<boolean[]>>
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined,
)

interface GlobalProviderProps {
  children: ReactNode
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  // 0: FormMedia, 1: Filter, 2: FormCategory
  const [toggleModalList, setToggleModalList] = useState([false, false, false])

  // State updater
  const [updater, setUpdater] = useState<boolean>(false)

  return (
    <GlobalContext.Provider
      value={{ toggleModalList, setToggleModalList, updater, setUpdater }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
