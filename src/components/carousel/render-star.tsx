import { Star, StarHalf } from 'lucide-react'

function renderStars(value: number) {
  const starColor = '#841B2D'
  const fullStar = Math.floor(value)
  const stars = []

  for (let i = 0; i < fullStar; i++) {
    stars.push(
      <div className="h-[40px]">
        <Star fill={starColor} color={starColor} />
      </div>,
    )
  }

  if (value - fullStar) {
    stars.push(
      <div className="h-[40px]">
        <StarHalf fill={starColor} color={starColor} />
      </div>,
    )
  }

  return stars.map((element, index) => ({
    ...element,
    key: `${index}`,
  }))
}

export default renderStars
