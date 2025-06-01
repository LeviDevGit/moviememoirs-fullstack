import { ChevronDown, Plus } from 'lucide-react'
import { toggleModal } from './Dismiss'

interface OptionsProps {
  openIt: React.Dispatch<React.SetStateAction<boolean[]>>
}

function Options({ openIt }: OptionsProps) {
  return (
    <div className="flex h-[35px] items-center font-bold text-white 2xl:h-[40px]">
      <button
        className="bg-button/90 hover:bg-button flex h-full w-full items-center gap-2 rounded-l-lg px-3 pr-7"
        onClick={() => {
          toggleModal({ index: 0, set: openIt, toggler: true })
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
      <button
        className="bg-button/60 hover:bg-button/70 h-full rounded-r-lg px-3"
        onClick={() => {
          toggleModal({ index: 1, set: openIt, toggler: true })
        }}
      >
        <ChevronDown />
      </button>
    </div>
  )
}

export default Options
