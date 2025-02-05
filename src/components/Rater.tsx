import { Star, StarHalf } from 'lucide-react'
import { useState } from 'react'

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
    >
      {rating >= i + 1 ? (
        <Star
          width={40}
          height={40}
          className="text-[#ffff00]"
          fill="#ffff00"
          strokeWidth={0}
        />
      ) : rating - i === 0.5 ? (
        <StarHalf
          width={40}
          height={40}
          className="text-[#ffff00]"
          fill="#ffff00"
          strokeWidth={0}
        />
      ) : (
        <Star width={40} height={40} fill="white" strokeWidth={0} />
      )}
    </button>
  ))
}

function Rater() {
  const [rating, setRating] = useState(0)

  return (
    <div className="flex w-[220px] items-center justify-center">
      {Rating(setRating, rating)}
      <input type="hidden" name="value" value={rating} />
    </div>
  )
}

export default Rater
