import { Filter, Plus } from 'lucide-react'

interface Dropdownprops {
  toggleDropdown: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

export default function DropdownFilter({
  toggleDropdown,
  isOpen,
}: Dropdownprops) {
  return (
    <div className="relative h-full">
      <button
        onClick={() => {
          toggleDropdown(!isOpen)
        }}
        className="h-full rounded-lg px-4 text-white/50 hover:text-white/70"
      >
        <Filter />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-14 z-20 flex flex-col justify-between gap-4 rounded-lg bg-gray-100 p-5">
          <p>Nesta visualização mostre filmes</p>
          <hr />
          <div className="flex items-center gap-4">
            <label>Onde</label>
            <select name="" id="">
              <option value="">Diretor</option>
              <option value="">Ano de lançamento</option>
              <option value="">Nota</option>
            </select>
            <select name="" id="">
              <option value="">contenha</option>
            </select>
            <input type="text" name="" id="" placeholder="Digite o valor..." />
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <button className="flex items-center">
              <Plus /> Adicionar filtro
            </button>
            <button>Excluir todos os filtros</button>
          </div>
        </div>
      )}
    </div>
  )
}
