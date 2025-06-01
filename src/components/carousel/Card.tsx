import { CardProps } from '@/types/interfaces'
import renderStars from '@/utils/renderStars'
import Image from 'next/image'
import Link from 'next/link'

function Card({ source }: CardProps) {
  return (
    <div className="bg-card flex w-[252px] flex-col items-center rounded-md p-4 pb-0 text-white">
      <div className="group relative w-fit">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 opacity-0 blur duration-[1000ms] group-hover:opacity-100 group-hover:blur-none">
          <div className="flex">{renderStars(source.movie.value)}</div>
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
      <div className="group h-full w-[220px] pt-4">
        <Link href={`/detail/${source.movieId}`} className="w-full bg-red-500">
          <div className="flex h-[50px]">
            <h2 className="w-full truncate text-center text-sm font-semibold">
              {source.movie.name}
            </h2>
          </div>
          <hr className="w-full border border-[#ffffff4d]" />
          <div className="my-6 flex flex-col gap-2 font-['Inter'] text-xs">
            <span className="truncate text-start">
              {source.movie.direction}
            </span>
            <br />
            <span className="self-end">
              {source.movie.time} | {source.movie.year}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Card
