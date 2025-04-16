'use client'

import { Options, Search } from '@/components'
import { dataFetchProps } from '@/types/interfaces'
import useSubmitData from '@/hooks/useSubmitData'
import { useContext, useState } from 'react'
import Carousel from '@/components/carousel'
import Filter from '@/components/filter'
import Overlay from '@/components/Overlay'
import { Toaster } from 'react-hot-toast'
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
  // 0: Form, 1: Managment, 2: Filter
  // const [toggleModal, setToggleModal] = useState([false, false, false])

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { toggleModal, setToggleModal } = context

  const [filterContent, setFilterContent] =
    useState<FilterContent>(initialFilterContent)

  // State updater
  const [updater, setUpdater] = useState<boolean>(false)
  const updaterState = { updater, setUpdater }

  const [takeLimit, setTakeLimit] = useState(6)

  const [loading, setLoading] = useState(false)

  // Central hook: setup data
  useSubmitData({
    direction,
    filterContent,
    setDataFetch,
    updater,
    takeLimit,
    setLoading,
  })

  const directionData = {
    direction,
    dataFetch,
    setDirection,
  }

  const takeLimitState = { takeLimit, setTakeLimit }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#18181B]">
      <div className="flex h-full max-h-[650px] w-full max-w-[1300px] flex-col items-center justify-between">
        <header className="flex h-[45px] w-full items-center justify-between gap-1">
          <div className="flex h-[45px] items-center gap-1">
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
          <Carousel
            directionData={directionData}
            takeLimitState={takeLimitState}
            loading={loading}
          />
        </main>
        <footer className="w-full">
          <p className="text-center text-white">
            {dataFetch.totalItems}{' '}
            {dataFetch.totalItems > 1 ? 'Mídias' : 'Mídia'}
          </p>
        </footer>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Overlay
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
          updaterState={updaterState}
        />
      </div>
    </div>
  )
}
