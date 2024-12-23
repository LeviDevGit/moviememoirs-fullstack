import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface DirectionalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: boolean
  dataLength: number
}

const commonProps = {
  size: 64,
  absoluteStrokeWidth: true,
  className:
    'group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]',
}

export default function DirectionalButton({
  left = true,
  dataLength,
  ...rest
}: DirectionalButtonProps) {
  const ChevronIcon = left ? ChevronLeft : ChevronRight

  const positionClass = left
    ? 'left-0 justify-start bg-gradient-to-r'
    : 'right-0 justify-end bg-gradient-to-l'

  const visibilityClass = dataLength < 6 ? 'hidden' : ''

  return (
    <button
      {...rest}
      className={`group absolute inset-y-0 z-10 flex w-[100px] items-center from-zinc-900 to-transparent ${positionClass} ${visibilityClass}`}
    >
      <ChevronIcon {...commonProps} />
    </button>
  )
}
