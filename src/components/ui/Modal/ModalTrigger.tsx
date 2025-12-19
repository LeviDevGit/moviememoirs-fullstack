import { cloneElement } from 'react'
import { useModal } from './ModalRoot'

interface ModalTriggerProps {
  asChild?: boolean
  children: React.ReactElement
}

export default function ModalTrigger({
  asChild = false,
  children,
}: ModalTriggerProps) {
  const { setOpen } = useModal()

  if (asChild) {
    return cloneElement(children, {
      onClick: () => setOpen(true),
    })
  }

  return <button onClick={() => setOpen(true)}>{children}</button>
}
