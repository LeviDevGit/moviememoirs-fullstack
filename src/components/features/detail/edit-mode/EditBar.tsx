import { Modal } from '@/components/ui/Modal'
import DeleteConfirmModal from '../modals/DeleteConfirmModal'

interface EditBarProps {
  id: string
  setEditMode: (value: boolean) => void
}

export default function EditBar({ id, setEditMode }: EditBarProps) {
  return (
    <div className="animate-in slide-in-from-bottom-10 fade-in fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/10 bg-slate-800/90 px-6 py-3 shadow-2xl backdrop-blur-xl duration-300">
      <span className="hidden text-sm font-medium text-white sm:inline">
        Modo Edição
      </span>
      <div className="h-full border"></div>
      <button
        className="rounded-md bg-gray-400 p-1 px-2"
        type="button"
        onClick={() => {
          setEditMode(false)
        }}
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="detail-form"
        className="rounded-md bg-blue-600 px-4 py-1.5 text-sm text-white transition hover:bg-blue-700"
      >
        Salvar Alterações
      </button>
      <Modal.Root>
        <Modal.Trigger asChild>
          <button
            className="rounded-md bg-red-600 p-1 px-2 text-red-100"
            type="button"
          >
            Deletar
          </button>
        </Modal.Trigger>
        <Modal.Content>
          <DeleteConfirmModal id={id} />
          <Modal.Close>
            <span>Fechar</span>
          </Modal.Close>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}
