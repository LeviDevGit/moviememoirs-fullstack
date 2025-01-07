import { dataFetchProps } from '@/types/interfaces'
import { Card, Directional } from '@/components/carousel'

interface GalleryProps {
  handleDirectionChange: (operation: number) => void
  dataFetch: dataFetchProps
}

function Gallery({ handleDirectionChange, dataFetch }: GalleryProps) {
  return (
    <div className="relative flex w-full items-center justify-center gap-x-12 overflow-x-hidden py-4">
      <Directional
        onClick={() => handleDirectionChange(-1)}
        dataLength={dataFetch.length}
      />
      {dataFetch[0] !== undefined &&
        dataFetch.map((element, index) => (
          <Card source={element} key={`${index}`} />
        ))}
      <Directional
        left={false}
        onClick={() => handleDirectionChange(1)}
        dataLength={dataFetch.length}
      />
    </div>
  )
}

export default Gallery
