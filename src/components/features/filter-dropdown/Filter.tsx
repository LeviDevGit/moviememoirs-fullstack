import { queryFilterAdd } from '@/utils/queryFilter'
import { TrashIcon } from 'lucide-react'
import { FilterContent } from '@/app/page'
import Select from '@/components/ui/Select'
import { Filters } from '@/components/ui/VerticalMenu'
import Input from '@/components/ui/Input'
interface FilterProps {
  inputRef: React.RefObject<HTMLInputElement>
  option: object
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
  filterContent: FilterContent
}

function getRequestValue(key: string, filterContent: FilterContent) {
  const composedKey = `${key}String` as keyof typeof filterContent

  return filterContent[composedKey as keyof typeof filterContent]
}

function Filter({
  inputRef,
  option,
  selectLimitState,
  request,
  setOption,
  valueOption,
  filterContent,
}: FilterProps) {
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
    if (key === 'year') return 'Ano'
    if (key === 'value') return 'Nota'
  }

  if (selectLimitState.selectLimit) {
    return <div></div>
  }

  return (
    <div className="flex w-[550px] items-center gap-4 px-5 text-sm">
      <label>Onde</label>
      {
        <div>
          <Select
            onChange={(e) => {
              console.log(e.currentTarget.value)
              handleSelectChange(e)
            }}
            className="w-[100px]"
          >
            <option value={valueOption}>{getOptionText(valueOption)}</option>
            {Object.entries(Filters)
              .filter(([, value]) => !(value.value in option))
              .map(([key, value]) => (
                <option key={value.value} value={value.value}>
                  {key}
                </option>
              ))}
          </Select>
        </div>
      }
      <label className="min-w-[90px] text-center">
        {valueOption === 'director' ? 'contenha' : 'seja igual a'}
      </label>
      <Input
        type="text"
        ref={inputRef}
        placeholder={
          getRequestValue(valueOption, filterContent) || 'Digite o valor...'
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter')
            queryFilterAdd({
              inputRef,
              request,
              valueOption,
              setOption,
            })
        }}
      />
      <div className="relative">
        <button
          onClick={(e) => {
            setOption((prev) => {
              const newOption = { ...prev }
              delete newOption[valueOption]
              return newOption
            })
            request((prev) => ({
              ...prev,
              [`${valueOption}String`]: '',
            }))
            selectLimitState.setSelectLimit(false)
            e.stopPropagation()
          }}
        >
          <TrashIcon size={20} className="text-red-500" />
        </button>
      </div>
    </div>
  )
}

export default Filter
