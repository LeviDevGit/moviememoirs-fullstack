import { ImageOff } from 'lucide-react'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
}

const ImageWithFallback = ({ src }: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false)

  console.log(src)

  return hasError ? (
    <div className="flex h-[169px] w-[113px] items-center justify-center rounded-lg bg-[#e5e5e5]">
      <ImageOff className="h-[50px] w-[50px]" color="#cecece" />
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Avatar"
      onError={(e) => {
        setHasError(true)
        console.log('teste')
        e.currentTarget.textContent = 'Error'
      }}
      className="h-[169px] w-[113px] rounded-lg object-cover object-center"
    />
  )
}

export default ImageWithFallback
