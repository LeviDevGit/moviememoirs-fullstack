import { dataFetchProps } from '@/types/interfaces'
import { Card, Directional } from '@/components/carousel'

interface GalleryProps {
  handleDirectionChange: (operation: number) => void
  dataFetch: dataFetchProps
  setToggleDetail: React.Dispatch<React.SetStateAction<number | undefined>>
}

function Gallery({
  handleDirectionChange,
  dataFetch,
  setToggleDetail,
}: GalleryProps) {
  return (
    <div className="relative flex h-full w-full items-start justify-center gap-x-6 overflow-x-hidden pb-4">
      <Directional
        onClick={() => handleDirectionChange(-1)}
        dataLength={dataFetch.length}
      />
      {dataFetch[0] !== undefined &&
        dataFetch.map((element, index) => (
          <Card
            source={element}
            key={`${index}`}
            setToggleDetail={setToggleDetail}
          />
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
