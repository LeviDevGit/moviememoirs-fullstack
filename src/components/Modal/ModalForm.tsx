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
    <div className="w-[600px] p-5">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-3xl font-medium">Registrar nova mídia</h1>
        <p className="text-black/80">
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
          <select name="type" required>
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
        <InputForm
          name="viewDate"
          text="Data de visualização*"
          placeholder="Ex: 25/12/23"
        />
        <div className="flex flex-col">
          <label>Poster*</label>
          <input type="file" name="file" accept=".jpg" required />
        </div>
        <InputForm name="movieValue" text="Nota*" placeholder="De 0 a 5" />
        <div className="flex flex-col">
          <label>Comentário</label>
          <textarea
            name="commentary"
            placeholder="Escreva um comentário (opcional)"
            className="resize-none"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <button
            type="submit"
            className="rounded-xl bg-north-texas-green/90 p-2 px-4 font-bold text-white hover:bg-north-texas-green"
          >
            Registrar
          </button>
          {children}
        </div>
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
        className="rounded-xl border border-gray-500 p-2"
      />
    </div>
  )
}
