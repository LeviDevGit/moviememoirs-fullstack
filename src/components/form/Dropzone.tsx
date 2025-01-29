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
    <div className="flex h-full w-full items-center justify-center rounded-xl border border-dotted border-gray-500 p-2">
      <label className="h-full w-full cursor-pointer">
        {file ? (
          <div className="w-[200px]">
            <Image
              src={URL.createObjectURL(file)}
              alt="Poster"
              width={300}
              height={300}
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
    </div>
  )
}

export default Dropzone
