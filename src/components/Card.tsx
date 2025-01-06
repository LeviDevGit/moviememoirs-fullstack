import { CardProps } from '@/types/interfaces'
import { Star, StarHalf } from 'lucide-react'
import Image from 'next/image'

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

function Card({ source }: CardProps) {
  return (
    <div className="flex max-h-[696px] w-fit flex-col items-center rounded-md text-white">
      <div className="group relative w-fit">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 opacity-0 blur duration-[1000ms] group-hover:opacity-100 group-hover:blur-none">
          {renderStars(source.movie.value)}
        </div>
        <div className="relative aspect-[345/518] shadow-cardShadow duration-[2500ms] hover:blur hover:grayscale">
          <Image
            alt="Poster"
            src={source.movie.img}
            width={345}
            height={518}
            priority
            className="aspect-[345/518] rounded-md object-cover object-center shadow-imageShadow"
          />
        </div>
      </div>
      <div className="h-[150px] w-[220px] pt-4 2xl:w-[345px]">
        <div className="h-[50px] 2xl:h-[80px]">
          <h2 className="text-center text-sm font-semibold 2xl:text-2xl">
            {source.movie.name}
          </h2>
        </div>
        <hr className="w-full border border-[#ffffff4d]" />
        <div className="mt-3 flex flex-col gap-1 font-['Inter'] text-xs 2xl:text-sm">
          <span className="truncate">{source.movie.direction}</span>
          <br />
          <span className="self-end">
            {source.movie.time} | {source.movie.date}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
