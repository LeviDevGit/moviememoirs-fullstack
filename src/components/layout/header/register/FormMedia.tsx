import { useEffect, useState } from 'react'
import readCategory from '@/api/Category/read'
import dispatchMediaCreate from '@/utils/dispatchMediaCreate'
import { MediaType } from '@/types/interfaces'
import { useModal } from '@/components/ui/Modal/ModalRoot'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import PosterDropzone from '@/components/shared/PosterDropzone'
import Rater from '@/components/shared/Rater'
interface FormMediaProps {
  updaterState: {
    updater: boolean
    setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  }
}

function FormMedia({ updaterState }: FormMediaProps) {
  const [categories, setCategories] = useState<MediaType[]>()

  useEffect(() => {
    async function handleReadCategory() {
      setCategories(await readCategory())
    }
    handleReadCategory()
  }, [])

  const { setOpen } = useModal()

  return (
    <div className="page-specific w-[800px] rounded-lg">
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
        onSubmit={(e) => dispatchMediaCreate({ e, updaterState, setOpen })}
        autoComplete="off"
        id="media-create-form"
      >
        <div className="flex flex-col items-center gap-6">
          <PosterDropzone
            background="modal"
            padding="none"
            iconVariant="minimalist"
          />
          <div className="flex h-full w-full flex-col items-center gap-2">
            <h2 className="text-center text-text-muted">Avaliação Pessoal</h2>
            <div>
              <Rater width="w-[180px]" />
            </div>
          </div>
        </div>
        <div className="min-h-full w-px border-x border-gray-700/50" />
        <div className="flex w-full flex-col justify-between gap-3">
          <Input
            text="Nome"
            placeholder="Digite o nome do filme ou série"
            background="modal"
          />
          <div className="flex w-full gap-4">
            <div className="flex-1">
              <Select text="Tipo" background="modal">
                {categories?.map((value, index) => (
                  <option value={value.name} key={index}>
                    {value.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex-1">
              <Input
                text="Ano de lançamento"
                placeholder="Ex: 2004"
                background="modal"
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex-1">
              <Input
                text="Duração"
                placeholder="Ex: 2hr 2min"
                background="modal"
              />
            </div>
            <div className="flex-1">
              <Input
                text="Criador(a)"
                placeholder="Digite o nome do(a) criador(a)"
                background="modal"
              />
            </div>
          </div>
          <Input text="Data" type="date" useTodayDate background="modal" />
          <Textarea
            text="Comentário"
            placeholder="Escreva um comentário (opcional)"
            background="modal"
          />
        </div>
      </form>
    </div>
  )
}

export default FormMedia
