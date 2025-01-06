import { ImageUp } from 'lucide-react'

function Dropzone() {
  return (
    <div className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-dotted border-gray-500 p-2">
      <label>
        <div className="flex items-center justify-center gap-5 text-xs">
          <ImageUp strokeWidth={1} className="h-[2em] w-[2em]" />
          <p>
            Solte poster ou <strong>Explore arquivos .JPG</strong>
          </p>
        </div>
        <input
          type="file"
          name="file"
          accept=".jpg"
          className="hidden h-[32px]"
        />
      </label>
    </div>
  )
}

export default Dropzone
