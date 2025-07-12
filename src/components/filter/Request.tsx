import { queryFilterAdd } from '@/utils/queryFilter'
import { useEffect } from 'react'

interface RequestProps {
  inputRef: React.RefObject<HTMLInputElement>
  option: object
  selectOption: undefined | string
  setSelectOption: React.Dispatch<React.SetStateAction<undefined | string>>
  selectLimitState: {
    selectLimit: boolean
    setSelectLimit: React.Dispatch<React.SetStateAction<boolean>>
  }
  filterSelectHandle: boolean
  setFilterSelectHandle: React.Dispatch<React.SetStateAction<boolean>>
  setOption: React.Dispatch<
    React.SetStateAction<{
      director: string
      year: string
      value: string
    }>
  >
  request: React.Dispatch<
    React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>
  >
}

function Request({
  inputRef,
  setSelectOption,
  option,
  selectOption,
  selectLimitState,
  filterSelectHandle,
  setFilterSelectHandle,
  request,
  setOption,
}: RequestProps) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(e.target.value as keyof typeof option)
  }

  useEffect(() => {
    if (filterSelectHandle) {
      const nextEmptyKey = Object.entries(option).find(
        ([, value]) => value === '',
      )?.[0]

      if (nextEmptyKey) {
        setSelectOption(nextEmptyKey as keyof typeof option)
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      } else {
        selectLimitState.setSelectLimit(true)
      }
      setFilterSelectHandle(false)
    }
  }, [
    filterSelectHandle,
    inputRef,
    option,
    selectLimitState,
    setFilterSelectHandle,
    setSelectOption,
  ])

  const getOptionText = (key: string) => {
    if (key === 'director') return 'Diretor'
    if (key === 'year') return 'Lançamento'
    if (key === 'value') return 'Nota'
  }

  if (selectLimitState.selectLimit) {
    return <div></div>
  }

  return (
    <div className="flex w-[550px] items-center gap-4 px-5 text-sm">
      <label>Onde</label>
      {
        <select
          className="w-[118px] rounded-lg border border-[#747476] bg-transparent p-2"
          onChange={(e) => {
            handleSelectChange(e)
          }}
          value={selectOption}
        >
          {Object.entries(option).map(([key, value]) => (
            <option key={key} value={key} disabled={value !== ''}>
              {getOptionText(key)}
            </option>
          ))}
        </select>
      }
      <label className="min-w-[90px] text-center">
        {selectOption === 'director' ? 'contenha' : 'seja igual a'}
      </label>
      <input
        type="text"
        placeholder="Digite o valor..."
        className="min-w-[226px] rounded-lg border border-[#747476] bg-transparent p-2 outline-none"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter')
            queryFilterAdd({
              inputRef,
              request,
              selectOption,
              setOption,
              setFilterSelectHandle,
            })
        }}
      />
    </div>
  )
}

export default Request
