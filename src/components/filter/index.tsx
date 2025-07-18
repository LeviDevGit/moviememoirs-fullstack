import { FilterIcon, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import useDropdown from '@/hooks/useDropdown'
import Request from './Request'
import { queryFilterClear } from '@/utils/queryFilter'
import { toggleModal } from '@/utils/toggleModal'
import VerticalMenu from '../ui/VerticalMenu'
import { FilterContent } from '@/app/page'

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
  filterContent: FilterContent
}

export default function Filter({
  toggleDropdown,
  isOpen,
  request,
  filterContent,
}: Dropdownprops) {
  const dropdown = useRef<HTMLDivElement | null>(null)

  useDropdown({ isOpen, dropdown, toggleDropdown })

  const [option, setOption] = useState<Record<string, string>>({})

  const inputRef = useRef<HTMLInputElement>(null)

  const [selectLimit, setSelectLimit] = useState(false)

  const selectLimitState = { selectLimit, setSelectLimit }

  const [filterDropdown, setFilterDropdown] = useState(false)

  return (
    <div className="relative h-full text-sm">
      <button
        onClick={(event) => {
          event.stopPropagation()
          toggleModal({ index: 1, set: toggleDropdown, toggler: !isOpen[1] })
        }}
        className="h-full rounded-lg px-4 text-text-200 hover:text-text-50"
      >
        <FilterIcon />
      </button>
      {isOpen[1] && (
        <div
          className="absolute left-16 top-0 z-20 flex w-[600px] flex-col justify-between gap-4 divide-y divide-gray-300 rounded-lg bg-filter text-sm"
          ref={dropdown}
        >
          {Object.values(option).some((value) => value !== undefined) ? (
            <p className="p-5 pb-0">Nesta visualização mostre mídias</p>
          ) : (
            <h1 className="p-5 pb-0">
              Ainda não há filtros nesta visualização.
            </h1>
          )}
          {Object.values(option).some((value) => value !== undefined) &&
            Object.keys(option).map((value) => (
              <Request
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
          <div className="relative flex items-center justify-between p-5 pt-0 text-sm">
            {!selectLimit && (
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  onClick={() => {
                    setFilterDropdown(!filterDropdown)
                  }}
                >
                  <Plus size={20} /> Adicionar filtro
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
            {Object.values(option).some((value) => value !== '') && (
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
      )}
    </div>
  )
}
