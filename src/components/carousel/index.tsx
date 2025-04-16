import Card from './Card'
import Directional from './Directional'
import { dataFetchProps } from '@/types/interfaces'
import { useEffect, useRef } from 'react'
import { handleDirectionChange } from './carousel.utils'

interface CarouselProps {
  directionData: {
    direction: number
    dataFetch: dataFetchProps
    setDirection: React.Dispatch<React.SetStateAction<number>>
  }
  takeLimitState: {
    takeLimit: number
    setTakeLimit: React.Dispatch<React.SetStateAction<number>>
  }
  loading: boolean
}

function Carousel({ directionData, takeLimitState, loading }: CarouselProps) {
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateColumns = () => {
      if (componentRef.current) {
        const width = componentRef.current.offsetWidth
        console.log(width, width < 600)
        takeLimitState.setTakeLimit(width < 600 ? 3 : 6)
      }
    }
    // Chama a função no início para configurar o valor correto
    updateColumns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={componentRef}
      className="relative flex h-full w-full items-start justify-center gap-x-6 overflow-x-hidden"
    >
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
        limit={takeLimitState.takeLimit}
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
        limit={takeLimitState.takeLimit}
      />
    </div>
  )
}

export default Carousel
