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

  return (
    <button
      type="button"
      className="rounded px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-800 hover:text-gray-300 focus:outline-none"
      aria-label="Close"
      onClick={() => setOpen(false)}
    >
      {children}
    </button>
  )
}
