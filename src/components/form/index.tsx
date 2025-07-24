import Dropzone from './Dropzone'

import dispatchForm from '@/utils/dispatchForm'
import Rater from '../Rater'
import React from 'react'
import Select from '../ui/Select'
import { Input } from '../ui/Inputs'
import Textarea from '../ui/Textarea'

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
        <p className="text-xs text-text-200">
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
          <Input text="Nome" placeholder="Digite o nome do filme ou série" />
          <div className="flex items-center justify-between gap-6">
            <Select text="Tipo">
              <option value="MOVIE">Filme</option>
              <option value="SERIES">Série</option>
              <option value="DOCUMENTARY">Documentário</option>
              <option value="SHORT FILM">Curta</option>
            </Select>
            <Input text="Ano de lançamento" placeholder="Ex: 2004" />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Input text="Duração" placeholder="Ex: 2hr 2min" />
            <Input
              text="Diretor(a)"
              placeholder="Digite o nome do(a) diretor(a)"
            />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Input text="Data" type="date" useTodayDate />
            <Input text="Id do imdb" placeholder="Ex: tt28015403" />
          </div>
          <Textarea
            text="Comentário"
            placeholder="Escreva um comentário (opcional)"
          />
          <div className="flex w-full items-center justify-end">
            <button
              type="submit"
              className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-text-950"
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
