import { Search } from 'lucide-react'
import { useRef } from 'react'

interface ControlsProps {
  setFilter: React.Dispatch<React.SetStateAction<string | undefined>>
}

function Controls({ setFilter }: ControlsProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex w-full items-center justify-between gap-5 rounded-lg bg-[#3e3e42] p-3">
      <div className="flex w-full items-center gap-1 rounded-md border border-gray-500 px-2 py-1">
        <Search className="h-[1.2em] w-[1.2em]" />
        <input
          type="text"
          placeholder="Procurar por nome, diretor ..."
          className="w-full bg-transparent outline-none"
          ref={inputRef}
        />
      </div>
      <select
        name=""
        className="w-[300px] rounded-md border border-gray-500 bg-transparent px-2 py-1"
      >
        <option value="">Filme</option>
        <option value="">Série</option>
        <option value="">Documentário</option>
        <option value="">Curta</option>
      </select>
      <button
        className="w-fit rounded-lg bg-[#8f001a] p-2 font-bold hover:bg-[#8f001a]/80"
        onClick={() => {
          setFilter(inputRef.current?.value)
        }}
      >
        Procurar
      </button>
    </div>
  )
}

export default Controls
