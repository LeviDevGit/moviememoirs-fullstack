import deleteMediaById from '@/lib/api/Media/delete'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useModal } from '@/shared/ui/Modal/ModalRoot'

interface DeleteConfirmModalProps {
  id: string
}

function DeleteConfirmModal({ id }: DeleteConfirmModalProps) {
  const router = useRouter()

  const { setOpen } = useModal()

  return (
    <div>
      <div>
        <div className="flex w-[300px] flex-col gap-4">
          <div className="flex min-h-[48px] flex-col justify-center gap-2">
            <h1 className="text-xl font-medium">
              Tem certeza que quer{' '}
              <span className="text-primary">apagar para SEMPRE?</span>
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            onClick={async () => {
              const result = await deleteMediaById(id)

              if (result.success) {
                console.log(result.message)
                toast.success('Mídia deletada com sucesso')
                router.push('/')
              }
            }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
