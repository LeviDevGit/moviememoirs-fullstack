import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from './ModalRoot'
import { XIcon } from 'lucide-react'

interface ModalContentProps {
  children: ReactNode
}

function ModalContent({ children }: ModalContentProps) {
  const { open, setOpen } = useModal()

  useEffect(() => {
    if (!open) return
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="relative flex w-fit animate-blowUpContent flex-col items-center justify-center rounded-xl bg-card p-6 shadow-2xl ring-1 ring-white/15">
        <button
          type="button"
          className="absolute right-6 top-6 -me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <XIcon size={20} color="white" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default ModalContent
