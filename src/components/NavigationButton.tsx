import { ButtonHTMLAttributes, ReactNode } from 'react'

interface NavigationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  left?: boolean
}

export default function NavigationButton({
  children,
  left = true,
  ...rest
}: NavigationButtonProps) {
  return (
    <button
      {...rest}
      className={`group absolute inset-y-0 z-10 flex w-[100px] items-center from-zinc-900 to-transparent ${left ? 'left-0 justify-start bg-gradient-to-r' : 'right-0 justify-end bg-gradient-to-l'}`}
    >
      {children}
    </button>
  )
}
