async function getFavoriteName() {
  try {
    const response = await fetch('/api/category/favorite', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch favorite name')
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default getFavoriteName
