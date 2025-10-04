import Rater from '@/components/shared/Rater'
import { MediaView } from '@/utils/dispatchDetail'

interface DetailCommentaryProps {
  views: MediaView[]
}

function DetailCommentary({ views }: DetailCommentaryProps) {
  return (
    <div className="mb-20">
      <h1 className="heading-trail mb-6 text-2xl font-semibold">Comentários</h1>
      <div className="flex flex-col gap-4">
        {views.map((e) => (
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
  )
}

export default DetailCommentary
