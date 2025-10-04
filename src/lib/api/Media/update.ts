async function updateMediaByData(
  e: React.FormEvent<HTMLFormElement>,
  id: number,
) {
  try {
    const formData = new FormData(e.currentTarget)

    console.log(formData)

    if (formData) {
      const response = await fetch(`/api/media/update?mediaid=${id}`, {
        method: 'PATCH',
        body: formData,
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

export default updateMediaByData
