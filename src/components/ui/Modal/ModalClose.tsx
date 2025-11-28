import { cloneElement } from 'react'
import { useModal } from './ModalRoot'

interface ModalCloseProps {
  asChild?: boolean
  children: React.ReactElement
}

export default function ModalClose({
  asChild = false,
  children,
}: ModalCloseProps) {
  const { setOpen } = useModal()

  if (asChild) {
    return cloneElement(children, {
      onClick: () => setOpen(false),
    })
  }

  return <button onClick={() => setOpen(false)}>{children}</button>
}
