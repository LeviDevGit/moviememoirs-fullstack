import { CardProps } from '@/types/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import renderStars from './render-star'

function Card({ source }: CardProps) {
  return (
    <div className="flex w-[252px] flex-col items-center rounded-2xl bg-card p-4 pb-0">
      <div className="group relative w-fit">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 opacity-0 blur duration-[1000ms] group-hover:opacity-100 group-hover:blur-none">
          <div className="flex">{renderStars(source.rating)}</div>
        </div>
        <div className="relative shadow-cardShadow duration-[2500ms] hover:blur hover:grayscale">
          <Image
            alt="Poster"
            src={source.media.img}
            width={220}
            height={330}
            priority
            className="aspect-[345/518] rounded-md object-cover object-center shadow-imageShadow"
          />
        </div>
      </div>
      <div className="group h-full w-[220px] pt-4">
        <Link href={`/detail/${source.mediaId}`} className="w-full bg-red-500">
          <div className="flex h-[50px]">
            <h2 className="w-full truncate text-center text-sm font-bold text-text-50">
              {source.media.name}
            </h2>
          </div>
          <hr className="w-full border border-text-50 opacity-25" />
          <div className="my-6 flex flex-col gap-2 font-['Inter'] text-xs font-medium text-text-50">
            <span className="truncate text-start">{source.media.creator}</span>
            <br />
            <span className="self-end">
              {source.media.time} | {source.media.year}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Card
