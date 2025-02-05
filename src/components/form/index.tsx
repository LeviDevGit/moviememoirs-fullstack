import InputField from './InputField'
import Dropzone from './Dropzone'
import Textarea from './Textarea'
import Chooser from './Chooser'
import Calendar from './Calendar'

import dispatchForm from '@/utils/dispatchForm'
import Rater from '../Rater'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormProps {
  updaterState: updaterStateProps
}

function Form({ updaterState }: FormProps) {
  return (
    <div className="page-specific w-[700px] rounded-2xl bg-[#27272a] p-5 text-white">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-xl font-medium">
          Registrar <span className="text-[#dd4d51]">Mídia</span>
        </h1>
        <p className="text-xs text-[#e0e0e0]">
          Ajude a construir um registro detalhado do que você assiste.
        </p>
      </div>
      <form
        className="flex h-full w-full justify-between"
        onSubmit={(e) => dispatchForm({ e, updaterState })}
        autoComplete="off"
      >
        <div className="flex flex-col gap-8">
          <Dropzone />
          <Rater />
        </div>
        <div>
          <InputField
            name="name"
            text="Nome"
            placeholder="Digite o nome do filme ou série"
          />
          <div className="flex items-center justify-between gap-6">
            <Chooser />
            <InputField name="year" text="Lançamento" placeholder="Ex: 2004" />
          </div>
          <div className="flex items-center justify-between gap-6">
            <InputField name="time" text="Duração" placeholder="Ex: 2hr 2min" />
            <InputField
              name="direction"
              text="Diretor(a)"
              placeholder="Digite o nome do(a) diretor(a)"
            />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Calendar />
            <InputField name="imdb" text="Id" placeholder="IMDB" />
          </div>
          <Textarea />
          <div className="flex w-full items-center justify-end">
            <button
              type="submit"
              className="rounded-xl bg-[#8f001a] px-4 py-2 text-sm font-bold"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form

export { Calendar, Chooser, InputField, Textarea }
