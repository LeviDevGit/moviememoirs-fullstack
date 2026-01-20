import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { CategoryAndCountType } from './useCategoryPanel'
import FormCategoryEdit from '../forms/FormCategoryEdit'
import deleteCategoryById from '@/api/Category/delete'
import retrievePerName from '@/api/Category/retrievePerName'

export type CategoryType = {
  id: number
  name: string
  proportion: 'RECTANGLE'
}

interface CategoryListItemProps {
  category: CategoryAndCountType
}

function CategoryListItem({ category }: CategoryListItemProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  )

  async function handleSelectCategory() {
    const data = await retrievePerName(category.name)
    setSelectedCategory(data)
  }

  return (
    <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-black/50">
      <span>{category.name}</span>
      <div className="flex items-center">
        <span className="cursor-default rounded-xl bg-black px-2">
          {category.total}
        </span>
        <Modal.Root>
          <Modal.Trigger asChild>
            <button
              className="h-[1em] opacity-0 group-hover:opacity-100"
              onClick={() => handleSelectCategory()}
            >
              <EllipsisVerticalIcon className="h-full" />
            </button>
          </Modal.Trigger>
          {selectedCategory && (
            <Modal.Content>
              <FormCategoryEdit category={selectedCategory} />
              <Modal.Footer>
                <Modal.Close asChild>
                  <button
                    type="button"
                    className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-500"
                    onClick={() => deleteCategoryById(selectedCategory.id)}
                  >
                    Deletar
                  </button>
                </Modal.Close>
                <Modal.Close>
                  <span>Fechar</span>
                </Modal.Close>
                <button
                  type="submit"
                  form="form-category-edit"
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Salvar
                </button>
              </Modal.Footer>
            </Modal.Content>
          )}
        </Modal.Root>
      </div>
    </div>
  )
}

export default CategoryListItem
