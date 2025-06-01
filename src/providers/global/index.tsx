import { createContext, ReactNode, useState } from 'react'

interface GlobalContextProps {
  toggleModal: boolean[]
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
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
  // 0: Form, 1: Managment, 2: Filter
  const [toggleModal, setToggleModal] = useState([false, false, false])

  // State updater
  const [updater, setUpdater] = useState<boolean>(false)

  return (
    <GlobalContext.Provider
      value={{ toggleModal, setToggleModal, updater, setUpdater }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
