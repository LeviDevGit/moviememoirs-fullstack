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

  const formData = new FormData(e.currentTarget)

  const data = Object.fromEntries(formData.entries())

  const errors = validateMovieData(data)

  if (Object.keys(errors).length > 0) {
    toast.error(Object.values(errors)[0])

    return
  }

  try {
    const response = await fetch('/api/media/create', {
      method: 'POST',
      body: formData,
    })

    const responseData = await response.json()

    toast.success('Mídia criada com sucesso!')

    setOpen(false)
    if (!responseData || responseData.error) {
      return toast.error('Erro dentro da requisição')
    }

    updaterState.setUpdater(!updaterState.updater)
  } catch (error) {
    toast.error('Erro dentro da requisição')

    return error
  }
}

// Validação de dados

interface MediaData {
  Nome?: string
  'Ano de lançamento'?: string
  Duração?: string
  'Criador(a)'?: string
  value?: string
  file?: File
}

interface ValidationErrors {
  Nome?: string
  Ano?: string
  Duração?: string
  'Criador(a)'?: string
  Value?: string
  file?: string
}

const validateMovieData = (data: MediaData): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.Nome?.trim()) errors.Nome = 'O nome é obrigatório.'
  if (!data['Ano de lançamento']) errors.Ano = 'O ano é obrigatório.'
  if (!data.Duração) errors.Duração = 'A duração é obrigatória.'
  if (!data['Criador(a)']?.trim())
    errors['Criador(a)'] = 'O criador(a) é obrigatório.'
  if (data.value && parseFloat(data.value) <= 0)
    errors.Value = 'A nota deve ser maior que zero.'

  // Validação de arquivo
  if (data.file && data.file.size === 0) {
    errors.file = 'Selecione uma imagem.'
  }

  return errors
}

export default dispatchMediaCreate
