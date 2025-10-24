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
    <div className="relative flex w-full flex-col overflow-x-hidden">
      <div className="relative h-full w-full">
        <div className="absolute left-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent" />
        <div className="flex h-[550px] w-full items-center justify-center from-background to-transparent">
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
        <div className="absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent" />
      </div>
      <div className="mx-4 mt-6 flex items-center justify-between">
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
    </div>
  )
}

export default Carousel
