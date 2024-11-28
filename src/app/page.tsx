'use client'

import MovieCard from '@/components/MovieCard'
import NavigationButton from '@/components/NavigationButton'
import SearchInput from '@/components/SearchInput'
import { dataFetchProps } from '@/types/interfaces'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [dataFetch, setDataFetch] = useState<dataFetchProps>([])
  const [direction, setDirection] = useState({ start: 0, end: 6 })
  const isInitializedRef = useRef(false)

  const [reqBody, setReqBody] = useState('')

  useEffect(() => {
    const submitData = async () => {
      try {
        const response = await fetch(
          `/api/read${reqBody && `?searchString=${reqBody}`}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const data = await response.json()

        console.log(data)

        let modifiedData = data

        if (!isInitializedRef.current) {
          const lastItem = data[data.length - 1]
          modifiedData = [lastItem, ...data.slice(0, data.length - 1)]
          isInitializedRef.current = true
        }

        const finalArray = []

        for (let index = direction.start; index < direction.end; index++) {
          const adjustedIndex =
            ((index % modifiedData.length) + modifiedData.length) %
            modifiedData.length
          finalArray.push(modifiedData[adjustedIndex])
        }

        setDataFetch(finalArray)
      } catch (error) {
        console.error(error)
      }
    }
    submitData()
  }, [direction, isInitializedRef, reqBody])

  const handleDirectionChange = (operation: number) => {
    setDirection({
      start: direction.start + operation,
      end: direction.end + operation,
    })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between p-10">
      <header className="flex w-full justify-between">
        <div className="flex gap-4 border border-red-500 text-white">
          <button>Adicionar</button>
          <button>Gerenciar</button>
        </div>
        <SearchInput request={setReqBody} />
      </header>
      <main className="w-full py-4">
        <div className="relative flex w-full items-center justify-center gap-x-16 overflow-x-hidden py-4">
          <NavigationButton onClick={() => handleDirectionChange(-1)}>
            <ChevronLeft
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </NavigationButton>
          {dataFetch[0] !== undefined &&
            dataFetch.map((element, index) => (
              <MovieCard source={element} key={`${index}`} />
            ))}
          <NavigationButton
            left={false}
            onClick={() => handleDirectionChange(1)}
          >
            <ChevronRight
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </NavigationButton>
        </div>
      </main>
    </div>
  )
}
