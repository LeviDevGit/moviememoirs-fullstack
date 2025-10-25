'use client'

import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import { useContext, useState } from 'react'
import Carousel from '@/app/_components/carousel'
import { GlobalContext } from '@/providers/global'
import Select from '@/components/ui/Select'
import { useRestoreFilters } from '@/hooks/useRestoreFIlters'

export interface FilterContent {
  searchString: string
  directorString: string | undefined
  yearString: string | undefined
  valueString: string | undefined
}

export default function Home() {
  const [dataFetch, setDataFetch] = useState<dataFetchProps>({
    items: [],
    totalItems: 0,
  })

  useRestoreFilters()

  const [direction, setDirection] = useState(0)

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { updater, filterContent } = context

  const [loading, setLoading] = useState(false)

  // Central hook: setup data
  useSubmitData({
    direction,
    filterContent,
    setDataFetch,
    updater,
    setLoading,
  })

  const directionData = {
    direction,
    dataFetch,
    setDirection,
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex h-full w-full flex-col items-center justify-start gap-6">
        <div className="flex h-[100px] w-full items-center justify-between px-4">
          <Select>
            <option value="all">Todos</option>
            <option value="movie">Filmes</option>
          </Select>
          <Select>
            <option value="recent">Adicionado recentemente</option>
          </Select>
        </div>
        <div className="flex h-fit w-full items-center">
          <Carousel directionData={directionData} loading={loading} />
        </div>
      </div>
    </div>
  )
}
