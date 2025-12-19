import { ImageUp, UploadIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const dropzone = tv({
  base: 'relative box-border aspect-[2/3] w-[280px] cursor-pointer rounded-md',
  variants: {
    background: {
      default: 'bg-card',
      modal: 'bg-background',
    },
    padding: {
      default: 'p-4',
      none: 'p-0',
    },
  },
  defaultVariants: {
    background: 'default',
    padding: 'default',
  },
})

interface PosterDropzoneProps extends VariantProps<typeof dropzone> {
  iconVariant?: 'default' | 'minimalist'
}

function PosterDropzone({
  background,
  padding,
  iconVariant = 'default',
}: PosterDropzoneProps) {
  const [file, setFile] = useState<File>()

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const files = event.target.files

    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  return (
    <label className={dropzone({ background, padding })}>
      {file ? (
        <div className="shadow-cardShadow">
          <Image
            alt="Poster"
            src={URL.createObjectURL(file)}
            fill
            priority
            className="rounded-md object-cover object-center shadow-imageShadow"
          />
        </div>
      ) : (
        IconVariant({ variant: iconVariant })
      )}
      <input
        type="file"
        name="file"
        accept=".jpg"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  )
}

const iconvariant = tv({
  base: 'flex h-full flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-500 text-xs rounded-md',
  variants: {
    variant: {
      default: '',
      minimalist: 'text-gray-400 transition-colors group-hover:text-purple-500',
    },
  },
})

function IconVariant({ variant }: VariantProps<typeof iconvariant>) {
  if (variant === 'default') {
    return (
      <div className={iconvariant({ variant: 'default' })}>
        <ImageUp strokeWidth={1} className="h-[2em] w-[2em]" />
        <p className="text-center">
          Solte um poster ou <strong>Explore arquivos .JPG</strong>
        </p>
      </div>
    )
  } else {
    return (
      <div className={iconvariant({ variant: 'minimalist' })}>
        <UploadIcon size={32} />
        <span className="text-sm font-medium">Carregar Poster</span>
      </div>
    )
  }
}

export default PosterDropzone
