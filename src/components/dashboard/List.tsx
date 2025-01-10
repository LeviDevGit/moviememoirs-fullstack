import { dataFetchProps } from '@/types/interfaces'

interface ListProps {
  data: dataFetchProps
  setSafetyButton: (
    value: React.SetStateAction<[number, string] | undefined>,
  ) => void
}

function List({ data, setSafetyButton }: ListProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-[#3e3e42] p-2">
      <div className="grid w-full auto-cols-auto grid-flow-col justify-between px-2 py-3 font-bold text-white">
        <h2 className="w-[400px]">Nome</h2>
        <h2 className="w-[200px]">Diretor</h2>
        <h2 className="w-[60px]">Ano</h2>
        <h2 className="w-[60px]">Tipo</h2>
        <h2 className="w-[80px]">Visto em</h2>
        <h2 className="w-[80px] text-start"></h2>
      </div>
      <hr className="border-gray-500" />
      {data.map((element, index) => (
        <div
          key={`${index}`}
          className="flex h-[40px] flex-col rounded-xl px-2 py-3 hover:bg-black/10"
        >
          <div className="grid h-fit w-full auto-cols-auto grid-flow-col items-start justify-between text-[#e0e0e0]">
            <p className="w-[400px]">{element.movie.name}</p>
            <h1 className="w-[200px] truncate">{element.movie.direction}</h1>
            <h1 className="w-[60px]">{element.movie.date}</h1>
            <h1 className="w-[60px]">{element.movie.type}</h1>
            <h1 className="w-[80px]">
              {new Date(element.date).toLocaleDateString()}
            </h1>
            <div className="flex w-[80px] justify-end font-semibold text-[#e0e0e0]">
              <button
                className="rounded-lg border border-gray-500 px-2 py-1 text-center hover:bg-black/10"
                onClick={() => {
                  setSafetyButton([element.id, element.movie.img])
                }}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default List
