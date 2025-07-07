import Rater from '@/components/Rater'
import { dataProps } from '@/utils/dispatchDetail'
import { UserRound } from 'lucide-react'
// import ImageWithFallback from './image-fallback'

interface MediaInfoProps {
  data: dataProps
}

function MediaInfo({ data }: MediaInfoProps) {
  return (
    <div className="h-full">
      <div className="flex w-[600px] flex-col justify-between gap-2">
        <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-end justify-start gap-4 text-4xl">
              <p>{data.name}</p>
              <p className="text-xl text-text-300 underline">{data?.year}</p>
            </div>
            <div className="flex w-full justify-end">
              <p className="max-w-[250px] truncate text-right text-text-400">
                Dirigido por{' '}
                <span className="text-text-300 underline">
                  {data?.direction}
                </span>
              </p>
            </div>
          </div>
          <div className="h-full w-full">
            <h2>Sinopse</h2>
            <p className="line-clamp-4 h-[100px] w-full select-none text-justify text-[#9ab]">
              api.data.title.plot
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-start gap-2">
              <h2>Tags</h2>
              <p className="inline-block whitespace-nowrap rounded-[3px] bg-[#283038] px-[6px] py-[3px] leading-[1.5] text-[#9ab] shadow-inner shadow-[hsla(0,0%,100%,0.05)]">
                api.data.title.genres.map
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1>Elenco e Equipe</h1>
            <div className="w-full overflow-x-auto whitespace-nowrap py-2 pb-6">
              <div className="flex w-max gap-10">
                <div className="flex w-[120px] flex-col items-center gap-1">
                  {/* {e.name.avatars && e.name.avatars[0].url ? (
                    <ImageWithFallback src={e.name.avatars[0].url} />
                  ) : (
                  )} */}
                  <div className="flex h-[169px] w-[113px] items-center justify-center rounded-lg bg-[#e5e5e5]">
                    <UserRound className="h-[50px] w-[50px]" color="#cecece" />
                  </div>
                  <h3 className="w-[113px] truncate text-center text-sm">
                    e.name.display_name
                  </h3>
                  <h4 className="w-[113px] truncate text-center text-xs text-white/60">
                    Como e.characters && e.characters[0]
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h1 className="mb-2">Comentários</h1>
            <div className="flex flex-col gap-4">
              {data.views.map((e) => (
                <div
                  key={e.id}
                  className="flex w-full items-center justify-between gap-6"
                >
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col rounded-lg bg-card p-5">
                      <Rater
                        defaultValue={e.rating}
                        width="w-[100px] mb-3"
                        readonly={true}
                      />
                      <h2 className="mb-3 text-sm text-white/50">
                        Assistido em{' '}
                        {new Date(e.date).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </h2>
                      <div className="pr-3">
                        <p className="text-white/90">{e.commentary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaInfo
