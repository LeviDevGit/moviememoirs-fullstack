async function deleteCategoryById(categoryId: number) {
  try {
    const response = await fetch(
      `/api/category/delete?CategoryId=${categoryId}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro ao deletar categoria')
    }

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default deleteCategoryById
