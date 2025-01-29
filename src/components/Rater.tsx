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
    >
      {rating >= i + 1 ? (
        <Star
          width={50}
          height={50}
          className="text-[#ffff00]"
          fill="#ffff00"
          strokeWidth={0}
        />
      ) : rating - i === 0.5 ? (
        <StarHalf
          width={50}
          height={50}
          className="text-[#ffff00]"
          fill="#ffff00"
          strokeWidth={0}
        />
      ) : (
        <Star width={50} height={50} fill="white" strokeWidth={0} />
      )}
    </button>
  ))
}

function Rater() {
  const [rating, setRating] = useState(0)

  return <div className="flex">{Rating(setRating, rating)}</div>
}

export default Rater
