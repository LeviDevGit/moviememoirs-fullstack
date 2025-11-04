import { ReactNode } from 'react'

interface ModalMainProps {
  children: ReactNode
}

function ModalMain({ children }: ModalMainProps) {
  return <div className="w-full">{children}</div>
}

export default ModalMain
