import { toggleModal } from '@/utils/toggleModal'
import { ChevronDownIcon, Plus } from 'lucide-react'
interface OptionsProps {
  openIt: React.Dispatch<React.SetStateAction<boolean[]>>
}

function Options({ openIt }: OptionsProps) {
  return (
    <div className="flex h-full items-center justify-center font-bold">
      <button
        className="flex h-full w-[110px] items-center justify-center gap-2 rounded-l-lg bg-secondary-700 px-3 hover:bg-secondary-600"
        onClick={() => {
          toggleModal({ index: 0, set: openIt, toggler: true })
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
      <div className="h-full w-1 bg-card"></div>
      <button
        className="flex h-full w-[50px] items-center justify-center gap-2 rounded-r-lg bg-secondary-700 px-3 hover:bg-secondary-600"
        onClick={() => {
          toggleModal({ index: 2, set: openIt, toggler: true })
        }}
      >
        <ChevronDownIcon />
      </button>
    </div>
  )
}

export default Options
