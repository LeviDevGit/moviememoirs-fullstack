import { Plus } from 'lucide-react'
import { toggleModal } from './Dismiss'

interface OptionsProps {
  openIt: React.Dispatch<React.SetStateAction<boolean[]>>
}

function Options({ openIt }: OptionsProps) {
  return (
    <div className="flex h-full items-center justify-center font-bold text-white">
      <button
        className="flex h-full w-[110px] items-center justify-center gap-2 rounded-lg bg-button/90 px-3 hover:bg-button"
        onClick={() => {
          toggleModal({ index: 0, set: openIt, toggler: true })
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
    </div>
  )
}

export default Options
