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
        className="flex h-full w-full items-center gap-2 rounded-l-lg bg-antique-ruby/70 px-3 pr-7 hover:bg-antique-ruby/80"
        onClick={() => {
          openItAdd(true)
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
      <button
        className="h-full rounded-r-lg bg-antique-ruby px-3 hover:bg-solid-pink"
        onClick={() => {
          openItManagemenet(true)
        }}
      >
        <ChevronDown />
      </button>
    </div>
  )
}
