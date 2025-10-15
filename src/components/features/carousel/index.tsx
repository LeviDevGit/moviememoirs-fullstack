import Card from './Card'
import Directional from './Directional'
import { dataFetchProps } from '@/types/interfaces'
import { handleDirectionChange } from './carousel.utils'
import Spinner from '@/components/ui/Spinner'

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
    <div className="relative flex h-[520px] w-full overflow-x-hidden">
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
      <div className="flex w-full items-center justify-center">
        {!loading ? (
          <div className="-ml-48 flex items-start justify-start gap-x-6 overflow-x-hidden">
            {directionData.dataFetch.items.map((element, index) => (
              <Card source={element} key={`${index}`} />
            ))}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
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
