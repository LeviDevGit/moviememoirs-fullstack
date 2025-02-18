import { CardProps } from '@/types/interfaces'
import renderStars from '@/utils/renderStars'
import Image from 'next/image'

function Card({ source, setToggleDetail }: CardProps) {
  return (
    <div className="flex w-full flex-col items-center rounded-md bg-[#27272a] p-4 pb-0 text-white">
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
      <div className="group h-full w-[220px] pt-4 2xl:w-[345px]">
        <div className="flex h-[50px] 2xl:h-[80px]">
          <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-semibold 2xl:text-2xl">
            {source.movie.name}
          </h2>
        </div>
        <hr className="w-full border border-[#ffffff4d]" />
        <div className="my-3 flex flex-col gap-1 font-['Inter'] text-xs 2xl:text-sm">
          <span className="truncate">{source.movie.direction}</span>
          <br />
          <span className="self-end">
            {source.movie.time} | {source.movie.year}
          </span>
        </div>
        <button
          className="my-4 h-[30px] w-full rounded-md bg-[#841B2D] opacity-0 duration-1000 hover:bg-[#841B2D]/85 group-hover:opacity-100"
          onClick={() => {
            setToggleDetail(source.movieId)
          }}
        >
          Detalhes
        </button>
      </div>
    </div>
  )
}

export default Card
