async function retrieveExtraSectionById(id: number) {
  try {
    const response = await fetch(
      `/api/extra-section/retrieve?CategoryId=${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    const data = await response.json()

    if (data.error) {
      // toast.error(data.error)
      return []
    } else {
      return data
    }
  } catch (error) {
    console.log(error)

    return error
  }
}

export default retrieveExtraSectionById
