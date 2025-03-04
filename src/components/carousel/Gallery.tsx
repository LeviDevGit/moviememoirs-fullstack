import { dataFetchProps } from '@/types/interfaces'
import { Card, Directional } from '@/components/carousel'
import { useEffect, useRef } from 'react'

type takeLimitStateProps = {
  takeLimit: number
  setTakeLimit: React.Dispatch<React.SetStateAction<number>>
}

interface GalleryProps {
  handleDirectionChange: (operation: number) => void
  dataFetch: dataFetchProps
  setToggleDetail: React.Dispatch<React.SetStateAction<number | undefined>>
  takeLimitState: takeLimitStateProps
}

function Gallery({
  handleDirectionChange,
  dataFetch,
  setToggleDetail,
  takeLimitState,
}: GalleryProps) {
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
        onClick={() => handleDirectionChange(-1)}
        dataLength={dataFetch.length}
        limit={takeLimitState.takeLimit}
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
        limit={takeLimitState.takeLimit}
      />
    </div>
  )
}

export default Gallery
