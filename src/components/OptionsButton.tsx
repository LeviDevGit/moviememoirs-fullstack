import { ChevronDown, Plus } from 'lucide-react'
import { toggleModalFunction } from './Modal/ModalFooter'

interface OptionsButtonProps {
  openIt: React.Dispatch<React.SetStateAction<boolean[]>>
}

export default function OptionsButton({ openIt }: OptionsButtonProps) {
  return (
    <div className="flex h-[40px] items-center font-bold text-white">
      <button
        className="flex h-full w-full items-center gap-2 rounded-l-lg bg-north-texas-green/90 px-3 pr-7 hover:bg-north-texas-green"
        onClick={() => {
          toggleModalFunction(0, openIt, true)
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
      <button
        className="h-full rounded-r-lg bg-north-texas-green/60 px-3 hover:bg-north-texas-green/70"
        onClick={() => {
          toggleModalFunction(1, openIt, true)
        }}
      >
        <ChevronDown />
      </button>
    </div>
  )
}
