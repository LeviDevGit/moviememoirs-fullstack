'use client'

import { ReactNode } from 'react'
import { GlobalProvider } from './global'

interface ProvidersProps {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  return <GlobalProvider>{children}</GlobalProvider>
}

export default Providers
