'use client'

import { Modal, Options, Search } from '@/components'
import DropdownFilter from '@/components/filter/DropdownFilter'
import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import { useState } from 'react'
import Gallery from '@/components/carousel'
import Form from '@/components/form'
import Dashboard from '@/components/dashboard'
import Detail from '@/components/detail'

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
  const [dataFetch, setDataFetch] = useState<dataFetchProps>([])
  const [direction, setDirection] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  // 0: Form, 1: Managment, 2: Filter
  const [toggleModal, setToggleModal] = useState([false, false, false])
  // Especial 3: Detail
  const [toggleDetail, setToggleDetail] = useState<number | undefined>()
  const [filterContent, setFilterContent] =
    useState<FilterContent>(initialFilterContent)

  // State updater
  const [updater, setUpdater] = useState<boolean>(false)
  const updaterState = { updater, setUpdater }

  const [takeLimit, setTakeLimit] = useState(6)

  // Central hook: setup data
  useSubmitData({
    direction,
    filterContent,
    setDataFetch,
    updater,
    setTotalItems,
    takeLimit,
  })

  const handleDirectionChange = (operation: number) => {
    let newStart = direction + operation

    if (newStart < 0) {
      if (newStart === -1) {
        newStart = totalItems - 2
      } else {
        newStart = totalItems - 1
      }
    }

    // Se ultrapassar o último índice, volta para 0
    if (newStart >= totalItems) {
      newStart = 0
    }

    setDirection(newStart)
  }

  const takeLimitState = { takeLimit, setTakeLimit }

  return (
    <div className="relative flex h-full w-full flex-col items-center gap-8 p-10">
      {toggleModal[0] ? (
        <Modal set={setToggleModal} index={0}>
          <Form updaterState={updaterState} setToggleModal={setToggleModal} />
        </Modal>
      ) : toggleModal[1] ? (
        <Modal set={setToggleModal} index={1}>
          <Dashboard updaterState={updaterState} />
        </Modal>
      ) : (
        toggleDetail && (
          <Modal set={setToggleDetail} index={undefined}>
            <Detail id={toggleDetail} />
          </Modal>
        )
      )}
      <header className="flex w-full items-center justify-between">
        <div className="flex h-[45px] items-center gap-1">
          <Search request={setFilterContent} />
          <DropdownFilter
            toggleDropdown={setToggleModal}
            isOpen={toggleModal}
            request={setFilterContent}
          />
        </div>
        <Options openIt={setToggleModal} />
      </header>
      <main className="w-full">
        <Gallery
          handleDirectionChange={handleDirectionChange}
          dataFetch={dataFetch}
          setToggleDetail={setToggleDetail}
          takeLimitState={takeLimitState}
        />
      </main>
    </div>
  )
}
