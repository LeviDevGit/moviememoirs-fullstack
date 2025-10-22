'use client'

import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import { useContext, useRef, useState } from 'react'
import Carousel from '@/components/features/carousel'
import { GlobalContext } from '@/providers/global'
// import useDropdown from '@/hooks/useDropdown'
import Overlay from '@/components/shared/Overlay'
import Select from '@/components/ui/Select'

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

  const [direction, setDirection] = useState(0)

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const {
    toggleModalList,
    setToggleModalList,
    updater,
    setUpdater,
    filterContent,
    setFilterContent,
  } = context
  const updaterState = { updater, setUpdater }

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

  const dropdown = useRef<HTMLDivElement | null>(null)

  const filterData = {
    dropdown,
    filterContent,
    setFilterContent,
  }

  // useDropdown({ toggleModalList, dropdown, setToggleModalList })

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      {/* <Header /> */}
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
      <Overlay
        setToggleModal={setToggleModalList}
        toggleModal={toggleModalList}
        updaterState={updaterState}
        filterData={filterData}
      />
    </div>
  )
}
