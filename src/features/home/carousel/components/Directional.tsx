import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface DirectionalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: boolean
  dataLength: number
}

function Directional({ left = true, dataLength, ...rest }: DirectionalProps) {
  const ChevronIcon = left ? ArrowLeftIcon : ArrowRightIcon

  // const positionClass = left
  //   ? 'left-0 justify-start bg-gradient-to-r'
  //   : 'right-0 justify-end bg-gradient-to-l'

  const positionText = left ? 'Anterior' : 'Próximo'

  const visibilityClass = dataLength < 8 ? 'hidden' : ''

  return (
    <button
      {...rest}
      className={`group flex items-center rounded-md border border-gray-700 bg-card px-4 py-2 ${visibilityClass}`}
    >
      {left && (
        <ChevronIcon
          size={20}
          absoluteStrokeWidth
          className="group-transition-transform mr-2 text-text-200 group-hover:scale-110 group-hover:text-text-50"
        />
      )}
      <span>{positionText}</span>
      {!left && (
        <ChevronIcon
          size={20}
          absoluteStrokeWidth
          className="group-transition-transform ml-2 text-text-200 group-hover:scale-110 group-hover:text-text-50"
        />
      )}
    </button>
  )
}

export default Directional
