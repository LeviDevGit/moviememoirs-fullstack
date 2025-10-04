import Input from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface EditTitleYearModalProps {
  data: {
    name: string
    year: string
  }
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
}

function EditTitleYearModal({ data, setToggleModal }: EditTitleYearModalProps) {
  return (
    <Modal.Root set={setToggleModal} index={0}>
      <Modal.Main>
        <div className="flex w-[300px] flex-col gap-4">
          <div className="flex min-h-[48px] flex-col justify-center gap-2">
            <h1 className="text-xl font-medium">
              Alterar <span className="text-primary">Título</span> e{' '}
              <span className="text-primary">Ano</span>
            </h1>
          </div>
          <form action="" className="flex flex-col gap-4">
            <Input text="Título" placeholder={data.name} />
            <Input text="Ano de lançamento" placeholder={data.year} />
          </form>
        </div>
      </Modal.Main>
      <Modal.Footer>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setToggleModal([false])}
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

export default EditTitleYearModal
