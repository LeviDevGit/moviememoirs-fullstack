type DeleteResponse = {
  success: boolean
  message: string
}

async function deleteMediaById(mediaId: string): Promise<DeleteResponse> {
  try {
    const response = await fetch(`/api/media/delete?id=${mediaId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro ao deletar')
    }

    const data = await response.json()
    return { success: true, message: data.message }
  } catch (error) {
    console.log(error)
    return { success: false, message: (error as Error).message }
  }
}

export default deleteMediaById
