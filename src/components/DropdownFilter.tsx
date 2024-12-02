import { Ellipsis, Filter, Plus } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface Dropdownprops {
  toggleDropdown: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

export default function DropdownFilter({
  toggleDropdown,
  isOpen,
}: Dropdownprops) {
  const dropdown = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        event.target instanceof Node &&
        !dropdown.current.contains(event.target)
      ) {
        toggleDropdown(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <div className="relative h-full">
      <button
        onClick={(event) => {
          event.stopPropagation()
          toggleDropdown(!isOpen)
        }}
        className="h-full rounded-lg px-4 text-white/50 hover:text-white/70"
      >
        <Filter />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-12 z-20 flex flex-col justify-between gap-4 rounded-lg bg-[#2D2D2F] text-[#D1D1D1]"
          ref={dropdown}
        >
          <p className="p-5 pb-0">Nesta visualização mostre filmes</p>
          <hr className="border-[#747476]" />
          <div className="flex items-center gap-4 px-5">
            <label>Onde</label>
            <select className="rounded-lg border border-[#747476] bg-transparent p-2">
              <option value="">Diretor</option>
              <option value="">Ano de lançamento</option>
              <option value="">Nota</option>
            </select>
            <select className="rounded-lg border border-[#747476] bg-transparent p-2">
              <option value="">contenha</option>
              <option value="">é igual a</option>
            </select>
            <input
              type="text"
              name=""
              id=""
              placeholder="Digite o valor..."
              className="rounded-lg border border-[#747476] bg-transparent p-2 outline-none"
            />
            <button>
              <Ellipsis />
            </button>
          </div>
          <hr className="border-[#5D5D5F]" />
          <div className="flex items-center justify-between p-5 pt-0">
            <button className="flex items-center gap-2">
              <Plus size={20} /> Adicionar filtro
            </button>
            <button>Excluir todos os filtros</button>
          </div>
        </div>
      )}
    </div>
  )
}
