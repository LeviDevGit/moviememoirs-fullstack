import PosterDropzone from '@/components/shared/PosterDropzone'
import { dataProps } from '@/utils/dispatchDetail'
import { PencilIcon } from 'lucide-react'
import Image from 'next/image'

interface MediaPosterProps {
  editMode: boolean
  data: dataProps
  setEditMode: (value: React.SetStateAction<boolean>) => void
  id: string
}

function MediaPoster({ editMode, data, setEditMode }: MediaPosterProps) {
  return (
    <div className="sticky top-1 flex h-fit flex-col items-center justify-start gap-4 pt-4">
      {editMode ? (
        <PosterDropzone />
      ) : (
        data.img && (
          <div className="relative aspect-[2/3] w-[280px] shadow-cardShadow">
            <Image
              alt="Poster"
              src={`${data.img}?timestamp=${Date.now()}`}
              priority
              fill
              className="rounded-md object-cover object-center shadow-imageShadow"
            />
          </div>
        )
      )}
      <div className="flex w-full flex-col items-center justify-center gap-4 font-semibold text-[#e0e0e0]">
        {!editMode && (
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[#1F2937] px-2 py-1 text-center text-sm hover:bg-gray-800/90 hover:text-text-50"
            type="button"
            onClick={() => {
              setEditMode(true)
            }}
          >
            <PencilIcon width={'1em'} />
            Editar Detalhes
          </button>
        )}
      </div>
    </div>
  )
}

export default MediaPoster
