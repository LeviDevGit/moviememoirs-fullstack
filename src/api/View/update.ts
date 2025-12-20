async function updateViewByData(
  e: React.FormEvent<HTMLFormElement>,
  defaults: {
    Comentário: string | null
    value: string
    Data: string
  },
  id: number,
) {
  try {
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries())

    const updatedFields = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== defaults[key as keyof typeof defaults],
      ),
    )
    console.log('Campos diferentes:', updatedFields)

    if (updatedFields) {
      const response = await fetch(`/api/view/update?viewId=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })

      const data = await response.json()

      console.log(data)
      //   if (data) setSafetyButton(undefined)
      if (data.error) {
        // toast.error(data.error)
        return []
      } else {
        return data
      }
    }
  } catch (error) {
    console.log(error)

    return error
  }
}

export default updateViewByData
