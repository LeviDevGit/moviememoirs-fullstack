import Input from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface EditCreatorModalProps {
  data: {
    creator: string
  }
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
}

function EditCreatorModal({ data, setToggleModal }: EditCreatorModalProps) {
  return (
    <Modal.Root set={setToggleModal} index={1}>
      <Modal.Main>
        <div className="flex w-[300px] flex-col gap-4">
          <div className="flex min-h-[48px] flex-col justify-center gap-2">
            <h1 className="text-xl font-medium">
              Alterar <span className="text-primary">Nome do criador(a)</span>
            </h1>
          </div>
          <form action="" className="flex flex-col gap-4">
            <Input text="Criador" placeholder={data.creator} />
          </form>
        </div>
      </Modal.Main>
      <Modal.Footer>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setToggleModal([false, false])}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </Modal.Footer>
    </Modal.Root>
  )
}

export default EditCreatorModal
