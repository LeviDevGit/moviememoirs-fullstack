import { CategoryBody } from '@/app/(pages)/profile/_components/modals/form-category-create/FormCategoryCreate'
import toast from 'react-hot-toast'

async function createCategory(formData: CategoryBody) {
  try {
    const response = await fetch(`/api/category/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (data.error) {
      toast.error(data.error)
      return []
    } else {
      return data
    }
  } catch (error) {
    console.log(error)

    return error
  }
}

export default createCategory
