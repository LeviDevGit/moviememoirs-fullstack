import { toggleModal } from '@/utils/toggleModal'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import CategoryListItem from './CategoryListItem'
import { CategoryAndCountType, useCategoryPanel } from './CategoryPanel.hook'

interface CategoryPanelProps {
  setToggleModalProfile: React.Dispatch<React.SetStateAction<boolean[]>>
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryAndCountType | null>
  >
}

function CategoryPanel({
  setToggleModalProfile,
  setSelectedCategory,
}: CategoryPanelProps) {
  const [categories, setCategories] = useState<CategoryAndCountType[]>([])

  useCategoryPanel({ setCategories })

  return (
    <div className="flex h-fit w-[450px] flex-col gap-4 rounded-lg bg-card p-4">
      <h1 className="text-xl font-medium">Minhas categorias</h1>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <CategoryListItem
            key={category.id}
            category={category}
            setToggleModalProfile={setToggleModalProfile}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      <button
        className="flex items-center justify-center gap-2 rounded-full bg-black p-2"
        onClick={() => {
          toggleModal({
            index: 0,
            set: setToggleModalProfile,
            toggler: true,
          })
        }}
      >
        <PlusIcon />
        <span>Adicionar categoria</span>
      </button>
    </div>
  )
}

export default CategoryPanel
