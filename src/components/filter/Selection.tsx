import { Ellipsis } from 'lucide-react'

interface SelectionProps {
  propKey: string
  propValue: string
}

function Selection({ propKey, propValue }: SelectionProps) {
  return (
    <div className="flex items-center gap-4 px-5">
      <label>Onde</label>
      <p className="w-[183px] p-2">
        {propKey === 'director'
          ? 'Diretor'
          : propKey === 'year'
            ? 'Ano de lançamento'
            : propKey === 'value' && 'Nota'}
      </p>
      <label className="w-[70px] text-center">
        {propKey === 'director' ? 'contenha' : 'igual a'}
      </label>
      <p className="w-[246px] p-2">{propValue}</p>
      <button>
        <Ellipsis />
      </button>
    </div>
  )
}

export default Selection
