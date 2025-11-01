import readCategory from '@/lib/api/Category/read'
import counterPerCategoryId from '@/lib/api/View/counterPerCategoryId'
import { toggleModal } from '@/utils/toggleModal'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CategoryPanelProps {
  setToggleModalProfile: React.Dispatch<React.SetStateAction<boolean[]>>
}

interface MediaType {
  id: number
  name: string
  proportion: 'RECTANGLE' | 'SQUARE'
  count?: number
}

function CategoryPanel({ setToggleModalProfile }: CategoryPanelProps) {
  const [categories, setCategories] = useState<MediaType[]>([])

  useEffect(() => {
    async function handleReadCategory() {
      const fetched = await readCategory()
      setCategories(fetched)
      await counterPerCategoryId(fetched, setCategories)
    }
    handleReadCategory()
  }, [])

  return (
    <div className="flex h-fit w-[450px] flex-col gap-4 rounded-lg bg-card p-4">
      <h1 className="text-xl font-medium">Minhas categorias</h1>
      <div>
        {categories.map((category) => (
          <div key={category.id} className="flex justify-between">
            <span>{category.name}</span>
            <span className="rounded-xl bg-black px-2">{category.count}</span>
          </div>
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
