import { ChevronDown, Plus } from 'lucide-react'

export default function OptionsButton() {
  return (
    <div className="bg-antique-ruby/70 hover:bg-antique-ruby/80 flex h-[45px] cursor-pointer items-center gap-4 rounded-lg font-bold text-white">
      <button className="flex w-full items-center gap-2 px-3">
        <Plus />
        <span>Log</span>
      </button>
      <button className="bg-antique-ruby h-full rounded-r-lg px-3">
        <ChevronDown />
      </button>
    </div>
  )
}
