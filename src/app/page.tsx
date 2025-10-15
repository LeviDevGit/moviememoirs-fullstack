'use client'

import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import { useContext, useRef, useState } from 'react'
import Carousel from '@/components/features/carousel'
import { GlobalContext } from '@/providers/global'
import useDropdown from '@/hooks/useDropdown'
import Overlay from '@/components/shared/Overlay'
import Header from '@/components/shared/Header'
import Select from '@/components/ui/Select'
import RadioGroup from '@/components/ui/RadioGroup'

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
    <div className="relative flex h-full w-full flex-col items-center">
      <Header
        toggleModalList={toggleModalList}
        setToggleModalList={setToggleModalList}
        dropdown={dropdown}
        filterContent={filterContent}
        setFilterContent={setFilterContent}
      />
      <main className="flex h-full w-full flex-col items-center justify-start gap-14">
        <div className="flex h-[100px] w-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <RadioGroup value="Todos" name="categoria">
              Todos
            </RadioGroup>
            <RadioGroup value="Filmes" name="categoria">
              Filmes
            </RadioGroup>
          </div>
          <Select>
            <option value="recent">Adicionado recentemente</option>
          </Select>
        </div>
        <div className="flex h-fit w-full items-center">
          <Carousel directionData={directionData} loading={loading} />
        </div>
      </main>
      <Overlay
        setToggleModal={setToggleModalList}
        toggleModal={toggleModalList}
        updaterState={updaterState}
      />
    </div>
  )
}
