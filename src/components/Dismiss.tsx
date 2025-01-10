import { X } from 'lucide-react'

interface ToggleModalProps {
  index: number
  set: React.Dispatch<React.SetStateAction<boolean[]>>
  toggler: boolean
}

export function toggleModal({ set, index, toggler }: ToggleModalProps) {
  set((prev) => {
    const newModals = [...prev]
    newModals[index] = toggler
    return newModals
  })
}

export interface DismissProps {
  index: number
  set: React.Dispatch<React.SetStateAction<boolean[]>>
}

function Dismiss({ index, set }: DismissProps) {
  return (
    <div className="flex gap-5">
      <button
        onClick={() => {
          toggleModal({ index, set, toggler: false })
        }}
        className="rounded-xl p-3 text-white"
      >
        <X />
      </button>
    </div>
  )
}

export default Dismiss
