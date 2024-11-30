import { Search } from 'lucide-react'
import { useRef } from 'react'

interface SearchInputProps {
  request: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchInput({ request }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null) // useRef para acessar o valor do input

  const handleButtonClick = () => {
    if (inputRef.current) {
      request(inputRef.current.value) // Atualiza o estado externo com o valor do input
    }
  }

  return (
    <div className="flex rounded-lg border border-zinc-800 bg-zinc-700 text-white has-[:focus]:border-blue-600">
      <input
        type="text"
        className="h-[45px] bg-transparent pl-2 outline-none"
        ref={inputRef}
      />
      <button
        className="h-full rounded-r-lg bg-zinc-600 px-3 hover:bg-zinc-500"
        onClick={handleButtonClick}
      >
        <Search />
      </button>
    </div>
  )
}
