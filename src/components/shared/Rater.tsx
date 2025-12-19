import { Star, StarHalf } from 'lucide-react'
import { useEffect, useState } from 'react'

function generateStars(
  setRating: React.Dispatch<React.SetStateAction<number>>,
  rating: number,
  readOnly: boolean,
  filled: boolean,
) {
  return Array.from({ length: 5 }).map((_, i) =>
    readOnly ? (
      <div key={i} className="h-1/5 w-1/5">
        {rating >= i + 1 ? (
          <Star
            className={`h-full w-full fill-current text-accent`}
            strokeWidth={0}
          />
        ) : rating - i === 0.5 ? (
          <StarHalf
            className="h-full w-full fill-current text-accent"
            strokeWidth={0}
          />
        ) : (
          <Star fill="white" className="h-full w-full" strokeWidth={0} />
        )}
      </div>
    ) : (
      <button
        key={i}
        onClick={(e) => {
          const { offsetX } = e.nativeEvent
          const { clientWidth } = e.currentTarget
          const isHalf = offsetX < clientWidth / 2

          setRating(i + 0.5 + (isHalf ? 0 : 0.5))
        }}
        type="button"
        className="h-1/5 w-1/5 transition-transform hover:scale-110"
      >
        {rating >= i + 1 ? (
          <Star
            className="h-full w-full fill-current text-primary"
            strokeWidth={0}
          />
        ) : rating - i === 0.5 ? (
          <StarHalf
            className="h-full w-full fill-current text-primary"
            strokeWidth={0}
          />
        ) : (
          <Star
            fill={filled ? 'transparent' : 'white'}
            className="h-full w-full text-[#4B5563]"
            strokeWidth={filled ? 2 : 0}
          />
        )}
      </button>
    ),
  )
}

interface RaterProps {
  defaultValue?: number | undefined
  width?: string
  readOnly?: boolean
  filled?: boolean
}

function Rater({
  defaultValue,
  width,
  readOnly = false,
  filled = true,
}: RaterProps) {
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (defaultValue) {
      setRating(defaultValue)
    }
  }, [defaultValue])

  return (
    <div
      className={`flex items-center justify-center ${width || 'w-[220px]'} `}
    >
      {generateStars(setRating, rating, readOnly, filled)}
      {!readOnly && <input type="hidden" name="value" value={rating} />}
    </div>
  )
}

export default Rater
