import { ImageUp } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

function PosterDropzone() {
  const [file, setFile] = useState<File>()

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const files = event.target.files

    if (files && files.length > 0) {
      console.log(files[0])
      setFile(files[0])
    }
  }

  return (
    <label className="relative box-border aspect-[2/3] w-[280px] cursor-pointer rounded-md bg-[#1F2937] p-4">
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
        <div className="flex h-full flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-500 text-xs">
          <ImageUp strokeWidth={1} className="h-[2em] w-[2em]" />
          <p className="text-center">
            Solte um poster ou <br /> <strong>Explore arquivos .JPG</strong>
          </p>
        </div>
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

export default PosterDropzone
