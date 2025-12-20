type ExtraSectionResponse = [] | { error: string }

async function retrieveExtraSectionById(id: number) {
  try {
    const response = await fetch(
      `/api/extra-section/retrieve?CategoryId=${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!response.ok) {
      return { error: 'Failed to fetch extra section data' }
    }

    const data: ExtraSectionResponse = await response.json()

    if ('error' in data) {
      return []
    }

    return data
  } catch (error) {
    console.error(error)

    return { error: 'Não foi possível carregar a seção extra neste momento.' }
  }
}

export default retrieveExtraSectionById
