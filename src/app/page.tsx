import MovieCard from '@/components/MovieCard'
import SearchInput from '@/components/SearchInput'

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
      <main className="w-full border border-red-500">
        <div className="flex w-full items-center justify-center">
          <MovieCard source={{ value: 5 }} />
        </div>
      </main>
    </div>
  )
}
