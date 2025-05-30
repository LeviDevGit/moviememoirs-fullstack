import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginatorProps {
  handlePage: (next?: boolean) => void
  page: number
  counter: number | undefined
}

function Paginator({ handlePage, page, counter }: PaginatorProps) {
  return (
    <div className="mt-1 flex w-fit max-w-[268px] items-center justify-between rounded-lg bg-[#3e3e42] p-2 text-xs">
      <div className="flex gap-4">
        <button
          onClick={() => {
            handlePage()
          }}
          disabled={page === 1}
        >
          <ChevronLeft className="h-[1em] w-[1em]" />
        </button>
        <div
          className={`flex cursor-default gap-2 ${counter && counter < 6 ? 'max-w-[196px]' : 'w-[196px]'}`}
        >
          {counter &&
            Array.from({ length: counter }).map((_, index) =>
              page === index + 1 ||
              (index <= page && index + 3 >= page) ||
              (index >= page &&
                index - (page === 1 ? 3 : page === 2 ? 2 : 1) <= page) ? (
                <div
                  key={`${index}`}
                  className={`h-[20px] w-[20px] ${index + 1 === page && 'bg-blue-500'} flex items-center justify-center rounded-full`}
                >
                  <h2>{index + 1}</h2>
                </div>
              ) : (
                index + 1 === counter &&
                page + 3 !== counter && (
                  <div
                    key={`${index}`}
                    className="flex items-center justify-center gap-4 rounded-full text-center"
                  >
                    <div className="w-[20px]">
                      <h2>...</h2>
                    </div>
                    <div className="w-[20px]">
                      <h2>{index + 1}</h2>
                    </div>
                  </div>
                )
              ),
            )}
        </div>
        <button
          onClick={() => {
            handlePage(true)
          }}
          disabled={page === counter}
        >
          <ChevronRight className="h-[1em] w-[1em]" />
        </button>
      </div>
    </div>
  )
}

export default Paginator
