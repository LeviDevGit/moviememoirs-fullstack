interface ConfirmProps {
  deleteData: (movieId: number, movieImagePath: string) => Promise<void>
  safetyButton: [number, string]
  setSafetyButton: (
    value: React.SetStateAction<[number, string] | undefined>,
  ) => void
}

function Confirm({ deleteData, safetyButton, setSafetyButton }: ConfirmProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70">
      <div className="flex w-[300px] flex-col gap-4 bg-white p-5">
        <h1 className="text-center">Tem certeza disso?</h1>
        <div className="flex items-center justify-between">
          <button
            className="border border-black text-green-500"
            onClick={() => {
              deleteData(safetyButton[0], safetyButton[1])
              setSafetyButton(undefined)
            }}
          >
            Sim, deletar
          </button>
          <button
            className="border border-black text-red-500"
            onClick={() => {
              setSafetyButton(undefined)
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirm
