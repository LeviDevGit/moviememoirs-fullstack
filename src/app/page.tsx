import MovieCard from '@/components/MovieCard'
import NavigationButton from '@/components/NavigationButton'
import SearchInput from '@/components/SearchInput'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between p-10">
      <header className="flex w-full justify-between border border-red-500">
        <SearchInput />
        <div className="flex gap-4 text-white">
          <button>Adicionar</button>
          <button>Gerenciar</button>
        </div>
      </header>
      <main className="w-full border border-red-500 py-4">
        <div className="relative flex w-full items-center justify-center gap-x-16 overflow-x-hidden">
          <NavigationButton>
            <ChevronLeft
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </NavigationButton>
          <MovieCard source={{ value: 5 }} />
          <MovieCard source={{ value: 5 }} />
          <MovieCard source={{ value: 5 }} />
          <MovieCard source={{ value: 5 }} />
          <MovieCard source={{ value: 5 }} />
          <MovieCard source={{ value: 5 }} />
          <NavigationButton left={false}>
            <ChevronRight
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </NavigationButton>
        </div>
      </main>
    </div>
  )
}
