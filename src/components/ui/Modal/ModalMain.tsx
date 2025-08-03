import { ReactNode } from 'react'

interface ModalMainProps {
  children: ReactNode
}

function ModalMain({ children }: ModalMainProps) {
  return <div>{children}</div>
}

export default ModalMain
