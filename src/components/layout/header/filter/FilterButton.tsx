import { FilterIcon } from 'lucide-react'
import FilterMenu from './FilterMenu'
import { Modal } from '@/components/ui/Modal'

export default function FilterButton() {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-[#1F2937] text-sm hover:bg-gray-700 hover:text-text-50">
          <button className="flex h-full w-full items-center justify-center text-[#9CA3AF]">
            <FilterIcon size={16} />
          </button>
          <span className="absolute -bottom-2 -right-2 w-5 cursor-default rounded-full bg-red-500 text-center">
            {/* {Object.keys(option).length > 0 && Object.keys(option).length} */}
          </span>
        </div>
      </Modal.Trigger>
      <Modal.Content>
        <FilterMenu />
        <Modal.Footer layout="between">
          <button className="text-sm text-text-muted">Limpar Filtros</button>
          <div className="flex items-center">
            <Modal.Close>
              <span>Cancelar</span>
            </Modal.Close>
            <button
              className="flex items-center gap-2 rounded-md bg-[#8B5CF6e5] px-4 py-2 text-sm font-medium text-white"
              form="form-filters-media"
              type="submit"
            >
              <FilterIcon size={16} /> Aplicar Filtros
            </button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  )
}
