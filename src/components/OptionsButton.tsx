import { ChevronDown, Plus } from 'lucide-react'

interface OptionsButtonProps {
  openIt: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OptionsButton({ openIt }: OptionsButtonProps) {
  return (
    <div className="flex h-[45px] cursor-pointer items-center gap-4 rounded-lg bg-antique-ruby/70 font-bold text-white hover:bg-antique-ruby/80">
      <button
        className="flex w-full items-center gap-2 px-3"
        onClick={() => {
          openIt(true)
        }}
      >
        <Plus />
        <span>Log</span>
      </button>
      <button className="h-full rounded-r-lg bg-antique-ruby px-3">
        <ChevronDown />
      </button>
    </div>
  )
}
