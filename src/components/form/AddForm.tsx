import InputField from './InputField'
import Dropzone from './Dropzone'
import dispatchForm from '@/utils/dispatchForm'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface AddFormProps {
  children: React.ReactNode
  updaterState: updaterStateProps
}

function AddForm({ children, updaterState }: AddFormProps) {
  return (
    <div className="page-specific w-[600px] rounded-2xl bg-[#27272a] p-5 text-white">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-xl font-medium">
          Registrar <span className="text-[#8f001a]">Mídia</span>
        </h1>
        <p className="text-xs text-[#e0e0e0]">
          Ajude a construir um registro detalhado do que você assiste.
        </p>
      </div>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => dispatchForm({ e, updaterState })}
        autoComplete="off"
      >
        <InputField
          name="name"
          text="Nome"
          placeholder="Digite o nome do filme ou série"
        />
        <div className="flex items-center gap-6">
          <div className="flex w-1/2 flex-col text-xs">
            <label>
              Tipo <strong>*</strong>
            </label>
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
          <InputField
            name="movieDate"
            text="Lançamento"
            placeholder="Ex: 2004"
          />
        </div>
        <div className="flex items-center gap-6">
          <InputField name="time" text="Duração" placeholder="Ex: 2hr 2min" />
          <InputField
            name="direction"
            text="Diretor(a)"
            placeholder="Digite o nome do(a) diretor(a)"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex w-1/2 flex-col gap-1 text-xs">
            <label>
              Data de visualização <strong>*</strong>
            </label>
            <input
              type="date"
              name="viewDate"
              className="rounded-xl border border-gray-500 bg-transparent p-2"
              defaultValue={new Date().toISOString().slice(0, 10)}
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <InputField name="movieValue" text="Nota" placeholder="De 0 a 5" />
        </div>
        <Dropzone />
        <div className="flex flex-col text-xs">
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

export default AddForm
