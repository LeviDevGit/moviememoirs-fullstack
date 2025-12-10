'use client'

import Card from './Card'
import Directional from './Directional'
import { dataFetchProps } from '@/shared/types/interfaces'
import Spinner from '@/shared/ui/Spinner'
import { useContext, useState } from 'react'
import { GlobalContext } from '@/providers/global'
import { useRestoreFilters } from '@/shared/hooks/useRestoreFIlters'
import useSubmitData from '@/shared/hooks/useSubmitData'
import { handleDirectionChange } from '../utils/carousel.util'

function Carousel() {
  const [dataFetch, setDataFetch] = useState<dataFetchProps>({
    items: [],
    totalItems: 0,
  })

  useRestoreFilters()

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { updater, filterContent, direction, setDirection } = context

  const [loading, setLoading] = useState(false)

  useSubmitData({
    direction,
    filterContent,
    setDataFetch,
    updater,
    setLoading,
    setDirection,
  })

  return (
    <div className="relative flex w-full flex-col overflow-x-hidden">
      <div className="relative h-full w-full">
        <div className="absolute left-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent" />
        <div className="flex h-[550px] w-full items-center justify-center from-background to-transparent">
          {dataFetch.items.length === 0 ? (
            <Spinner />
          ) : !loading ? (
            <div className="-ml-48 flex items-start justify-start gap-x-6 overflow-x-hidden">
              {dataFetch.items.map((element) => (
                <Card source={element} key={element.id} />
              ))}
            </div>
          ) : (
            <div className="-ml-48 flex items-start justify-start gap-x-6 overflow-x-hidden">
              {dataFetch.items.map((element) => (
                <Card source={element} key={element.id} />
              ))}
            </div>
          )}
        </div>
        <div className="absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent" />
      </div>
      <div className="mx-4 mt-6 flex items-center justify-between">
        <Directional
          onClick={() =>
            handleDirectionChange(
              -1,
              direction,
              dataFetch.totalItems,
              setDirection,
            )
          }
          dataLength={dataFetch.totalItems}
        />
        <Directional
          left={false}
          onClick={() =>
            handleDirectionChange(
              1,
              direction,
              dataFetch.totalItems,
              setDirection,
            )
          }
          dataLength={dataFetch.totalItems}
        />
      </div>
    </div>
  )
}

export default Carousel
