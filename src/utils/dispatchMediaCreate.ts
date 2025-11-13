import toast from 'react-hot-toast'
import { toggleModal } from './toggleModal'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface dispatchMediaCreateProps {
  e: React.FormEvent<HTMLFormElement>
  updaterState: updaterStateProps
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
}

async function dispatchMediaCreate({
  e,
  updaterState,
  setToggleModal,
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

    toggleModal({ index: 0, set: setToggleModal, toggler: false })
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
