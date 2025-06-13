import { Ellipsis } from 'lucide-react'

interface SelectionProps {
  propKey: string
  propValue: string
  setFilterEllipsisHandle: React.Dispatch<
    React.SetStateAction<'director' | 'year' | 'value' | undefined>
  >
  filterEllipsisHandle: 'director' | 'year' | 'value' | undefined
  setOption: React.Dispatch<
    React.SetStateAction<{
      director: string
      year: string
      value: string
    }>
  >
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
  filterEllipsisHandle,
  setFilterEllipsisHandle,
  setOption,
  setSelectLimit,
  request,
}: SelectionProps) {
  return (
    <div className="flex w-[580px] justify-between">
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
            if (propKey === filterEllipsisHandle) {
              setFilterEllipsisHandle(undefined)
            } else {
              setFilterEllipsisHandle(
                propKey as keyof typeof filterEllipsisHandle,
              )
            }
          }}
        >
          <Ellipsis />
        </button>
        {filterEllipsisHandle === propKey && (
          <button
            className="absolute bg-white p-5 text-red-500"
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
            Deletar
          </button>
        )}
      </div>
    </div>
  )
}

export default Selection
