'use client'

import PaginationView from '@/api/View/pagination'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export interface Category {
  id: number
  name: string
  proportion: string
}

export interface Media {
  id: number
  name: string
  year: string
  categoryId: number
  creator: string
  img: string
  time: string
  value: number
  category: Category
}

export interface ActivityItem {
  id: number
  date: string
  commentary: string
  mediaId: number
  rating: number
  media: Media
}

function RecentActivityItem() {
  const [paginationData, setPaginationData] = useState<ActivityItem[] | null>(
    null,
  )

  useEffect(() => {
    function fetchData() {
      PaginationView({ size: 3, order: 'desc' }).then((data) => {
        setPaginationData(data)
      })
    }
    fetchData()
  }, [])

  return (
    <div className="mb-5 flex flex-col gap-4">
      {paginationData ? (
        paginationData.map((item) => (
          <div
            className="flex flex-shrink-0 items-center gap-4 rounded-lg bg-card p-4"
            key={item.id}
          >
            <Image
              src={item.media.img}
              alt={item.media.name}
              width={120}
              height={210}
              className="h-auto w-auto rounded-lg bg-contain bg-center"
              priority
            />
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-medium">{item.media.name}</h2>
              <span className="text-[#9CA3AF]">{item.media.category.name}</span>
              <div className="flex gap-2">
                <StarIcon color="#facc15" />
                <span className="text-yellow-400">{item.rating}/5</span>
              </div>
              <span className="text-[#9CA3AF]">
                {new Date(item.date).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <p className="line-clamp-2 max-w-[800px]">{item.commentary}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default RecentActivityItem
