import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from './ModalRoot'

interface ModalContentProps {
  children: ReactNode
}

function ModalContent({ children }: ModalContentProps) {
  const { open } = useModal()

  useEffect(() => {
    if (!open) return
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex animate-blowUpModal items-center justify-center bg-modal-overlay/90`}
    >
      <div
        className={`relative flex w-[500px] animate-blowUpContent items-center justify-center rounded-xl p-6`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default ModalContent
