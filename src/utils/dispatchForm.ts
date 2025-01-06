interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface dispatchFormProps {
  e: React.FormEvent<HTMLFormElement>
  updaterState: updaterStateProps
}

async function dispatchForm({ e, updaterState }: dispatchFormProps) {
  e.preventDefault()

  try {
    const formData = new FormData(e.currentTarget)
    console.log(formData)

    const response = await fetch('/api/post', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data) updaterState.setUpdater(!updaterState.updater)
  } catch (error) {
    console.log('Erro dentro da requisição')
    console.error(error)

    return error
  }
}

export default dispatchForm
