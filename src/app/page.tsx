'use client'

import { Options, Search } from '@/components'
import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import { useContext, useState } from 'react'
import Carousel from '@/components/carousel'
import Filter from '@/components/filter'
import Overlay from '@/components/Overlay'
import { GlobalContext } from '@/providers/global'

interface FilterContent {
  searchString: string
  directorString: string | undefined
  yearString: string | undefined
  valueString: string | undefined
}

const initialFilterContent: FilterContent = {
  searchString: '',
  directorString: undefined,
  yearString: undefined,
  valueString: undefined,
}

export default function Home() {
  const [dataFetch, setDataFetch] = useState<dataFetchProps>({
    items: [],
    totalItems: 0,
  })

  const [direction, setDirection] = useState(0)

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { toggleModal, setToggleModal, updater, setUpdater } = context
  const updaterState = { updater, setUpdater }

  const [filterContent, setFilterContent] =
    useState<FilterContent>(initialFilterContent)

  // // State updater
  // const [updater, setUpdater] = useState<boolean>(false)
  // const updaterState = { updater, setUpdater }

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
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex h-full max-h-[650px] w-full flex-col items-center justify-between px-4">
        <header className="flex h-[45px] w-full items-center justify-between gap-1 border border-red-500">
          <div className="flex h-full items-center gap-1">
            <Search request={setFilterContent} />
            <Filter
              toggleDropdown={setToggleModal}
              isOpen={toggleModal}
              request={setFilterContent}
            />
          </div>
          <Options openIt={setToggleModal} />
        </header>
        <main className="h-[520px] w-full">
          <Carousel directionData={directionData} loading={loading} />
        </main>
        <Overlay
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
          updaterState={updaterState}
        />
      </div>
    </div>
  )
}
