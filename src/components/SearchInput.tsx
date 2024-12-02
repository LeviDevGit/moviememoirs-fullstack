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
    <div className="relative flex h-[40px] items-center rounded-lg border border-zinc-800 bg-zinc-700 px-2 text-white has-[:focus]:border-blue-600">
      <div className="flex h-[20px] items-center">
        <Search size={20} />
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
