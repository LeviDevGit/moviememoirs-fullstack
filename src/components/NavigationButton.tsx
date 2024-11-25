import { ReactNode } from 'react'

interface NavigationButtonProps {
  children: ReactNode
  left?: boolean
}

export default function NavigationButton({
  children,
  left = true,
}: NavigationButtonProps) {
  return (
    <button
      className={`group absolute inset-y-0 z-10 flex w-fit items-center justify-start from-zinc-900 to-transparent ${left ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'}`}
    >
      {children}
    </button>
  )
}
