import { toggleModal } from '@/components/Dismiss'

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

    console.log(data)

    if (data) updaterState.setUpdater(!updaterState.updater)
    if (data) toggleModal({ index: 0, set: setToggleModal, toggler: false })
  } catch (error) {
    console.log('Erro dentro da requisição')
    console.error(error)

    return error
  }
}

export default dispatchForm
