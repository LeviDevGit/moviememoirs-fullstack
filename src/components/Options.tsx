import { ChevronDown, Plus } from 'lucide-react'
import { toggleModal } from './Dismiss'

interface OptionsProps {
  openIt: React.Dispatch<React.SetStateAction<boolean[]>>
}

function Options({ openIt }: OptionsProps) {
  return (
    <div className="flex h-[35px] items-center font-bold text-white 2xl:h-[40px]">
      <button
        className="flex h-full w-full items-center gap-2 rounded-l-lg bg-north-texas-green/90 px-3 pr-7 hover:bg-north-texas-green"
        onClick={() => {
          toggleModal({ index: 0, set: openIt, toggler: true })
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
      <button
        className="h-full rounded-r-lg bg-north-texas-green/60 px-3 hover:bg-north-texas-green/70"
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
