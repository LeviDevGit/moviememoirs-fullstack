import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

function Visualization() {
  const [adition, setAdition] = useState(false)

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-fit items-center justify-between">
        <h1 className="text-lg font-medium">Novo comentário</h1>
        <button
          className="self-end"
          onClick={() => {
            setAdition(!adition)
          }}
          type="button"
        >
          {adition ? <Minus /> : <Plus />}
        </button>
      </div>
      {adition && (
        <div className="flex h-full w-full flex-col items-start justify-center gap-2">
          <div className="flex w-full items-center justify-between">
            <input
              type="date"
              name="date"
              className="rounded-xl border border-gray-500 bg-transparent p-2"
              defaultValue={new Date().toISOString().slice(0, 10)}
              max={new Date().toISOString().slice(0, 10)}
            />
            <input
              type="number"
              name="value"
              className="w-[100px] rounded-xl border border-gray-500 bg-transparent p-2 text-center"
              placeholder="Nota"
              min="0"
              max="5"
              step="0.5"
            />
          </div>
          <textarea
            name="commentary"
            placeholder={'Faça um novo comentário'}
            className="h-full w-full resize-none rounded-xl border border-gray-500 bg-transparent p-3 text-base"
          />
        </div>
      )}
    </div>
  )
}

export default Visualization
