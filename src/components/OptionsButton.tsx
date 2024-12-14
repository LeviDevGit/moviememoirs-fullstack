import { ChevronDown, Plus } from 'lucide-react'

interface OptionsButtonProps {
  openItAdd: React.Dispatch<React.SetStateAction<boolean>>
  openItManagemenet: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OptionsButton({
  openItAdd,
  openItManagemenet,
}: OptionsButtonProps) {
  return (
    <div className="flex h-[40px] items-center font-bold text-white">
      <button
        className="bg-north-texas-green/90 hover:bg-north-texas-green flex h-full w-full items-center gap-2 rounded-l-lg px-3 pr-7"
        onClick={() => {
          openItAdd(true)
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
      <button
        className="bg-north-texas-green/60 hover:bg-north-texas-green/70 h-full rounded-r-lg px-3"
        onClick={() => {
          openItManagemenet(true)
        }}
      >
        <ChevronDown />
      </button>
    </div>
  )
}
