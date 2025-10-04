import DetailCommentary from '@/components/layout/detail/DetailCommentary'
import DetailGenre from '@/components/layout/detail/DetailGenre'
import DetailRole from '@/components/layout/detail/DetailRole'
import DetailSynopsis from '@/components/layout/detail/DetailSynopsis'
import { dataProps } from '@/utils/dispatchDetail'

interface MediaInfoProps {
  data: dataProps
  editMode: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
}

function MediaInfo({ data, editMode, setToggleModal }: MediaInfoProps) {
  return (
    <div className="h-full">
      <div className="flex w-[600px] flex-col justify-between gap-2">
        <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll">
          <div className="flex w-full flex-col gap-4">
            {editMode ? (
              <button
                className="flex w-full items-end justify-start gap-4 border-2 border-transparent text-4xl hover:border-dashed hover:border-red-100"
                type="button"
                onClick={() => setToggleModal([true])}
              >
                <p>{data.name}</p>
                <p className="text-xl text-text-300 underline">{data?.year}</p>
              </button>
            ) : (
              <div className="flex w-full items-end justify-start gap-4 border-2 border-transparent text-4xl">
                <p>{data.name}</p>
                <p className="text-xl text-text-300 underline">{data?.year}</p>
              </div>
            )}
            {editMode ? (
              <button
                className="flex w-full justify-end border-2 border-transparent hover:border-dashed hover:border-red-100"
                type="button"
                onClick={() => setToggleModal([false, true])}
              >
                <p className="max-w-[250px] truncate text-right text-text-400">
                  Criado por{' '}
                  <span className="text-text-300 underline">
                    {data?.creator}
                  </span>
                </p>
              </button>
            ) : (
              <div className="flex w-full justify-end border-2 border-transparent">
                <p className="max-w-[250px] truncate text-right text-text-400">
                  Criado por{' '}
                  <span className="text-text-300 underline">
                    {data?.creator}
                  </span>
                </p>
              </div>
            )}
          </div>
          <DetailSynopsis />
          <DetailGenre />
          <DetailRole />
          <DetailCommentary views={data.views} />
        </div>
      </div>
    </div>
  )
}

export default MediaInfo
