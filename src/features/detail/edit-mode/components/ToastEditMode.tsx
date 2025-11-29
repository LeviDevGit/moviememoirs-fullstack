import { Modal } from '@/shared/ui/Modal'
import { useEffect } from 'react'
import toast, { Toast } from 'react-hot-toast'
import DeleteConfirmModal from '../../modals/components/DeleteConfirmModal'

interface ToastEditModeProps {
  onCancel: (value: React.SetStateAction<boolean>) => void
  mode: boolean
  id: string
}

export function ToastEditMode({ onCancel, mode, id }: ToastEditModeProps) {
  useEffect(() => {
    if (mode) {
      toast.custom(
        (t: Toast) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-lg`}
          >
            <p className="text-base font-medium">Modo de edição ativado</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  toast.remove(t.id)
                  onCancel(false)
                }}
                className="rounded-md border border-gray-300 px-4 py-1.5 text-sm transition hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="detail-form"
                onClick={() => {
                  toast.dismiss(t.id)
                }}
                className="rounded-md bg-blue-600 px-4 py-1.5 text-sm text-white transition hover:bg-blue-700"
              >
                Aceitar
              </button>

              <Modal.Root>
                <Modal.Trigger asChild>
                  <button
                    onClick={() => {
                      toast.dismiss(t.id)
                    }}
                    className="rounded-md bg-red-600 px-4 py-1.5 text-sm text-white transition hover:bg-red-700"
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
          </div>
        ),
        {
          id: 'edit-mode-toast',
          removeDelay: 500,
          //   duration: Infinity,
        },
      )
    } else {
      toast.remove('edit-mode-toast')
    }
  }, [mode])

  return null
}

export default ToastEditMode
