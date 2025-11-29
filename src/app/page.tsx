import Select from '@/shared/ui/Select'
import Carousel from '@/features/home/carousel/components/Carousel'

export interface FilterContent {
  searchString: string
  directorString: string | undefined
  yearString: string | undefined
  valueString: string | undefined
}

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex h-full w-full flex-col items-center justify-start gap-6">
        <div className="flex h-[100px] w-full items-center justify-between px-4">
          <Select>
            <option value="all">Todos</option>
            <option value="movie">Filmes</option>
          </Select>
          <Select>
            <option value="recent">Adicionado recentemente</option>
          </Select>
        </div>
        <div className="flex h-fit w-full items-center">
          <Carousel />
        </div>
      </div>
    </div>
  )
}
