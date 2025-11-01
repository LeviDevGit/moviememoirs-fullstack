async function readCategory() {
  try {
    const response = await fetch(`/api/category/read`, {
      method: 'GET',
    })

    const data = await response.json()
    console.log(data)

    return data
  } catch (error) {
    console.log(error)

    return error
  }
}

export default readCategory
