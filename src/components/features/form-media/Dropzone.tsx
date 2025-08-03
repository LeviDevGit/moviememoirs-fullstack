import { ImageUp } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

function Dropzone() {
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
    <label className="h-[330px] w-[220px] cursor-pointer rounded-md border border-dotted border-gray-500">
      {file ? (
        <div className="w-full shadow-cardShadow">
          <Image
            alt="Poster"
            src={URL.createObjectURL(file)}
            width={220}
            height={330}
            priority
            className="h-[330px] w-[220px] rounded-md object-cover object-center shadow-imageShadow"
          />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 py-5 text-xs">
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

export default Dropzone
