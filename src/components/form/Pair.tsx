import { ReactNode } from 'react'

interface PairProps {
  children: ReactNode
}

function Pair({ children }: PairProps) {
  return (
    <div className="flex items-center justify-between gap-6">{children}</div>
  )
}

export default Pair
