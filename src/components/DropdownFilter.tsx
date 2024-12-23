import { Ellipsis, Filter, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { toggleModalFunction } from './Modal/ModalFooter'
import useDropdown from '@/hooks/useDropdown'

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

  useDropdown({ isOpen, dropdown, toggleDropdown })

  const [option, setOption] = useState({
    director: '',
    year: '',
    value: '',
  })

  const [selectOption, setSelectOption] =
    useState<keyof typeof option>('director')

  const inputRef = useRef<HTMLInputElement>(null)

  function handleButtonClick() {
    if (inputRef.current && inputRef.current.value !== '') {
      setOption((prev) => ({
        ...prev,
        [selectOption]: inputRef.current!.value,
      }))

      request((prevState) => ({
        ...prevState,
        [`${selectOption}String`]: inputRef.current!.value,
      }))
    }
  }

  function handleButtonClear() {
    setOption((prev) => {
      const optionState = { ...prev }
      Object.keys(optionState).forEach((key) => {
        optionState[key as keyof typeof optionState] = ''
      })
      return optionState
    })

    request((prevState) => {
      const requestState = { ...prevState }
      Object.keys(requestState).forEach((key) => {
        requestState[key as keyof typeof requestState] = ''
      })
      return requestState
    })
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
          {Object.entries(option)
            .filter(([, value]) => value !== '')
            .map(([key, value], index) => (
              <FilteredRequest
                key={`${index}`}
                propKey={key}
                propValue={value}
              />
            ))}
          {option && (
            <FilterRequest
              option={option}
              inputRef={inputRef}
              selectOption={selectOption}
              setSelectOption={setSelectOption}
            />
          )}
          <hr className="border-[#5D5D5F]" />
          <div className="flex items-center justify-between p-5 pt-0">
            <button
              className={`flex items-center gap-2 ${option[selectOption] && 'hidden'}`}
              onClick={() => {
                handleButtonClick()
              }}
            >
              <Plus size={20} /> Adicionar filtro
            </button>
            <button
              onClick={() => {
                handleButtonClear()
              }}
            >
              Excluir todos os filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface FilterRequestProps {
  inputRef: React.RefObject<HTMLInputElement>
  setSelectOption: React.Dispatch<
    React.SetStateAction<'director' | 'year' | 'value'>
  >
  option: {
    director: string
    year: string
    value: string
  }
  selectOption: 'director' | 'year' | 'value'
}

function FilterRequest({
  inputRef,
  setSelectOption,
  option,
  selectOption,
}: FilterRequestProps) {
  return (
    <div className="flex items-center gap-4 px-5">
      <label>Onde</label>
      <select
        className="rounded-lg border border-[#747476] bg-transparent p-2"
        onChange={(e) => {
          setSelectOption(e.target.value as keyof typeof option)
        }}
      >
        <option value="director" disabled={option.director !== ''}>
          Diretor
        </option>
        <option value="year" disabled={option.year !== ''}>
          Ano de lançamento
        </option>
        <option value="value" disabled={option.value !== ''}>
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
  )
}

interface FilteredRequestProps {
  propKey: string
  propValue: string
}

function FilteredRequest({ propKey, propValue }: FilteredRequestProps) {
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
