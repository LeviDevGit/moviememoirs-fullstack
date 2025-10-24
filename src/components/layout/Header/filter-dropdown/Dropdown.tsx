import { useContext, useEffect, useRef, useState } from 'react'
import { FilterContent } from '@/app/page'
import {
  PlusIcon,
  CalendarRangeIcon,
  SparklesIcon,
  UserRoundIcon,
} from 'lucide-react'
import { queryFilterAdd, queryFilterClear } from '@/utils/queryFilter'
import Filter from './Filter'
import { toggleModal } from '@/utils/toggleModal'
import { GlobalContext } from '@/providers/global'
import { restoreFilters } from '@/utils/restoreFIlters'

interface DropdownProps {
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

export const Filters = {
  Diretor: { value: 'director', icon: <UserRoundIcon /> },
  Ano: { value: 'year', icon: <CalendarRangeIcon /> },
  Nota: { value: 'value', icon: <SparklesIcon /> },
}

function Dropdown({ request, filterContent }: DropdownProps) {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { setToggleModalList } = context

  const [option, setOption] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('option')
    return saved ? JSON.parse(saved) : {}
  })

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function handleApplyAll() {
    Object.entries(inputRefs.current).forEach(([key, input]) => {
      if (input) {
        queryFilterAdd({
          inputRef: { current: input },
          request,
          valueOption: key,
          setOption,
        })
      }
    })
  }

  const [selectLimit, setSelectLimit] = useState(false)

  const selectLimitState = { selectLimit, setSelectLimit }

  const handleClick = () => {
    const availableFilters = Object.entries(Filters).filter(
      ([, value]) => !(value.value in option),
    )

    const first = availableFilters[0]

    if (first) {
      const [, value] = first
      setOption((prev) => ({
        ...prev,
        [value.value]: '',
      }))
    }
  }

  useEffect(() => {
    restoreFilters(setOption, option, inputRefs, request)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex w-[600px] flex-col justify-between gap-4 rounded border-gray-600 bg-gray-900 text-sm">
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
              selectLimitState={selectLimitState}
              request={request}
              setOption={setOption}
              valueOption={value}
              filterContent={filterContent}
              inputRefs={inputRefs}
            />
          ))}
        </div>
      )}
      <footer className="relative flex items-center justify-between p-5 text-sm">
        <div>
          {Object.keys(option).length < Object.keys(Filters).length && (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#8B5CF6] hover:text-gray-200"
                onClick={handleClick}
              >
                <PlusIcon size={20} /> Add filtro
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {Object.values(option).some((value) => value !== undefined) && (
            <button
              onClick={() => {
                queryFilterClear({
                  request,
                  setOption,
                  setSelectLimit,
                })
                // if (inputRef.current) {
                //   inputRef.current.value = ''
                // }
                localStorage.removeItem('option')
              }}
              className="text-sm text-red-500"
            >
              Excluir todos os filtros
            </button>
          )}
          <button
            className="rounded-md bg-[#8B5CF6e5] px-4 py-2 text-sm font-medium text-white"
            onClick={(e) => {
              console.log(option)
              e.preventDefault()
              handleApplyAll()
              toggleModal({ index: 1, set: setToggleModalList, toggler: false })
            }}
          >
            Aplicar
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Dropdown
