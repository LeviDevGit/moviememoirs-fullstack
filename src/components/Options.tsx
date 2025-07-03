import { Plus } from 'lucide-react'
import { toggleModal } from './Dismiss'

interface OptionsProps {
  openIt: React.Dispatch<React.SetStateAction<boolean[]>>
}

function Options({ openIt }: OptionsProps) {
  return (
    <div className="flex h-full items-center justify-center font-bold text-white">
      <button
        className="bg-secondary hover:bg-secondary flex h-full w-[110px] items-center justify-center gap-2 rounded-lg px-3"
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
