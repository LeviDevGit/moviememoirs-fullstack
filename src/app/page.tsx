import Carousel from '@/components/features/home/carousel/Carousel'
import FilterBar from '@/components/features/home/filters/FilterBar'

export interface FilterContent {
  filter: string
  directorString: string | undefined
  yearString: string | undefined
  valueString: string | undefined
}

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex h-full w-full flex-col items-center justify-start gap-6">
        <FilterBar />
        <div className="flex h-fit w-full items-center">
          <Carousel />
        </div>
      </div>
    </div>
  )
}
