import { Modal } from '@/shared/ui/Modal'
import { FilterIcon } from 'lucide-react'
import FilterMenu from './FilterMenu'
import { FilterContent } from '@/app/page'

interface FilterButtonProps {
  option: Record<string, string>
  filterContent: FilterContent
}

export default function FilterButton({
  option,
  filterContent,
}: FilterButtonProps) {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-[#1F2937] text-sm hover:bg-gray-700 hover:text-text-50">
          <button className="flex h-full w-full items-center justify-center text-[#9CA3AF]">
            <FilterIcon size={16} />
          </button>
          <span className="absolute -bottom-2 -right-2 w-5 cursor-default rounded-full bg-red-500 text-center">
            {Object.keys(option).length > 0 && Object.keys(option).length}
          </span>
        </div>
      </Modal.Trigger>
      <Modal.Content>
        <FilterMenu filterContent={filterContent} />
        <Modal.Close>
          <span>Fechar</span>
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  )
}
