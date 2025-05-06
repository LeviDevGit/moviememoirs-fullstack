import Card from './Card'
import Directional from './Directional'
import { dataFetchProps } from '@/types/interfaces'
import { handleDirectionChange } from './carousel.utils'

interface CarouselProps {
  directionData: {
    direction: number
    dataFetch: dataFetchProps
    setDirection: React.Dispatch<React.SetStateAction<number>>
  }
  loading: boolean
}

function Carousel({ directionData, loading }: CarouselProps) {
  return (
    <div className="relative flex h-full w-full items-start justify-start gap-x-6 overflow-x-hidden">
      <Directional
        onClick={() =>
          handleDirectionChange(
            -1,
            directionData.direction,
            directionData.dataFetch.totalItems,
            directionData.setDirection,
          )
        }
        dataLength={directionData.dataFetch.totalItems}
      />
      {!loading ? (
        directionData.dataFetch.items.map((element, index) => (
          <Card source={element} key={`${index}`} />
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center border-red-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        </div>
      )}
      <Directional
        left={false}
        onClick={() =>
          handleDirectionChange(
            1,
            directionData.direction,
            directionData.dataFetch.totalItems,
            directionData.setDirection,
          )
        }
        dataLength={directionData.dataFetch.totalItems}
      />
    </div>
  )
}

export default Carousel
