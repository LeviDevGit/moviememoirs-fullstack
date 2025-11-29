import Input from '@/shared/ui/Input'
import updateMediaByData from '@/lib/api/Media/update'
import { useState } from 'react'
import { useModal } from '@/shared/ui/Modal/ModalRoot'

interface EditTitleYearModalProps {
  data: {
    name: string
    year: string
  }
  id: string
}

function EditTitleYearModal({ data, id }: EditTitleYearModalProps) {
  const [title, setTitle] = useState<string>(data.name)
  const [year, setYear] = useState<string>(data.year)

  const isDirty = title !== data.name || year !== data.year

  const { setOpen } = useModal()

  return (
    <div>
      <div>
        <div className="flex w-[300px] flex-col gap-4">
          <div className="flex min-h-[48px] flex-col justify-center gap-2">
            <h1 className="text-xl font-medium">
              Alterar <span className="text-primary">Título</span> e{' '}
              <span className="text-primary">Ano</span>
            </h1>
          </div>
          <form
            id="edit-titleyear-form"
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              if (!isDirty) {
                e.preventDefault()
                return
              }

              e.preventDefault()

              updateMediaByData(e, Number(id)).then(() => {
                setOpen(false)
              })
            }}
          >
            <Input
              text="Título"
              placeholder={data.name}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Input
              text="Ano de lançamento"
              placeholder={data.year}
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </form>
        </div>
      </div>
      <div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-titleyear-form"
            disabled={!isDirty}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTitleYearModal
