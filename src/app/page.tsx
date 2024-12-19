'use client'

import {
  DirectionalButton,
  DropdownFilter,
  MovieCard,
  OptionsButton,
  SearchInput,
} from '@/components'
import { Modal } from '@/components/Modal'
import useSubmitData from '@/hooks/useSubmitData'
import { dataFetchProps } from '@/types/interfaces'
import { useState } from 'react'

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
    <div className="relative flex h-full w-full flex-col items-center justify-around p-10">
      {toggleModal[0] && (
        <Modal.Root>
          <Modal.Form updaterState={updaterState}>
            <Modal.Footer closeIndex={0} closeSet={setToggleModal} />
          </Modal.Form>
        </Modal.Root>
      )}
      {toggleModal[1] && (
        <Modal.Root>
          <Modal.Dashboard updaterState={updaterState}>
            <Modal.Footer closeIndex={1} closeSet={setToggleModal} />
          </Modal.Dashboard>
        </Modal.Root>
      )}
      <header className="flex w-full items-center justify-between">
        <div className="flex h-[45px] items-center gap-1">
          <SearchInput request={setFilterContent} />
          <DropdownFilter
            toggleDropdown={setToggleModal}
            isOpen={toggleModal}
            request={setFilterContent}
          />
        </div>
        <OptionsButton openIt={setToggleModal} />
      </header>
      <main className="w-full py-4">
        <div className="relative flex w-full items-center justify-center gap-x-12 overflow-x-hidden py-4">
          <DirectionalButton
            onClick={() => handleDirectionChange(-1)}
            dataLength={dataFetch.length}
          />
          {dataFetch[0] !== undefined &&
            dataFetch.map((element, index) => (
              <MovieCard source={element} key={`${index}`} />
            ))}
          <DirectionalButton
            left={false}
            onClick={() => handleDirectionChange(1)}
            dataLength={dataFetch.length}
          />
        </div>
      </main>
    </div>
  )
}
