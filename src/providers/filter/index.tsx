import { createContext, ReactNode, useRef, useState } from 'react'

interface FilterContextProps {
  option: Record<string, string>
  setOption: React.Dispatch<React.SetStateAction<Record<string, string>>>
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>
}

export const FilterContext = createContext<FilterContextProps | undefined>(
  undefined,
)

interface FilterProviderProps {
  children: ReactNode
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [option, setOption] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('option')
    return saved ? JSON.parse(saved) : {}
  })

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  return (
    <FilterContext.Provider value={{ option, setOption, inputRefs }}>
      {children}
    </FilterContext.Provider>
  )
}
