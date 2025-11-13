async function getAverageRating() {
  try {
    const response = await fetch('/api/view/average', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch average rating')
    }

    const data: { average: number } = await response.json()

    console.log(Math.round(data.average))

    return Math.round(data.average)
  } catch (error) {
    console.error(error)
    return error
  }
}

export default getAverageRating
