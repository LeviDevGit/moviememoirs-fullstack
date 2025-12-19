import { Modal } from '@/components/ui/Modal'
import deleteMediaById from '@/lib/api/Media/delete'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TrashIcon, TriangleAlertIcon } from 'lucide-react'

interface EditBarProps {
  id: string
  setEditMode: (value: boolean) => void
  mediaName: string
}

export default function EditBar({ id, setEditMode, mediaName }: EditBarProps) {
  const router = useRouter()

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
          <div className="flex w-[400px] flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <TriangleAlertIcon size={32} />
            </div>
            <div className="flex min-h-[48px] flex-col justify-center gap-2">
              <h3 className="mb-2 text-xl font-bold text-[#E5E7EB]">
                Confirmar Exclusão
              </h3>
              <p className="text-sm leading-relaxed text-[#9CA3AF]">
                Você tem certeza que deseja remover{' '}
                <span className="font-semibold text-primary">
                  &quot;{mediaName}&quot;
                </span>
                ? Esta ação não pode ser desfeita e todos os dados associados
                serão perdidos.
              </p>
            </div>
          </div>
          <Modal.Footer layout="spaced">
            <Modal.Close bordered flex="half">
              <span>Não, cancelar</span>
            </Modal.Close>
            <button
              type="button"
              className="flex h-[40px] flex-1 items-center justify-center gap-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              onClick={async () => {
                const result = await deleteMediaById(id)

                if (result.success) {
                  toast.success('Mídia deletada com sucesso')
                  router.push('/')
                }
              }}
            >
              <TrashIcon size={16} />
              Sim, excluir
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}
