import DetailGenre from './DetailGenre'
import DetailCommentary from './DetailCommentary'
import DetailRole from './DetailRole'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'
import RatingCircle from './RatingCircle'
import CreateExtraCommentary from '../modals/CreateExtraCommentary'
import { useState } from 'react'
import { dataProps, MediaView } from '@/utils/dispatchDetail'
import { Modal } from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

interface MediaInfoProps {
  data: dataProps
  id: string
  editMode: boolean
}

function MediaInfo({ data, id, editMode }: MediaInfoProps) {
  const [modalView, setModalView] = useState<MediaView | undefined>(undefined)

  return (
    <div className="h-full pt-8">
      <div className="flex w-[600px] flex-col justify-between gap-4">
        {editMode ? (
          <textarea
            className="w-full resize-none bg-transparent text-start text-4xl"
            defaultValue={data.name}
          />
        ) : (
          <p className="text-start text-4xl">{data.name}</p>
        )}

        <div className="flex w-full justify-start gap-4 border-2 border-transparent">
          {editMode ? (
            <div className="w-[150px] flex-1">
              <Input
                defaultValue={data.year}
                icon={<CalendarIcon size="1em" />}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
              <CalendarIcon size="1em" />
              <p className="text-text-300">{data?.year}</p>
            </div>
          )}
          {editMode ? (
            <div>
              <Input
                defaultValue={data.creator}
                icon={<UserIcon size="1em" />}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
              <UserIcon size="1em" />
              <p className="text-text-300">{data?.creator}</p>
            </div>
          )}
          {editMode ? (
            <div className="w-[150px] flex-1">
              <Input defaultValue={data.time} icon={<ClockIcon size="1em" />} />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
              <ClockIcon size="1em" />
              <p className="text-text-300">{data?.time}</p>
            </div>
          )}
        </div>
        {editMode ? (
          <textarea
            className="h-20 w-full resize-none bg-transparent italic text-[#9CA3AF]"
            defaultValue="In a brutal war between devils, hunters, and secret enemies, a
            mysterious girl named Reze has stepped into Denji’s world, and he
            faces his deadliest battle yet, fueled by love in a world where
            survival knows no rules."
          ></textarea>
        ) : (
          <p className="italic text-[#9CA3AF]">
            In a brutal war between devils, hunters, and secret enemies, a
            mysterious girl named Reze has stepped into Denji’s world, and he
            faces his deadliest battle yet, fueled by love in a world where
            survival knows no rules.
          </p>
        )}
        <Modal.Root>
          <Modal.Trigger asChild>
            <button
              className="my-10 w-full rounded-md bg-[#8B5CF6]/80 py-2 text-center font-semibold hover:bg-[#8B5CF6e0]"
              type="button"
            >
              Adicionar nova avaliação
            </button>
          </Modal.Trigger>
          <Modal.Content>
            <CreateExtraCommentary id={data.id} />
            <Modal.Footer>
              <Modal.Close>
                <span>Fechar</span>
              </Modal.Close>
              <button
                type="submit"
                form="create-view-form"
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Salvar
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
        <h1 className="heading-trail mb-6 text-2xl font-semibold">
          Média Geral
        </h1>
        <div className="w-full rounded-lg bg-card p-4">
          <RatingCircle
            value={data.value}
            size={120}
            length={data.views.length}
          />
        </div>
        <DetailGenre />
        <DetailRole />
        <DetailCommentary
          editMode={editMode}
          setModalView={setModalView}
          views={data.views}
          modalView={modalView}
        />
      </div>
    </div>
  )
}

export default MediaInfo
