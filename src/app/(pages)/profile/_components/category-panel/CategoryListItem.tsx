import { toggleModal } from '@/utils/toggleModal'
import { EllipsisVerticalIcon } from 'lucide-react'
import { CategoryAndCountType } from './CategoryPanel.hook'

interface CategoryListItemProps {
  setToggleModalProfile: React.Dispatch<React.SetStateAction<boolean[]>>
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryAndCountType | null>
  >
  category: CategoryAndCountType
}

function CategoryListItem({
  setToggleModalProfile,
  setSelectedCategory,
  category,
}: CategoryListItemProps) {
  return (
    <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-black/50">
      <span>{category.name}</span>
      <div className="flex items-center">
        <span className="cursor-default rounded-xl bg-black px-2">
          {category.count}
        </span>
        <button
          className="h-[1em] opacity-0 group-hover:opacity-100"
          onClick={() => {
            setSelectedCategory(category)
            toggleModal({
              index: 1,
              set: setToggleModalProfile,
              toggler: true,
            })
          }}
        >
          <EllipsisVerticalIcon className="h-full" />
        </button>
      </div>
    </div>
  )
}

export default CategoryListItem
