import Carousel from '@/components/features/home/carousel/Carousel'

export interface FilterContent {
  filter: string
  directorString: string | undefined
  yearString: string | undefined
  valueString: string | undefined
}

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="h-[100px]" />
      <div className="flex h-full w-full flex-col items-center justify-start gap-6">
        <div className="flex h-fit w-full items-center">
          <Carousel />
        </div>
      </div>
    </div>
  )
}
