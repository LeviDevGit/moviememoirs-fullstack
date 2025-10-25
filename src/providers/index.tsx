'use client'

import { ReactNode } from 'react'
import { GlobalProvider } from './global'
import { FilterProvider } from './filter'

interface ProvidersProps {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <GlobalProvider>
      <FilterProvider>{children}</FilterProvider>
    </GlobalProvider>
  )
}

export default Providers
