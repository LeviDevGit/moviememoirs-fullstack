import { Star, StarHalf } from 'lucide-react'
import { useEffect, useState } from 'react'

interface RaterProps {
  defaultValue?: number | undefined
  width?: string
}

function Rating(
  setRating: React.Dispatch<React.SetStateAction<number>>,
  rating: number,
) {
  return Array.from({ length: 5 }).map((_, i) => (
    <button
      key={i}
      onClick={(e) => {
        const { offsetX } = e.nativeEvent
        const { clientWidth } = e.currentTarget
        const isHalf = offsetX < clientWidth / 2
        setRating(i + 0.5 + (isHalf ? 0 : 0.5))
      }}
      type="button"
      className="h-1/5 w-1/5"
    >
      {rating >= i + 1 ? (
        <Star
          className="h-full w-full text-[#ffff00]"
          fill="#ffff00"
          strokeWidth={0}
        />
      ) : rating - i === 0.5 ? (
        <StarHalf
          className="h-full w-full text-[#ffff00]"
          fill="#ffff00"
          strokeWidth={0}
        />
      ) : (
        <Star fill="white" className="h-full w-full" strokeWidth={0} />
      )}
    </button>
  ))
}

function Rater({ defaultValue, width }: RaterProps) {
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (defaultValue) {
      setRating(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className={`flex items-center justify-center ${width || 'w-[220px]'}`}>
      {Rating(setRating, rating)}
      <input type="hidden" name="value" value={rating} />
    </div>
  )
}

export default Rater
