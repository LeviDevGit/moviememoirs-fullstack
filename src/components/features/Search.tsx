import { SearchIcon } from 'lucide-react'
import { useRef } from 'react'
import Input from '../ui/Input'

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
}

function Search({ request }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null) // useRef para acessar o valor do input

  const handleFocus = () => {
    inputRef.current?.focus() // foca o input
  }

  return (
    <div
      className="flex items-center gap-4 rounded-lg border border-gray-600 bg-[#1F2937] px-3 py-2 text-white shadow-sm sm:text-sm"
      onClick={handleFocus}
    >
      <SearchIcon className="text-[#9CA3AF]" size={16} />
      <Input
        placeholder="Procurar por midias"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleInputKey(inputRef, request)
        }}
        className="w-[350px] border-0 bg-transparent p-0 focus:ring-0"
      />
    </div>
  )
}

export default Search
