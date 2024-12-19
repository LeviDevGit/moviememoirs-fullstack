import { Ellipsis, Filter, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toggleModalFunction } from './Modal/ModalFooter'

interface Dropdownprops {
  toggleDropdown: React.Dispatch<React.SetStateAction<boolean[]>>
  isOpen: boolean[]
  request: React.Dispatch<
    React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>
  >
}

export default function DropdownFilter({
  toggleDropdown,
  isOpen,
  request,
}: Dropdownprops) {
  const dropdown = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen[2]) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        event.target instanceof Node &&
        !dropdown.current.contains(event.target)
      ) {
        toggleModalFunction(2, toggleDropdown, false)
        // toggleDropdown(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen[2]])

  const [disabledOption, setDisabledOption] = useState({
    director: false,
    year: false,
    value: false,
  })
  const [selectOption, setSelectOption] =
    useState<keyof typeof disabledOption>('director')

  const inputRef = useRef<HTMLInputElement>(null)

  const [activeFilters, setActiveFilters] = useState<
    ('director' | 'year' | 'value')[]
  >([])

  const handleButtonClick = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      setActiveFilters((prev) => [...prev, selectOption])

      setDisabledOption((prev) => ({
        ...prev,
        [selectOption]: true,
      }))

      request((prevState) => ({
        ...prevState,
        [`${selectOption}String`]: inputRef.current!.value,
      }))
    }
  }

  return (
    <div className="relative h-full">
      <button
        onClick={(event) => {
          event.stopPropagation()
          toggleModalFunction(2, toggleDropdown, !isOpen[2])
        }}
        className="h-full rounded-lg px-4 text-white/50 hover:text-white/70"
      >
        <Filter />
      </button>

      {isOpen[2] && (
        <div
          className="absolute left-0 top-12 z-20 flex flex-col justify-between gap-4 rounded-lg bg-[#2D2D2F] text-[#D1D1D1]"
          ref={dropdown}
        >
          <p className="p-5 pb-0">Nesta visualização mostre filmes</p>
          <hr className="border-[#747476]" />
          {activeFilters.map((e, index) => (
            <div key={`${index}`}>
              <h1>{e}</h1>
            </div>
          ))}
          {activeFilters.length <= 2 && (
            <div className="flex items-center gap-4 px-5">
              <label>Onde</label>
              <select
                className="rounded-lg border border-[#747476] bg-transparent p-2"
                onChange={(e) => {
                  setSelectOption(e.target.value as keyof typeof disabledOption)
                }}
              >
                <option value="director" disabled={disabledOption.director}>
                  Diretor
                </option>
                <option value="year" disabled={disabledOption.year}>
                  Ano de lançamento
                </option>
                <option value="value" disabled={disabledOption.value}>
                  Nota
                </option>
              </select>
              <label className="w-[70px] text-center">
                {selectOption === 'director' ? 'contenha' : 'igual a'}
              </label>
              <input
                type="text"
                placeholder="Digite o valor..."
                className="rounded-lg border border-[#747476] bg-transparent p-2 outline-none"
                ref={inputRef}
              />
              <button>
                <Ellipsis />
              </button>
            </div>
          )}
          <hr className="border-[#5D5D5F]" />
          <div className="flex items-center justify-between p-5 pt-0">
            <button
              className={`flex items-center gap-2 ${disabledOption[selectOption] && 'hidden'}`}
              onClick={() => {
                handleButtonClick()
              }}
            >
              <Plus size={20} /> Adicionar filtro
            </button>
            <button>Excluir todos os filtros</button>
          </div>
        </div>
      )}
    </div>
  )
}
