import { createContext, ReactNode, useContext, useState } from 'react'

interface ModalContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalRootContext = createContext<ModalContextProps | null>(null)

interface ModalRootProps {
  children: ReactNode
}

function ModalRoot({ children }: ModalRootProps) {
  const [open, setOpen] = useState(false)

  return (
    <ModalRootContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalRootContext.Provider>
  )
}

function useModal() {
  const ctx = useContext(ModalRootContext)
  if (!ctx) throw new Error('Modal components must be inside <Modal>')
  return ctx
}

export { ModalRoot, useModal }
