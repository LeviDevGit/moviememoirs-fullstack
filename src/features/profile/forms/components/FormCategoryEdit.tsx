import Input from '@/shared/ui/Input'
import updateCategory from '@/lib/api/Category/update'
import deleteCategoryById from '@/lib/api/Category/delete'
import { useModal } from '@/shared/ui/Modal/ModalRoot'
import { CategoryAndCountType } from '../../category-panel/hooks/useCategoryPanel'

interface FormCategoryEditProps {
  category: CategoryAndCountType | null
}

function FormCategoryEdit({ category }: FormCategoryEditProps) {
  const { setOpen } = useModal()

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-5">
      <div className="text-xl font-medium">Editar Categoria</div>
      <div>
        <form
          id="form-category-edit"
          onSubmit={(e) => {
            if (category) updateCategory(e, category.id)
            setOpen(false)
          }}
          autoComplete="off"
        >
          <Input text="Nome da categoria" placeholder={category?.name} />
        </form>
      </div>
      <footer className="mt-6 flex justify-between">
        <button
          type="button"
          className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-500"
          onClick={() => {
            if (category) deleteCategoryById(category.id)
            setOpen(false)
          }}
        >
          Deletar
        </button>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="form-category-edit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </footer>
    </div>
  )
}

export default FormCategoryEdit
