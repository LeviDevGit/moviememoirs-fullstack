async function retrievePerName(name: string) {
  try {
    const response = await fetch(
      `/api/category/retrievePerName?name=${encodeURIComponent(name)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch category by name')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
export default retrievePerName
