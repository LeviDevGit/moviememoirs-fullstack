import MovieCard from '@/components/MovieCard'
import NavigationButton from '@/components/NavigationButton'
import SearchInput from '@/components/SearchInput'
import { readMovie } from '@/services/queries'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default async function Home() {
  const movies = await readMovie()

  return (
    <div className="flex h-full w-full flex-col items-center justify-between p-10">
      <header className="flex w-full justify-between border border-red-500">
        <SearchInput />
        <div className="flex gap-4 text-white">
          {/* <button onClick={createMovie}>Create</button>
          <button onClick={updateMovie}>Update</button>
          <button onClick={readMovie}>Read</button>
          <button onClick={deleteMovie}>Delete</button> */}
        </div>
      </header>
      <main className="w-full border border-red-500 py-4">
        <div className="relative flex w-full items-center justify-center gap-x-16 overflow-x-hidden py-4">
          <NavigationButton>
            <ChevronLeft
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </NavigationButton>
          {movies.map((element, index) => (
            <MovieCard source={element} key={`${index}`} />
          ))}
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
