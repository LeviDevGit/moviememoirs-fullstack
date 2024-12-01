'use client'

import {
  DirectionalButton,
  MovieCard,
  OptionsButton,
  SearchInput,
  SwitchButton,
} from '@/components'
import { Modal } from '@/components/Modal'
import useSubmitData from '@/hooks/useSubmitData'
import { dataFetchProps } from '@/types/interfaces'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [dataFetch, setDataFetch] = useState<dataFetchProps>([])
  const [direction, setDirection] = useState({ start: -6, end: 12 })
  const [toggleModal, setToggleModal] = useState(false)

  const [reqBody, setReqBody] = useState('')

  useSubmitData({ direction, reqBody, setDataFetch })

  const handleDirectionChange = (operation: number) => {
    setDirection({
      start: direction.start + operation,
      end: direction.end + operation,
    })
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between p-10">
      {toggleModal && (
        <Modal.Root closeIt={setToggleModal}>
          <h1>Teste</h1>
        </Modal.Root>
      )}
      <header className="flex w-full justify-between">
        <OptionsButton openIt={setToggleModal} />
        <SwitchButton />
        <div className="flex">
          <select name="" id="" className="flex">
            <option value="">Dropdown</option>
          </select>
          <div className="text-center text-white">
            <SearchInput request={setReqBody} />
            <h2>Filter/Search List Input</h2>
          </div>
        </div>
      </header>
      <main className="w-full py-4">
        <div className="relative flex w-full items-center justify-center gap-x-12 overflow-x-hidden py-4">
          <DirectionalButton onClick={() => handleDirectionChange(-1)}>
            <ChevronLeft
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </DirectionalButton>
          {dataFetch[0] !== undefined &&
            dataFetch.map((element, index) => (
              <MovieCard source={element} key={`${index}`} />
            ))}
          <DirectionalButton
            left={false}
            onClick={() => handleDirectionChange(1)}
          >
            <ChevronRight
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </DirectionalButton>
        </div>
      </main>
    </div>
  )
}
