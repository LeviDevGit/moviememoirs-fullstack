async function counterView() {
  try {
    const response = await fetch('/api/view/counter', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch counter view')
    }

    const data: number = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    return error
  }
}

export default counterView
