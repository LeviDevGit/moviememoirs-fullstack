import { ImageUp } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface ModalFormProps {
  children: React.ReactNode
  updaterState: updaterStateProps
}

export default function ModalForm({ children, updaterState }: ModalFormProps) {
  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
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

  return (
    <div className="page-specific max-h-[400px] w-[600px] overflow-y-scroll bg-[#27272a] p-5 text-white">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-3xl font-medium">Registrar nova mídia</h1>
        <p className="text-[#e0e0e0]">
          Ajude a construir um registro detalhado do que você assiste.
        </p>
      </div>
      <form className="flex flex-col gap-3" onSubmit={submitContact}>
        <InputForm
          name="name"
          text="Nome*"
          placeholder="Digite o nome do filme ou série"
        />
        <div className="flex flex-col">
          <label>Tipo*</label>
          <select
            name="type"
            required
            className="rounded-xl border border-gray-500 bg-transparent p-2"
          >
            <option value="MOVIE">Filme</option>
            <option value="SERIES">Série</option>
            <option value="DOCUMENTARY">Documentário</option>
            <option value="SHORT FILM">Curta</option>
          </select>
        </div>
        <InputForm name="movieDate" text="Lançamento*" placeholder="Ex: 2004" />
        <InputForm name="time" text="Duração*" placeholder="Ex: 2hr 2min" />
        <InputForm
          name="direction"
          text="Diretor(a)*"
          placeholder="Digite o nome do(a) diretor(a)"
        />
        <div className="flex flex-col gap-1">
          <label>Data de visualização*</label>
          <input
            type="date"
            name="viewDate"
            className="rounded-xl border border-gray-500 bg-transparent p-2"
            defaultValue={new Date().toISOString().slice(0, 10)}
            max={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <Dropzone />
        <InputForm name="movieValue" text="Nota*" placeholder="De 0 a 5" />
        <div className="flex flex-col">
          <label>Comentário</label>
          <textarea
            name="commentary"
            placeholder="Escreva um comentário (opcional)"
            className="resize-none rounded-xl border border-gray-500 bg-transparent p-2"
          />
        </div>
        <div className="flex w-full items-center justify-end">{children}</div>
      </form>
    </div>
  )
}

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
}

function InputForm({ text, ...rest }: InputFormProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{text}</label>
      <input
        type="text"
        {...rest}
        required
        className="rounded-xl border border-gray-500 bg-transparent p-2"
      />
    </div>
  )
}

function Dropzone() {
  return (
    <div className="flex w-full items-center justify-center rounded-xl border border-gray-500 p-2">
      <label>
        <div className="flex flex-col items-center justify-center">
          <ImageUp />
          <p>Apenas posters .JPG</p>
        </div>
        <input type="file" name="file" accept=".jpg" className="hidden" />
      </label>
    </div>
  )
}
