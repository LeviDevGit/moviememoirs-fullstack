import { Star, StarHalf } from 'lucide-react'
import Image from 'next/image'

interface MovieCardProps {
  source: {
    value: number
  }
}

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
          {renderStars(source.value)}
        </div>
        <div className="shadow-cardShadow w-[345px] object-cover object-center duration-[2500ms] hover:blur hover:grayscale">
          <Image
            alt="Poster"
            src="https://image.tmdb.org/t/p/original/bazlgJAKWCBF7OllC3JtyJ2DV1n.jpg"
            width={345}
            height={518}
          />
        </div>
      </div>
      <div className="w-[345px] pt-4">
        <div className="h-[80px] overflow-hidden">
          <h2 className="text-ghost-white text-center text-2xl font-semibold">
            O Enigma de Outro Mundo
          </h2>
        </div>
        <hr className="w-full border border-[#ffffff4d]" />
        <div className="text-silver mt-3 flex flex-col gap-1 font-['Inter'] text-sm">
          <span>John Carpenter</span>
          <br />
          <span className="self-end">1hr 49min | 1982</span>
        </div>
      </div>
    </div>
  )
}
