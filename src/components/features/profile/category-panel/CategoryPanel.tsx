'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import CategoryListItem from './CategoryListItem'
import FormCategoryCreate from '../forms/FormCategoryCreate'
import { Modal } from '@/components/ui/Modal'
import { CategoryAndCountType, useCategoryPanel } from './useCategoryPanel'

function CategoryPanel() {
  const [categories, setCategories] = useState<CategoryAndCountType[]>([])

  useCategoryPanel({ setCategories })

  return (
    <div className="flex h-fit w-[450px] flex-col gap-4 rounded-lg bg-card p-4">
      <h1 className="text-xl font-medium">Minhas categorias</h1>
      <div className="flex flex-col gap-2">
        {categories.map((category, index) => (
          <CategoryListItem key={index} category={category} />
        ))}
      </div>
      <Modal.Root>
        <Modal.Trigger asChild>
          <button className="flex items-center justify-center gap-2 rounded-full bg-black p-2">
            <PlusIcon />
            <span>Adicionar categoria</span>
          </button>
        </Modal.Trigger>
        <Modal.Content>
          <FormCategoryCreate />
          <Modal.Close>
            <span>Fechar</span>
          </Modal.Close>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}

export default CategoryPanel
