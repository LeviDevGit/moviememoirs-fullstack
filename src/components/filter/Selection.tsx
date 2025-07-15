import { TrashIcon } from 'lucide-react'

interface SelectionProps {
  propKey: string
  propValue: string
  setOption: React.Dispatch<React.SetStateAction<Record<string, string>>>
  setSelectLimit: React.Dispatch<React.SetStateAction<boolean>>
  request: React.Dispatch<
    React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>
  >
}

function Selection({
  propKey,
  propValue,
  setOption,
  setSelectLimit,
  request,
}: SelectionProps) {
  return (
    <div className="flex w-[580px] items-center justify-between">
      <div className="flex w-[550px] items-center gap-4 px-5">
        <label>Onde</label>
        <p className="min-w-[118px] p-2">
          {propKey === 'director'
            ? 'Diretor'
            : propKey === 'year'
              ? 'Lançamento'
              : propKey === 'value' && 'Nota'}
        </p>
        <label className="min-w-[90px] text-center">
          {propKey === 'director' ? 'contenha' : 'igual a'}
        </label>
        <p className="min-w-[226px] p-2 font-bold">{propValue}</p>
      </div>
      <div className="relative">
        <button
          onClick={() => {
            setOption((prev) => ({
              ...prev,
              [propKey]: '',
            }))
            request((prev) => ({
              ...prev,
              [`${propKey}String`]: '',
            }))
            setSelectLimit(false)
          }}
        >
          <TrashIcon size={20} className="text-red-500" />
        </button>
      </div>
    </div>
  )
}

export default Selection
