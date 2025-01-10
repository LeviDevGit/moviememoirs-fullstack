import { Search } from 'lucide-react'

function Controls() {
  return (
    <div className="flex w-full items-center justify-between gap-10 rounded-lg bg-[#3e3e42] p-3">
      <div className="flex w-full items-center gap-2 rounded-md border border-gray-500 px-2 py-1">
        <Search className="h-[1.2em] w-[1.2em]" />
        <input
          type="text"
          name=""
          placeholder="Procurar por nome, diretor ..."
          className="w-full bg-transparent outline-none"
        />
      </div>
      <select
        name=""
        className="w-[230px] rounded-md border border-gray-500 bg-transparent px-2 py-1"
      >
        <option value="">Filme</option>
        <option value="">Série</option>
        <option value="">Documentário</option>
        <option value="">Curta</option>
      </select>
      <button className="w-fit rounded-md bg-[#8f001a] px-2 py-1 font-bold">
        Procurar
      </button>
    </div>
  )
}

export default Controls
