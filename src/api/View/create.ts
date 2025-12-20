async function createView(formData: FormData, id: number) {
  try {
    console.log(formData)

    const payload = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >

    const response = await fetch(`/api/view/create?mediaId=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    console.log(data)

    if (data.error) {
      return { error: data.error }
    } else {
      return data
    }
  } catch (error) {
    console.log(error)

    return { error }
  }
}

export default createView
