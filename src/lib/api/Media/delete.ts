async function deleteMediaById(mediaId: string) {
  try {
    console.log(mediaId)

    const response = await fetch(`/api/delete?id=${mediaId}`, {
      method: 'DELETE',
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default deleteMediaById
