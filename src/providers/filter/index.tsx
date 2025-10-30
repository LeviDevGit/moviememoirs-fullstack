import { createContext, ReactNode, useEffect, useRef, useState } from 'react'

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
  const [option, setOption] = useState<Record<string, string>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem('option')
      if (saved) setOption(JSON.parse(saved))
    } catch {
      // noop
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('option', JSON.stringify(option))
    } catch {
      // noop
    }
  }, [option])

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  return (
    <FilterContext.Provider value={{ option, setOption, inputRefs }}>
      {children}
    </FilterContext.Provider>
  )
}
