import { FilterIcon, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import useDropdown from '@/hooks/useDropdown'
import Request from './Request'
import Selection from './Selection'
import { queryFilterClear } from '@/utils/queryFilter'
import { toggleModal } from '@/utils/toggleModal'
import VerticalMenu from '../ui/VerticalMenu'

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

export default function Filter({
  toggleDropdown,
  isOpen,
  request,
}: Dropdownprops) {
  const dropdown = useRef<HTMLDivElement | null>(null)

  useDropdown({ isOpen, dropdown, toggleDropdown })

  const [option, setOption] = useState({})

  const [selectOption, setSelectOption] = useState<undefined | string>(
    undefined,
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const [selectLimit, setSelectLimit] = useState(false)

  const selectLimitState = { selectLimit, setSelectLimit }

  const [filterSelectHandle, setFilterSelectHandle] = useState(false)

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
          className="absolute left-16 top-0 z-20 flex w-[600px] flex-col justify-between gap-4 rounded-lg bg-filter text-sm"
          ref={dropdown}
        >
          {Object.values(option).some((value) => value !== undefined) ? (
            <p className="p-5 pb-0">Nesta visualização mostre mídias</p>
          ) : (
            <h1 className="p-5 pb-0">
              Ainda não há filtros nesta visualização.
            </h1>
          )}
          <hr className="border-[#747476]" />
          {Object.values(option).some((value) => value !== undefined) && (
            <Request
              option={option}
              inputRef={inputRef}
              selectOption={selectOption}
              setSelectOption={setSelectOption}
              selectLimitState={selectLimitState}
              filterSelectHandle={filterSelectHandle}
              setFilterSelectHandle={setFilterSelectHandle}
              request={request}
              setOption={setOption}
            />
          )}
          {Object.entries(option)
            .filter(([, value]) => value !== '')
            .map(([key, value], index) => (
              <Selection
                key={`${index}`}
                propKey={key}
                propValue={`${value}`}
                setOption={setOption}
                setSelectLimit={setSelectLimit}
                request={request}
              />
            ))}
          {filterDropdown && (
            <VerticalMenu
              setOption={setOption}
              option={option}
              setFilterDropdown={setFilterDropdown}
            />
          )}
          <hr className="border-[#5D5D5F]" />
          <div className="flex items-center justify-between p-5 pt-0 text-sm">
            {!selectLimit && (
              <button
                className={`flex items-center gap-2 text-sm`}
                onClick={() => {
                  setFilterDropdown(!filterDropdown)
                }}
              >
                <Plus size={20} /> Adicionar filtro
              </button>
            )}
            {Object.values(option).some((value) => value !== '') && (
              <button
                onClick={() => {
                  queryFilterClear({
                    request,
                    setOption,
                    setSelectOption,
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
