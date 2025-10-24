import PosterDropzone from '@/components/shared/PosterDropzone'
import Rater from '@/components/shared/Rater'
import { dataProps } from '@/utils/dispatchDetail'
import { PencilIcon, UndoIcon } from 'lucide-react'
import Image from 'next/image'

interface MediaPosterProps {
  editMode: boolean
  data: dataProps
  setEditMode: (value: React.SetStateAction<boolean>) => void
}

function MediaPoster({ editMode, data, setEditMode }: MediaPosterProps) {
  return (
    <div className="sticky top-1 flex h-fit flex-col items-center justify-start gap-4">
      {editMode ? (
        <PosterDropzone />
      ) : (
        data.img && (
          <div className="h-[330px] w-[220px] shadow-cardShadow">
            <Image
              alt="Poster"
              src={`${data.img}?timestamp=${Date.now()}`}
              width={220}
              height={330}
              priority
              className="h-[330px] w-[220px] rounded-md object-cover object-center shadow-imageShadow"
            />
          </div>
        )
      )}
      <div className="w-[150px]">
        {data && (
          <Rater
            defaultValue={data.value}
            width="w-[150px] mb-3"
            readOnly={true}
          />
        )}
      </div>
      <div className="flex w-[80px] flex-col items-center justify-center gap-4 font-semibold text-[#e0e0e0]">
        {!editMode ? (
          <button
            className="ml-2 rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
            type="button"
            onClick={() => {
              setEditMode(true)
            }}
          >
            <PencilIcon />
          </button>
        ) : (
          <button
            className="ml-2 rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
            type="button"
            onClick={() => {
              setEditMode(false)
            }}
          >
            <UndoIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default MediaPoster
