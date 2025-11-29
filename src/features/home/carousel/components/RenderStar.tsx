import { Star, StarHalf } from 'lucide-react'

function renderStars(value: number) {
  const fullStar = Math.floor(value)
  const stars = []

  for (let i = 0; i < fullStar; i++) {
    stars.push(
      <div className="h-[40px]">
        <Star className="fill-current text-accent" />
      </div>,
    )
  }

  if (value - fullStar) {
    stars.push(
      <div className="h-[40px]">
        <StarHalf className="fill-current text-accent" />
      </div>,
    )
  }

  return stars.map((element, index) => ({
    ...element,
    key: `${index}`,
  }))
}

export default renderStars
