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
          <input
            type="date"
            name="date"
            className="rounded-xl border border-gray-500 bg-transparent p-2"
            defaultValue={new Date().toISOString().slice(0, 10)}
            max={new Date().toISOString().slice(0, 10)}
          />
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
