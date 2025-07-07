import toast from 'react-hot-toast'
import { toggleModal } from './toggleModal'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface dispatchFormProps {
  e: React.FormEvent<HTMLFormElement>
  updaterState: updaterStateProps
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
}

async function dispatchForm({
  e,
  updaterState,
  setToggleModal,
}: dispatchFormProps) {
  e.preventDefault()

  try {
    const formData = new FormData(e.currentTarget)
    console.log(formData)

    const response = await fetch('/api/create', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

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

export default dispatchForm
