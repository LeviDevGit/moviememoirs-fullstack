import toast from 'react-hot-toast'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface dispatchMediaCreateProps {
  e: React.FormEvent<HTMLFormElement>
  updaterState: updaterStateProps
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

async function dispatchMediaCreate({
  e,
  updaterState,
  setOpen,
}: dispatchMediaCreateProps) {
  e.preventDefault()

  try {
    const formData = new FormData(e.currentTarget)
    console.log(formData)

    const response = await fetch('/api/media/create', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    console.log(data)

    toast.success('Mídia criada com sucesso!')

    setOpen(false)
    if (!data || data.error) {
      return toast.error('Erro dentro da requisição')
    }

    updaterState.setUpdater(!updaterState.updater)
  } catch (error) {
    toast.error('Erro dentro da requisição')

    return error
  }
}

export default dispatchMediaCreate
