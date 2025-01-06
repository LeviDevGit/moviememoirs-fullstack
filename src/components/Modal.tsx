import { ReactNode } from 'react'
import Dismiss, { DismissProps } from './Dismiss'

interface ModalProps extends DismissProps {
  children: ReactNode
}

function Modal({ set, index, children }: ModalProps) {
  return (
    <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black/70">
      <div className="relative">
        <div className="absolute right-0">
          <Dismiss set={set} index={index} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
