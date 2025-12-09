import Rater from '@/shared/components/Rater'
import Select from '@/shared/ui/Select'
import Textarea from '@/shared/ui/Textarea'
import Input from '@/shared/ui/Input'
import dispatchMediaCreate from '@/shared/utils/dispatchMediaCreate'
import { useEffect, useState } from 'react'
import readCategory from '@/lib/api/Category/read'
import PosterDropzone from '@/shared/components/PosterDropzone'
import { useModal } from '@/shared/ui/Modal/ModalRoot'

interface FormMediaProps {
  updaterState: {
    updater: boolean
    setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export interface MediaType {
  id: number
  name: string
  proportion: 'RECTANGLE' | 'SQUARE'
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
        onSubmit={(e) => dispatchMediaCreate({ e, updaterState, setOpen })}
        autoComplete="off"
      >
        <div className="flex flex-col items-center gap-4">
          <PosterDropzone />
          <div>
            <Rater width="w-[220px]" />
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-3">
          <Input text="Nome" placeholder="Digite o nome do filme ou série" />
          <div className="flex items-center justify-between gap-6">
            {categories && (
              <Select text="Tipo">
                {categories.map((value, index) => (
                  <option value={value.name} key={index}>
                    {value.name}
                  </option>
                ))}
              </Select>
            )}
            <Input text="Ano de lançamento" placeholder="Ex: 2004" />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Input text="Duração" placeholder="Ex: 2hr 2min" />
            <Input
              text="Criador(a)"
              placeholder="Digite o nome do(a) criador(a)"
            />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Input text="Data" type="date" useTodayDate />
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

export default FormMedia
