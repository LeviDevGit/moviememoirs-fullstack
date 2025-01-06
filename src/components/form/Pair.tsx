import { ReactNode } from 'react'

interface PairProps {
  children: ReactNode
}

function Pair({ children }: PairProps) {
  return <div className="flex items-center gap-6">{children}</div>
}

export default Pair
