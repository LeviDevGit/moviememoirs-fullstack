import { Calendar, Textarea } from '@/components/form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface VisualizationProps {
  data: {
    id: number
    date: Date
    commentary: string | null
    movieId: number
  }[]
}

function Visualization({ data }: VisualizationProps) {
  const [adition, setAdition] = useState(false)

  return (
    <div className="border border-red-500 bg-[#18181B] p-2">
      <div className="flex flex-col">
        <button
          className={`self-end ${adition ? 'hidden' : 'block'}`}
          onClick={() => {
            setAdition(true)
          }}
          type="button"
        >
          <Plus />
        </button>
        {adition && (
          <div className="flex items-center justify-between gap-6">
            <Calendar />
            <div className="w-1/2">
              <Textarea />
            </div>
          </div>
        )}
        <div className="flex h-[140px] flex-col overflow-y-auto">
          {data.map((e) => (
            <div
              key={`${e.id}`}
              className="flex w-full items-center justify-between gap-6"
            >
              <Calendar custom={new Date(e.date).toISOString().slice(0, 10)} />
              <div className="w-1/2">
                <Textarea custom={e.commentary} disabled />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Visualization
