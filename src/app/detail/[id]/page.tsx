/* eslint-disable @next/next/no-img-element */
'use client'

import { use, useEffect, useState } from 'react'
import dispatchDetail, {
  DetailResponse,
  MediaView,
} from '@/shared/utils/dispatchDetail'
import retrieveExtraSectionById from '@/lib/api/ExtraSection/retrieve'
import Spinner from '@/shared/ui/Spinner'
import updateMediaByData from '@/lib/api/Media/update'
import { notFound } from 'next/navigation'
import MediaPoster from '@/features/detail/media-poster/components/MediaPoster'
import MediaInfo from '@/features/detail/extra-info/components/MediaInfo'
import { Modal } from '@/shared/ui/Modal'
import DeleteConfirmModal from '@/features/detail/modals/components/DeleteConfirmModal'
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

  useEffect(() => {
    if (!data || 'error' in data) return

    async function fetchData(id: number) {
      const result = await retrieveExtraSectionById(id)
      if ('error' in result) {
        setExtraSectionData([])
      } else {
        setExtraSectionData(result)
      }
    }

    if (data) {
      fetchData(data.categoryId)
    }
  }, [data])

  const [editMode, setEditMode] = useState(false)

  const [modalView, setModalView] = useState<MediaView | undefined>(undefined)

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
      <div className="relative h-[350px] w-[1000px] overflow-hidden">
        <div className="flex">
          <img
            src="https://image.tmdb.org/t/p/original/gqTz24ZRsCP6AKjARmEivY7m0cK.jpg"
            alt="Banner"
            className="absolute inset-0 h-full w-full rounded-[10%] object-cover"
          />
          <div className="absolute h-full w-full bg-gradient-to-r from-background to-transparent to-[20%]"></div>
          <div className="absolute h-full w-full bg-gradient-to-l from-background to-transparent to-[20%]"></div>
        </div>
        <div className="absolute h-full w-full bg-gradient-to-t from-background from-[5%] to-transparent"></div>
      </div>
      <div className="-mt-8 flex h-full w-full justify-center gap-8">
        <div className="relative flex h-[1000px] flex-col justify-center">
          <div className="flex gap-40">
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
            <MediaInfo
              data={data}
              editMode={editMode}
              setModalView={setModalView}
              id={id}
              modalView={modalView}
            />
          </div>
        </div>
      </div>
      {editMode && (
        <div className="animate-in slide-in-from-bottom-10 fade-in fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/10 bg-slate-800/90 px-6 py-3 shadow-2xl backdrop-blur-xl duration-300">
          <span className="hidden text-sm font-medium text-white sm:inline">
            Modo Edição
          </span>
          <div className="h-full border"></div>
          <button
            className="rounded-md bg-gray-400 p-1 px-2"
            type="button"
            onClick={() => {
              setEditMode(false)
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="detail-form"
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm text-white transition hover:bg-blue-700"
          >
            Salvar Alterações
          </button>
          <Modal.Root>
            <Modal.Trigger asChild>
              <button
                className="rounded-md bg-red-600 p-1 px-2 text-red-100"
                type="button"
              >
                Deletar
              </button>
            </Modal.Trigger>
            <Modal.Content>
              <DeleteConfirmModal id={id} />
              <Modal.Close>
                <span>Fechar</span>
              </Modal.Close>
            </Modal.Content>
          </Modal.Root>
        </div>
      )}
    </div>
  )
}

export default Page
