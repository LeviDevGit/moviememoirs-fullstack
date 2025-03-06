import { Ellipsis } from 'lucide-react'
import { useEffect } from 'react'

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
  selectLimitState: {
    selectLimit: boolean
    setSelectLimit: React.Dispatch<React.SetStateAction<boolean>>
  }
}

function Request({
  inputRef,
  setSelectOption,
  option,
  selectOption,
  selectLimitState,
}: RequestProps) {
  useEffect(() => {
    if (option[selectOption] !== '') {
      const newSelectKey = Object.entries(option).filter(
        ([, value]) => value === '',
      )[0]?.[0]
      if (newSelectKey) {
        setSelectOption(newSelectKey as keyof typeof option)
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      } else {
        selectLimitState.setSelectLimit(true)
      }
    }
  }, [inputRef, option, selectLimitState, selectOption, setSelectOption])

  const getOptionText = (key: string) => {
    if (key === 'director') return 'Diretor'
    if (key === 'year') return 'Lançamento'
    if (key === 'value') return 'Nota'
  }

  if (selectLimitState.selectLimit) {
    return <div></div>
  }

  return (
    <div className="flex items-center gap-4 px-5 text-sm">
      <label>Onde</label>
      {
        <select
          className="rounded-lg border border-[#747476] bg-transparent p-2"
          onChange={(e) => {
            setSelectOption(e.target.value as keyof typeof option)
          }}
          value={selectOption}
        >
          {Object.entries(option)
            .filter(([value]) => value !== '')
            .map(([key, value]) => {
              return (
                <option key={key} value={value} disabled={value !== ''}>
                  {getOptionText(key)}
                </option>
              )
            })}
        </select>
      }
      <label className="w-[90px] text-center">
        {selectOption === 'director' ? 'contenha' : 'seja igual a'}
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
