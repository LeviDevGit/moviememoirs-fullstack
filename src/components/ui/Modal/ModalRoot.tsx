import { toggleModal } from '@/utils/toggleModal'
import { XIcon } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'

interface ModalRootProps {
  index: number | undefined
  set: React.Dispatch<React.SetStateAction<boolean[]>>
  isOpen?: boolean
  closeIcon?: boolean
  className?: string
  children: ReactNode
}

function ModalRoot({
  set,
  index,
  // isOpen = true,
  closeIcon = true,
  className,
  children,
}: ModalRootProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [])

  const closeWithAnimation = () => {
    setIsClosing(true)
  }

  const handleAnimationEnd = () => {
    if (!isClosing) return
    if (typeof index !== 'undefined') {
      toggleModal({ index, set, toggler: false })
    }
  }

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden bg-modal-overlay/90 ${
        !isClosing ? 'animate-blowUpContentOut' : 'animate-blowUpContent'
      }`}
    >
      <div
        className={`relative flex justify-center rounded-lg bg-background p-4 ${className} ${
          !isClosing ? 'animate-blowUpModal' : 'animate-blowUpModalOut'
        }`}
      >
        {closeIcon && (
          <div className={`absolute right-0 top-0`}>
            <div className="flex gap-5">
              <button onClick={closeWithAnimation} className="rounded-xl p-3">
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
