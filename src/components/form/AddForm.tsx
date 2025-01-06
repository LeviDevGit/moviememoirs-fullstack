import {
  InputField,
  Dropzone,
  Textarea,
  Chooser,
  Pair,
  Calendar,
  Title,
} from '@/components/form'
import dispatchForm from '@/utils/dispatchForm'

interface updaterStateProps {
  updater: boolean
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>
}

interface AddFormProps {
  updaterState: updaterStateProps
}

function AddForm({ updaterState }: AddFormProps) {
  return (
    <div className="page-specific w-[600px] rounded-2xl bg-[#27272a] p-5 text-white">
      <Title />
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
        <Pair>
          <Chooser />
          <InputField
            name="movieDate"
            text="Lançamento"
            placeholder="Ex: 2004"
          />
        </Pair>
        <Pair>
          <InputField name="time" text="Duração" placeholder="Ex: 2hr 2min" />
          <InputField
            name="direction"
            text="Diretor(a)"
            placeholder="Digite o nome do(a) diretor(a)"
          />
        </Pair>
        <Pair>
          <Calendar />
          <InputField name="movieValue" text="Nota" placeholder="De 0 a 5" />
        </Pair>
        <Dropzone />
        <Textarea />
        <div className="flex w-full items-center justify-end">
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  )
}

export default AddForm
