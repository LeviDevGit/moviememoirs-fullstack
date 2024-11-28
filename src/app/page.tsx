'use client'

import MovieCard from '@/components/MovieCard'
import NavigationButton from '@/components/NavigationButton'
import SearchInput from '@/components/SearchInput'
import { dataFetchProps } from '@/types/interfaces'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [dataFetch, setDataFetch] = useState<dataFetchProps>([])
  const [direction, setDirection] = useState({ start: 0, end: 6 })

  useEffect(() => {
    const submitData = async () => {
      try {
        const response = await fetch(`/api/read`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()

        const finalArray = []

        for (let index = direction.start; index < direction.end; index++) {
          const adjustedIndex =
            ((index % data.length) + data.length) % data.length
          finalArray.push(data[adjustedIndex])
        }

        setDataFetch(finalArray)
      } catch (error) {
        console.error(error)
      }
    }
    submitData()
  }, [direction])

  const handleDirectionChange = (operation: number) => {
    setDirection({
      start: direction.start + operation,
      end: direction.end + operation,
    })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between p-10">
      <header className="flex w-full justify-between border border-red-500">
        <SearchInput />
        <div className="flex gap-4 text-white">
          <button>Adicionar</button>
          <button>Gerenciar</button>
        </div>
      </header>
      <main className="w-full border border-red-500 py-4">
        <div className="relative flex w-full items-center justify-center gap-x-16 overflow-x-hidden py-4">
          <NavigationButton onClick={() => handleDirectionChange(-1)}>
            <ChevronLeft
              size={64}
              absoluteStrokeWidth
              className="group-transition-transform text-[#ffffff80] group-hover:scale-110 group-hover:text-[#ffffffCC]"
            />
          </NavigationButton>
          {dataFetch?.length > 1 &&
            dataFetch &&
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
