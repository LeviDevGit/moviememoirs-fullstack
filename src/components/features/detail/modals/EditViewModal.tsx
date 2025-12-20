import Rater from '@/components/shared/Rater'
import Input from '@/components/ui/Input'
import { useModal } from '@/components/ui/Modal/ModalRoot'
import Textarea from '@/components/ui/Textarea'
import updateViewByData from '@/api/View/update'
import { MediaView } from '@/utils/dispatchDetail'

interface EditViewModalProps {
  modalView: MediaView | undefined
}

function EditViewModal({ modalView }: EditViewModalProps) {
  const { setOpen } = useModal()

  return (
    <div>
      <div>
        <div className="flex w-[300px] flex-col gap-4">
          <div className="flex min-h-[48px] flex-col justify-center gap-2">
            <h1 className="text-xl font-medium">
              Alterar <span className="text-primary">Comentário</span>
            </h1>
          </div>
          <form
            className="flex flex-col gap-4"
            id="edit-commentary-form"
            onSubmit={(e) => {
              e.preventDefault()

              if (modalView) {
                const defaults = {
                  Comentário: modalView.commentary,
                  value: modalView.rating.toString(),
                  Data: new Date(modalView.date).toISOString().slice(0, 10),
                }
                console.log('Defaults:', defaults)

                updateViewByData(e, defaults, modalView.id)
              }
            }}
          >
            <Input
              text="Data"
              type="date"
              defaultValue={
                modalView && new Date(modalView.date).toISOString().slice(0, 10)
              }
            />
            <Textarea
              text="Comentário"
              defaultValue={modalView?.commentary || ''}
            />
            <Rater defaultValue={modalView?.rating} />
          </form>
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
              type="submit"
              form="edit-commentary-form"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditViewModal
