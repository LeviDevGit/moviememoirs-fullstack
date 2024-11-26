import { MovieCardProps } from '@/types/interfaces'
import { Star, StarHalf } from 'lucide-react'
import Image from 'next/image'

function renderStars(value: number) {
  const starColor = '#841B2D'
  const fullStar = Math.floor(value)
  const stars = []

  for (let i = 0; i < fullStar; i++) {
    stars.push(<Star fill={starColor} color={starColor} size={40} />)
  }

  if (value - fullStar) {
    stars.push(<StarHalf fill={starColor} color={starColor} size={40} />)
  }

  return stars.map((element, index) => ({
    ...element,
    key: `${index}`,
  }))
}

export default function MovieCard({ source }: MovieCardProps) {
  return (
    <div className="flex h-[696px] w-fit flex-col items-center rounded-md text-white">
      <div className="group relative w-fit">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 opacity-0 blur duration-[1000ms] group-hover:opacity-100 group-hover:blur-none">
          {renderStars(source.movie.value)}
        </div>
        <div className="relative h-[518px] w-[345px] shadow-cardShadow duration-[2500ms] hover:blur hover:grayscale">
          <Image
            alt="Poster"
            src={source.movie.img}
            fill
            className="rounded-md object-cover object-center shadow-imageShadow"
          />
        </div>
      </div>
      <div className="w-[345px] pt-4">
        <div className="h-[80px] overflow-hidden">
          <h2 className="text-ghost-white text-center text-2xl font-semibold">
            {source.movie.name}
          </h2>
        </div>
        <hr className="w-full border border-[#ffffff4d]" />
        <div className="text-silver mt-3 flex flex-col gap-1 font-['Inter'] text-sm">
          <span>{source.movie.direction}</span>
          <br />
          <span className="self-end">
            {source.movie.time} | {source.movie.date}
          </span>
        </div>
      </div>
    </div>
  )
}
