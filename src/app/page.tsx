'use client'

import { Options, Search } from '@/components'
import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import { useContext, useRef, useState } from 'react'
import Carousel from '@/components/carousel'
import Overlay from '@/components/Overlay'
import { GlobalContext } from '@/providers/global'
import { FilterIcon } from 'lucide-react'
import { toggleModal } from '@/utils/toggleModal'
import useDropdown from '@/hooks/useDropdown'
import { FilterDropdown } from '@/components/FilterDropdown'

export interface FilterContent {
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

  const { toggleModalList, setToggleModalList, updater, setUpdater } = context
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

  const dropdown = useRef<HTMLDivElement | null>(null)

  useDropdown({ toggleModalList, dropdown, setToggleModalList })

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex h-full max-h-[650px] w-full flex-col items-center justify-between px-4">
        <header className="flex h-[45px] w-full items-center justify-between gap-1">
          <div className="flex h-full items-center gap-1">
            <Search request={setFilterContent} />
            <div className="relative h-full text-sm">
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  toggleModal({
                    index: 1,
                    set: setToggleModalList,
                    toggler: !toggleModalList[1],
                  })
                }}
                className="h-full rounded-lg px-4 text-text-200 hover:text-text-50"
              >
                <FilterIcon />
              </button>
              {toggleModalList[1] && (
                <FilterDropdown
                  dropdown={dropdown}
                  filterContent={filterContent}
                  request={setFilterContent}
                />
              )}
            </div>
          </div>
          <Options openIt={setToggleModalList} />
        </header>
        <main className="h-[520px] w-full">
          <Carousel directionData={directionData} loading={loading} />
        </main>
        <Overlay
          setToggleModal={setToggleModalList}
          toggleModal={toggleModalList}
          updaterState={updaterState}
        />
      </div>
    </div>
  )
}
