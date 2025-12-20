import toast from 'react-hot-toast'

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
  } finally {
    toast.success('Mídia atualizada com sucesso!')
  }
}

export default updateMediaByData
