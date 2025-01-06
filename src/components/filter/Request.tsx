import { Ellipsis } from 'lucide-react'
import { useState } from 'react'

interface RequestProps {
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

function Request({
  inputRef,
  setSelectOption,
  option,
  selectOption,
}: RequestProps) {
  const [selected, setSelected] = useState(option.director)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setSelected(event.target.value)
  }

  const getOptionText = (key: string) => {
    if (key === 'director') return 'Diretor'
    if (key === 'year') return 'Ano de lançamento'
    if (key === 'value') return 'Nota'
  }

  return (
    <div className="flex items-center gap-4 px-5">
      <label>Onde</label>
      <select
        className="rounded-lg border border-[#747476] bg-transparent p-2"
        onChange={(e) => {
          setSelectOption(e.target.value as keyof typeof option)
          handleChange(e)
        }}
        value={selected}
      >
        {Object.entries(option).map(([key, value]) => {
          return (
            <option key={key} value={key} disabled={value !== ''}>
              {getOptionText(key)}
            </option>
          )
        })}
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

export default Request
