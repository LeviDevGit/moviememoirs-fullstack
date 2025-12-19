'use client'

import { use, useEffect, useState } from 'react'
import retrieveExtraSectionById from '@/lib/api/ExtraSection/retrieve'
import updateMediaByData from '@/lib/api/Media/update'
import { notFound } from 'next/navigation'
import dispatchDetail, { DetailResponse } from '@/utils/dispatchDetail'
import useExtraSection from '@/components/features/detail/extra-info/useExtraSection'
import Spinner from '@/components/ui/Spinner'
import MediaBanner from '@/components/features/detail/media-image/MediaBanner'
import MediaPoster from '@/components/features/detail/media-image/MediaPoster'
import MediaInfo from '@/components/features/detail/extra-info/MediaInfo'
import EditBar from '@/components/features/detail/edit-mode/EditBar'
interface PageProps {
  params: Promise<{ id: string }>
}

function Page({ params }: PageProps) {
  const [data, setData] = useState<DetailResponse>()

  const { id } = use(params)

  useEffect(() => {
    dispatchDetail(id, setData)
  }, [id])

  const [, setExtraSectionData] = useState([])

  useExtraSection({
    data,
    setExtraSectionData,
    retrieveExtraSectionById,
  })

  const [editMode, setEditMode] = useState(false)

  if (!data)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-[50px]"></div>
        <Spinner />
      </div>
    )

  if ('error' in data) {
    return notFound()
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <MediaBanner />
      <div className="relative -mt-16 flex justify-center gap-20">
        <form
          id="detail-form"
          onSubmit={(e) => {
            e.preventDefault()
            if (editMode) {
              updateMediaByData(e, Number(id))
            }
            setEditMode((prev) => !prev)
          }}
        >
          <MediaPoster
            data={data}
            editMode={editMode}
            setEditMode={setEditMode}
            id={id}
          />
        </form>
        <MediaInfo data={data} editMode={editMode} id={id} />
      </div>
      {editMode && (
        <EditBar id={id} mediaName={data.name} setEditMode={setEditMode} />
      )}
    </div>
  )
}

export default Page
