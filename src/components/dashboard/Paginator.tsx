import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginatorProps {
  handlePage: (next?: boolean) => void
  page: number
}

function Paginator({ handlePage, page }: PaginatorProps) {
  return (
    <div className="flex w-full items-center justify-between text-xs">
      <div className="flex gap-4">
        <button
          onClick={() => {
            handlePage()
          }}
          disabled={page === 1}
        >
          <ChevronLeft className="h-[1em] w-[1em]" />
        </button>
        <h2>{page}</h2>
        <button
          onClick={() => {
            handlePage(true)
          }}
        >
          <ChevronRight className="h-[1em] w-[1em]" />
        </button>
      </div>
    </div>
  )
}

export default Paginator
