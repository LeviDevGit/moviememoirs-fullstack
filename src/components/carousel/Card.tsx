import { CardProps } from '@/types/interfaces'
import renderStars from '@/utils/renderStars'
import Image from 'next/image'

function Card({ source }: CardProps) {
  return (
    <div className="flex max-h-[696px] w-fit flex-col items-center rounded-md text-white">
      <div className="group relative w-fit">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 opacity-0 blur duration-[1000ms] group-hover:opacity-100 group-hover:blur-none">
          <div className="flex flex-col items-center">
            <div className="flex">{renderStars(source.movie.value)}</div>
            <button className="cursor-pointer">Detalhes</button>
          </div>
        </div>
        <div className="relative shadow-cardShadow duration-[2500ms] hover:blur hover:grayscale">
          <Image
            alt="Poster"
            src={source.movie.img}
            width={220}
            height={330}
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
            {source.movie.time} | {source.movie.year}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
