import { SearchIcon } from 'lucide-react'
import { useRef } from 'react'
import { InputIcon } from './ui/Inputs'

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
      searchString: inputRef.current!.value,
    })) // Atualiza o estado externo com o valor do input
  }
}

interface SearchProps {
  request: requestType
}

function Search({ request }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null) // useRef para acessar o valor do input

  return (
    <InputIcon
      placeholder="Procurar por midias"
      ref={inputRef}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleInputKey(inputRef, request)
      }}
    >
      <SearchIcon />
    </InputIcon>
  )
}

export default Search
