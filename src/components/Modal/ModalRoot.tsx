import { ReactNode } from 'react'

interface ModalRootProps {
  children: ReactNode
}

export default function ModalRoot({ children }: ModalRootProps) {
  return (
    <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black/70">
      <div className="relative rounded-lg bg-white">{children}</div>
    </div>
  )
}
