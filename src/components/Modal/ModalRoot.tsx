import { ReactNode } from 'react'

interface ModalRootProps {
  children: ReactNode
}

export default function ModalRoot({ children }: ModalRootProps) {
  return <div>{children}</div>
}
