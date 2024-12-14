import { ButtonHTMLAttributes, ReactNode } from 'react'

interface DirectionalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  left?: boolean
  dataLength: number
}

export default function DirectionalButton({
  children,
  left = true,
  dataLength,
  ...rest
}: DirectionalButtonProps) {
  return (
    <button
      {...rest}
      className={`group absolute inset-y-0 z-10 flex w-[100px] items-center from-zinc-900 to-transparent ${left ? 'left-0 justify-start bg-gradient-to-r' : 'right-0 justify-end bg-gradient-to-l'} ${dataLength < 6 && 'hidden'}`}
    >
      {children}
    </button>
  )
}
