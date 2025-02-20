import { PaginatedData } from '@/types/interfaces'

interface ListProps {
  data: PaginatedData[]
  setSafetyButton: (
    value: React.SetStateAction<[number, string] | undefined>,
  ) => void
}

function List({ data, setSafetyButton }: ListProps) {
  return (
    <div className="flex h-[338px] flex-col rounded-lg bg-[#3e3e42]">
      <div className="px-2 pt-2">
        <div className="grid w-full auto-cols-auto grid-flow-col justify-between p-2 pb-3 font-bold text-white">
          <h2 className="w-[400px]">Nome</h2>
          <h2 className="w-[200px]">Diretor</h2>
          <h2 className="w-[60px]">Ano</h2>
          <h2 className="w-[60px]">Tipo</h2>
          <h2 className="w-[80px]">Visto em</h2>
          <h2 className="w-[80px] text-start"></h2>
        </div>
        <hr className="mx-2 border-gray-500" />
      </div>
      <div>
        {data.map((element, index) => (
          <div
            key={`${index}`}
            className="flex cursor-default flex-col items-center justify-center"
          >
            <hr
              className={`w-full border-gray-500/50 ${index + 1 === 1 && 'hidden'}`}
            />
            <div className="mx-1 my-1 grid h-[40px] auto-cols-auto grid-flow-col items-center justify-between rounded-lg px-4 text-[#e0e0e0] hover:bg-black/10">
              <p className="w-[400px] truncate pr-4">{element.movie.name}</p>
              <h1 className="w-[200px] truncate pr-4">
                {element.movie.direction}
              </h1>
              <h1 className="w-[60px]">{element.movie.year}</h1>
              <h1 className="w-[60px]">{element.movie.type}</h1>
              <h1 className="w-[80px]">
                {new Date(element.date).toLocaleDateString()}
              </h1>
              <div className="flex w-[80px] justify-end font-semibold text-[#e0e0e0]">
                <button
                  className="rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
                  onClick={() => {
                    setSafetyButton([element.movieId, element.movie.img])
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
