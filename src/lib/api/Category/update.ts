async function updateCategory(e: React.FormEvent<HTMLFormElement>, id: number) {
  e.preventDefault()

  try {
    const formData = new FormData(e.currentTarget)

    const payload = { name: formData.get('Nome da categoria') }

    const response = await fetch(`/api/category/update?categoryId=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)

    return error
  }
}

export default updateCategory
