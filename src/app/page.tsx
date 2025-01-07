'use client'

import { Modal, Options, Search } from '@/components'
import ModalDashboard from '@/components/dashboard/ModalDashboard'
import DropdownFilter from '@/components/filter/DropdownFilter'
import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import AddForm from '@/components/form'
import { useState } from 'react'
import Gallery from '@/components/carousel'

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
  const [direction, setDirection] = useState({ start: -6, end: 12 })
  // 0: Form, 1: Managment, 2: Filter
  const [toggleModal, setToggleModal] = useState([false, false, false])
  const [filterContent, setFilterContent] =
    useState<FilterContent>(initialFilterContent)

  // State updater
  const [updater, setUpdater] = useState<boolean>(false)

  const updaterState = { updater, setUpdater }

  // Central hook: setup data
  useSubmitData({ direction, filterContent, setDataFetch, updater })

  const handleDirectionChange = (operation: number) => {
    setDirection({
      start: direction.start + operation,
      end: direction.end + operation,
    })
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center gap-8 p-10">
      {toggleModal[0] ? (
        <Modal set={setToggleModal} index={0}>
          <AddForm updaterState={updaterState} />
        </Modal>
      ) : (
        toggleModal[1] && (
          <Modal set={setToggleModal} index={1}>
            <ModalDashboard updaterState={updaterState} />
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
      <main className="w-full pt-4">
        <Gallery
          handleDirectionChange={handleDirectionChange}
          dataFetch={dataFetch}
        />
      </main>
    </div>
  )
}
