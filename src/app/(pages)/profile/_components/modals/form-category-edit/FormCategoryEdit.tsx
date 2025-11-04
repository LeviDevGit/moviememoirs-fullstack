import Input from '@/components/ui/Input'
import { CategoryAndCountType } from '../../category-panel/CategoryPanel.hook'

interface FormCategoryEditProps {
  category: CategoryAndCountType | null
}

function FormCategoryEdit({ category }: FormCategoryEditProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-5">
      <div className="text-xl font-medium">Editar Categoria</div>
      <div>
        <form action="">
          <Input text="Nome da categoria" placeholder={category?.name} />
        </form>
      </div>
      <footer className="mt-6 flex justify-between">
        <button className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-500">
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
