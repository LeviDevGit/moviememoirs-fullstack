import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { CategoryAndCountType } from './useCategoryPanel'
import FormCategoryEdit from '../forms/FormCategoryEdit'

interface CategoryListItemProps {
  category: CategoryAndCountType
}

function CategoryListItem({ category }: CategoryListItemProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryAndCountType | null>(null)

  return (
    <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-black/50">
      <span>{category.name}</span>
      <div className="flex items-center">
        <span className="cursor-default rounded-xl bg-black px-2">
          {category.count}
        </span>
        <Modal.Root>
          <Modal.Trigger asChild>
            <button
              className="h-[1em] opacity-0 group-hover:opacity-100"
              onClick={() => {
                setSelectedCategory(category)
              }}
            >
              <EllipsisVerticalIcon className="h-full" />
            </button>
          </Modal.Trigger>
          <Modal.Content>
            <FormCategoryEdit category={selectedCategory} />
            <Modal.Close>
              <span>Fechar</span>
            </Modal.Close>
          </Modal.Content>
        </Modal.Root>
      </div>
    </div>
  )
}

export default CategoryListItem
