import { SearchIcon } from 'lucide-react'
import { useRef } from 'react'

interface SearchProps {
  request: React.Dispatch<
    React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>
  >
}

function Search({ request }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null) // useRef para acessar o valor do input

  function handleButtonClick() {
    console.log(request)
    if (inputRef.current) {
      request((prevState) => ({
        ...prevState,
        searchString: inputRef.current!.value,
      })) // Atualiza o estado externo com o valor do input
    }
  }

  return (
    <div className="relative flex h-full items-center rounded-lg border border-zinc-800 bg-zinc-700 px-2 text-white has-[:focus]:border-blue-600">
      <div className="flex h-[20px] items-center">
        <SearchIcon size={20} />
      </div>
      <input
        type="text"
        className="bg-transparent pl-2 outline-none"
        placeholder="Procurar por filmes"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleButtonClick()
        }}
      />
    </div>
  )
}

export default Search
