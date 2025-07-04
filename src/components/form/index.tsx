import InputField from './InputField'
import Dropzone from './Dropzone'
import Textarea from './Textarea'
import Chooser from './Chooser'
import Calendar from './Calendar'

import dispatchForm from '@/utils/dispatchForm'
import Rater from '../Rater'
import React from 'react'

interface FormProps {
  updaterState: {
    updater: boolean
    setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  }
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
}

function Form({ updaterState, setToggleModal }: FormProps) {
  return (
    <div className="page-specific w-[800px] rounded-lg bg-background p-5">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-xl font-medium">
          Registrar <span className="text-primary">Mídia</span>
        </h1>
        <p className="text-text-200 text-xs">
          Ajude a construir um registro detalhado do que você assiste.
        </p>
      </div>
      <form
        className="flex w-full justify-between gap-10"
        onSubmit={(e) => dispatchForm({ e, updaterState, setToggleModal })}
        autoComplete="off"
      >
        <div className="flex flex-col items-center gap-4">
          <Dropzone />
          <div>
            <Rater width="w-[220px]" />
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-3">
          <InputField
            name="name"
            text="Nome"
            placeholder="Digite o nome do filme ou série"
          />
          <div className="flex items-center justify-between gap-6">
            <Chooser />
            <InputField
              name="year"
              text="Ano de lançamento"
              placeholder="Ex: 2004"
            />
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
            <InputField
              name="imdb"
              text="Id do imdb"
              placeholder="Ex: tt28015403"
            />
          </div>
          <Textarea />
          <div className="flex w-full items-center justify-end">
            <button
              type="submit"
              className="text-text-950 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold"
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
