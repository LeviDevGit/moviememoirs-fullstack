import { FilterIcon, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import useDropdown from '@/hooks/useDropdown'
import { toggleModal } from '../Dismiss'
import Request from './Request'
import Selection from './Selection'
import { queryFilterAdd, queryFilterClear } from '@/utils/queryFilter'

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

  const [option, setOption] = useState({
    director: '',
    year: '',
    value: '',
  })

  const [selectOption, setSelectOption] =
    useState<keyof typeof option>('director')

  const inputRef = useRef<HTMLInputElement>(null)

  const [selectLimit, setSelectLimit] = useState(false)

  const selectLimitState = { selectLimit, setSelectLimit }

  const [filterSelectHandle, setFilterSelectHandle] = useState(false)

  return (
    <div className="relative h-full text-sm">
      <button
        onClick={(event) => {
          event.stopPropagation()
          toggleModal({ index: 1, set: toggleDropdown, toggler: !isOpen[1] })
        }}
        className="h-full rounded-lg px-4 text-white/50 hover:text-white/70"
      >
        <FilterIcon />
      </button>
      {isOpen[1] && (
        <div
          className="absolute left-0 top-12 z-20 flex flex-col justify-between gap-4 rounded-lg bg-filter text-sm text-white"
          ref={dropdown}
        >
          <p className="p-5 pb-0">Nesta visualização mostre mídias</p>
          <hr className="border-[#747476]" />
          {!selectLimit && (
            <Request
              option={option}
              inputRef={inputRef}
              selectOption={selectOption}
              setSelectOption={setSelectOption}
              selectLimitState={selectLimitState}
              filterSelectHandle={filterSelectHandle}
              setFilterSelectHandle={setFilterSelectHandle}
            />
          )}
          {Object.entries(option)
            .filter(([, value]) => value !== '')
            .map(([key, value], index) => (
              <Selection key={`${index}`} propKey={key} propValue={value} />
            ))}
          <hr className="border-[#5D5D5F]" />
          <div className="flex items-center justify-between p-5 pt-0 text-sm">
            {!selectLimit && (
              <button
                className={`flex items-center gap-2 text-sm`}
                onClick={() => {
                  queryFilterAdd({
                    inputRef,
                    request,
                    selectOption,
                    setOption,
                    setFilterSelectHandle,
                  })
                }}
              >
                <Plus size={20} /> Adicionar filtro
              </button>
            )}
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
              className="text-sm"
            >
              Excluir todos os filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
