import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface DirectionalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: boolean
  dataLength: number
}

function Directional({ left = true, dataLength, ...rest }: DirectionalProps) {
  const ChevronIcon = left ? ChevronLeft : ChevronRight

  const positionClass = left
    ? 'left-0 justify-start bg-gradient-to-r'
    : 'right-0 justify-end bg-gradient-to-l'

  const visibilityClass = dataLength < 8 ? 'hidden' : ''

  return (
    <button
      {...rest}
      className={`group absolute inset-y-0 z-10 flex w-[100px] items-center from-background to-transparent ${positionClass} ${visibilityClass}`}
    >
      <ChevronIcon
        size={64}
        absoluteStrokeWidth
        className="group-transition-transform text-text-200 group-hover:scale-110 group-hover:text-text-50"
      />
    </button>
  )
}

export default Directional
