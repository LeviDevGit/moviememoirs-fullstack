import { queryFilterAdd } from '@/utils/queryFilter'
import { Filters } from '../ui/VerticalMenu'

interface RequestProps {
  inputRef: React.RefObject<HTMLInputElement>
  option: object
  selectOption: undefined | string
  selectLimitState: {
    selectLimit: boolean
    setSelectLimit: React.Dispatch<React.SetStateAction<boolean>>
  }
  setOption: React.Dispatch<React.SetStateAction<Record<string, string>>>
  request: React.Dispatch<
    React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>
  >
  valueOption: string
}

function Request({
  inputRef,
  option,
  selectOption,
  selectLimitState,
  request,
  setOption,
  valueOption,
}: RequestProps) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [valueOption]: oldValue, ...rest } = prev

      return {
        [e.target.value]: '',
        ...rest,
      }
    })
  }

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
            console.log(e.currentTarget.value)
            handleSelectChange(e)
          }}
        >
          <option value={valueOption}>{getOptionText(valueOption)}</option>
          {Object.entries(Filters)
            .filter(([, value]) => !(value.value in option))
            .map(([key, value]) => (
              <option key={value.value} value={value.value}>
                {key}
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
            })
        }}
      />
    </div>
  )
}

export default Request
