import { dataProps, MediaView } from '@/shared/utils/dispatchDetail'
import DetailSynopsis from './DetailSynopsis'
import DetailGenre from './DetailGenre'
import DetailCommentary from './DetailCommentary'
import DetailRole from './DetailRole'
import { Modal } from '@/shared/ui/Modal'
import EditCreatorModal from '../../modals/components/EditCreatorModal'
import EditTitleYearModal from '../../modals/components/EditTitleYearModal'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'
import RatingCircle from './RatingCircle'
import CreateExtraCommentary from '../../modals/components/CreateExtraCommentary'

interface MediaInfoProps {
  data: dataProps
  id: string
  editMode: boolean
  setModalView: React.Dispatch<React.SetStateAction<MediaView | undefined>>
  modalView: MediaView | undefined
}

function MediaInfo({
  data,
  id,
  editMode,
  setModalView,
  modalView,
}: MediaInfoProps) {
  return (
    <div className="h-full pt-8">
      <div className="flex w-[600px] flex-col justify-between gap-2">
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-4">
              {editMode ? (
                <Modal.Root>
                  <Modal.Trigger asChild>
                    <button
                      className="flex w-full items-end justify-start gap-4 border-2 border-transparent text-4xl hover:border-dashed hover:border-red-100"
                      type="button"
                    >
                      <p className="text-start">{data.name}</p>
                    </button>
                  </Modal.Trigger>
                  <Modal.Content>
                    <EditTitleYearModal data={data} id={id} />
                    <Modal.Close>
                      <span>Fechar</span>
                    </Modal.Close>
                  </Modal.Content>
                </Modal.Root>
              ) : (
                <div className="flex w-full items-end justify-start gap-4 border-2 border-transparent text-4xl">
                  <p>{data.name}</p>
                </div>
              )}
              {editMode ? (
                <Modal.Root>
                  <Modal.Trigger asChild>
                    <button
                      className="flex w-full justify-start gap-4 border-2 border-transparent hover:border-dashed hover:border-red-100"
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
                        <CalendarIcon size="1em" />
                        <p className="text-text-300">{data?.year}</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
                        <UserIcon size="1em" />
                        <p className="max-w-[250px] truncate text-right text-text-400">
                          {data?.creator}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
                        <ClockIcon size="1em" />
                        <p className="max-w-[250px] truncate text-right text-text-400">
                          {data?.time}
                        </p>
                      </div>
                    </button>
                  </Modal.Trigger>
                  <Modal.Content>
                    <EditCreatorModal data={data} />
                    <Modal.Close>
                      <span>Fechar</span>
                    </Modal.Close>
                  </Modal.Content>
                </Modal.Root>
              ) : (
                <div className="flex w-full justify-start gap-4 border-2 border-transparent">
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
                    <CalendarIcon size="1em" />
                    <p className="text-text-300">{data?.year}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
                    <UserIcon size="1em" />
                    <p className="max-w-[250px] truncate text-right text-text-400">
                      {data?.creator}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 bg-[#1F2937] px-3">
                    <ClockIcon size="1em" />
                    <p className="max-w-[250px] truncate text-right text-text-400">
                      {data?.time}
                    </p>
                  </div>
                </div>
              )}
              <p className="italic text-[#9CA3AF]">
                In a brutal war between devils, hunters, and secret enemies, a
                mysterious girl named Reze has stepped into Denji’s world, and
                he faces his deadliest battle yet, fueled by love in a world
                where survival knows no rules.
              </p>
            </div>
          </div>
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
          <DetailSynopsis />
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
    </div>
  )
}

export default MediaInfo
