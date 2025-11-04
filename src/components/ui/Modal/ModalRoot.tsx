import { toggleModal } from '@/utils/toggleModal'
import { XIcon } from 'lucide-react'
import { ReactNode, useEffect } from 'react'

interface ModalRootProps {
  index: number | undefined
  set: React.Dispatch<React.SetStateAction<boolean[]>>
  closeIcon?: boolean
  className?: string
  children: ReactNode
}

function ModalRoot({
  set,
  index,
  closeIcon = true,
  className,
  children,
}: ModalRootProps) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [])

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden bg-modal-overlay/90">
      <div
        className={`relative flex justify-center rounded-lg bg-background p-4 ${className}`}
      >
        {closeIcon && (
          <div className="absolute right-0">
            <div className="flex gap-5">
              <button
                onClick={() => {
                  if (typeof index !== 'undefined') {
                    toggleModal({ index, set, toggler: false })
                  }
                }}
                className="rounded-xl p-3"
              >
                <XIcon className="text-text-50" />
              </button>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default ModalRoot
