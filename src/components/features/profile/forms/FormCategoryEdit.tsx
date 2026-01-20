import updateCategory from '@/api/Category/update'
import { useModal } from '@/components/ui/Modal/ModalRoot'
import Input from '@/components/ui/Input'
import { CategoryType } from '../category-panel/CategoryListItem'

interface FormCategoryEditProps {
  category: CategoryType
}

function FormCategoryEdit({ category }: FormCategoryEditProps) {
  const { setOpen } = useModal()

  return (
    <div className="flex flex-col gap-4 rounded-lg p-5">
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
    </div>
  )
}

export default FormCategoryEdit
