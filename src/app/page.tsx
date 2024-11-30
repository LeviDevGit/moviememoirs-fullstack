'use client'

import {
  DirectionalButton,
  MovieCard,
  OptionsButton,
  SearchInput,
} from '@/components'
import { Modal } from '@/components/Modal'
import useSubmitData from '@/hooks/useSubmitData'
import { dataFetchProps } from '@/types/interfaces'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

export default function Home() {
  const [dataFetch, setDataFetch] = useState<dataFetchProps>([])
  const [direction, setDirection] = useState({ start: -6, end: 12 })
  const isInitializedRef = useRef(false)

  const [reqBody, setReqBody] = useState('')

  useSubmitData({ direction, isInitializedRef, reqBody, setDataFetch })

  const handleDirectionChange = (operation: number) => {
    setDirection({
      start: direction.start + operation,
      end: direction.end + operation,
    })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between p-10">
      <Modal.Root>
        <h1>Teste</h1>
      </Modal.Root>
      <header className="flex w-full justify-between">
        <OptionsButton />
        <SearchInput request={setReqBody} />
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
