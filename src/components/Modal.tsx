import { ReactNode } from 'react'
import { XIcon } from 'lucide-react'
import { toggleModal } from '@/utils/toggleModal'

interface ModalProps {
  index: number | undefined
  set: React.Dispatch<React.SetStateAction<boolean[]>>
  children: ReactNode
}

function Modal({ set, index, children }: ModalProps) {
  return (
    <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-modal-overlay/90">
      <div className="relative">
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
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
