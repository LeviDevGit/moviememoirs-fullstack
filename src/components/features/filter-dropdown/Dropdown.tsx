import { useRef, useState } from 'react'
import { FilterContent } from '@/app/page'
import { PlusIcon } from 'lucide-react'
import { queryFilterClear } from '@/utils/queryFilter'
import Filter from './Filter'
import VerticalMenu from '@/components/ui/VerticalMenu'

interface DropdownProps {
  dropdown: React.MutableRefObject<HTMLDivElement | null>
  request: React.Dispatch<
    React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>
  >
  filterContent: FilterContent
}

function Dropdown({ dropdown, request, filterContent }: DropdownProps) {
  const [option, setOption] = useState<Record<string, string>>({})

  const inputRef = useRef<HTMLInputElement>(null)

  const [selectLimit, setSelectLimit] = useState(false)

  const selectLimitState = { selectLimit, setSelectLimit }

  const [filterDropdown, setFilterDropdown] = useState(false)

  return (
    <div
      className="absolute left-16 top-0 z-20 flex w-[600px] flex-col justify-between gap-4 divide-y divide-gray-600 rounded border-gray-600 bg-gray-900 text-sm"
      ref={dropdown}
    >
      {Object.values(option).some((value) => value !== undefined) ? (
        <p className="p-5 pb-0">Nesta visualização mostre mídias</p>
      ) : (
        <h1 className="p-5 pb-0">Ainda não há filtros nesta visualização.</h1>
      )}
      {Object.values(option).some((value) => value !== undefined) && (
        <div className="flex flex-col gap-4 p-5 pb-0">
          {Object.keys(option).map((value) => (
            <Filter
              key={value}
              option={option}
              inputRef={inputRef}
              selectLimitState={selectLimitState}
              request={request}
              setOption={setOption}
              valueOption={value}
              filterContent={filterContent}
            />
          ))}
        </div>
      )}
      <div className="relative flex items-center justify-between p-5 text-sm">
        {!selectLimit && (
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              onClick={() => {
                setFilterDropdown(!filterDropdown)
              }}
            >
              <PlusIcon size={20} /> Adicionar filtro
            </button>
            {filterDropdown && (
              <VerticalMenu
                setOption={setOption}
                option={option}
                setFilterDropdown={setFilterDropdown}
              />
            )}
          </div>
        )}
        {Object.values(option).some((value) => value !== undefined) && (
          <button
            onClick={() => {
              queryFilterClear({
                request,
                setOption,
                setSelectLimit,
              })
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
            className="text-sm text-red-500"
          >
            Excluir todos os filtros
          </button>
        )}
      </div>
    </div>
  )
}

export default Dropdown
