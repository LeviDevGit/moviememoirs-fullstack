import { FilterIcon, SearchIcon } from 'lucide-react'
import { useRef } from 'react'
import Input from '../ui/Input'
import { toggleModal } from '@/utils/toggleModal'
import { FilterDropdown } from './filter-dropdown'
import { FilterContent } from '@/app/page'

type requestType = React.Dispatch<
  React.SetStateAction<{
    searchString: string
    directorString: string | undefined
    yearString: string | undefined
    valueString: string | undefined
  }>
>

function handleInputKey(
  inputRef: React.RefObject<HTMLInputElement>,
  request: requestType,
) {
  console.log(request)
  if (inputRef.current) {
    request((prevState) => ({
      ...prevState,
      searchString: inputRef.current!.value.trim(),
    })) // Atualiza o estado externo com o valor do input
  }
}

interface SearchProps {
  request: requestType
  setToggleModalList: React.Dispatch<React.SetStateAction<boolean[]>>
  toggleModalList: boolean[]
  dropdown: React.MutableRefObject<HTMLDivElement | null>
  setFilterContent: React.Dispatch<React.SetStateAction<FilterContent>>
  filterContent: FilterContent
}

function Search({
  request,
  setToggleModalList,
  toggleModalList,
  dropdown,
  setFilterContent,
  filterContent,
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null) // useRef para acessar o valor do input

  const handleFocus = () => {
    inputRef.current?.focus() // foca o input
  }

  return (
    <div
      className="flex items-center gap-4 rounded-full border border-gray-600 bg-transparent px-3 py-2 text-white shadow-sm sm:text-sm"
      onClick={handleFocus}
    >
      <SearchIcon />
      <Input
        placeholder="Procurar por midias"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleInputKey(inputRef, request)
        }}
        className="w-[350px] border-0 bg-transparent p-0 focus:ring-0"
      />
      <div className="relative flex items-center justify-center text-sm">
        <button
          onClick={(event) => {
            event.stopPropagation()
            toggleModal({
              index: 1,
              set: setToggleModalList,
              toggler: !toggleModalList[1],
            })
          }}
          className="h-full rounded-lg text-text-200 hover:text-text-50"
        >
          <FilterIcon />
        </button>
        {toggleModalList[1] && (
          <FilterDropdown
            dropdown={dropdown}
            filterContent={filterContent}
            request={setFilterContent}
          />
        )}
      </div>
    </div>
  )
}

export default Search
