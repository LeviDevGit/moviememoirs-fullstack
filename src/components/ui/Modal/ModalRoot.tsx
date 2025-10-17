import { toggleModal } from '@/utils/toggleModal'
import { XIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface ModalRootProps {
  index: number | undefined
  set: React.Dispatch<React.SetStateAction<boolean[]>>
  closeIcon?: boolean
  children: ReactNode
}

function ModalRoot({ set, index, closeIcon = true, children }: ModalRootProps) {
  return (
    <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-modal-overlay/90">
      <div className="relative rounded-lg bg-background p-4">
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
