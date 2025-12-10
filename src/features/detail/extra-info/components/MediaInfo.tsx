import { dataProps, MediaView } from '@/shared/utils/dispatchDetail'
import DetailSynopsis from './DetailSynopsis'
import DetailGenre from './DetailGenre'
import DetailCommentary from './DetailCommentary'
import DetailRole from './DetailRole'
import { Modal } from '@/shared/ui/Modal'
import EditCreatorModal from '../../modals/components/EditCreatorModal'
import EditTitleYearModal from '../../modals/components/EditTitleYearModal'

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
    <div className="h-full">
      <div className="flex w-[600px] flex-col justify-between gap-2">
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4">
            {editMode ? (
              <Modal.Root>
                <Modal.Trigger asChild>
                  <button
                    className="flex w-full items-end justify-start gap-4 border-2 border-transparent text-4xl hover:border-dashed hover:border-red-100"
                    type="button"
                  >
                    <p>{data.name}</p>
                    <p className="text-xl text-text-300 underline">
                      {data?.year}
                    </p>
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
                <p className="text-xl text-text-300 underline">{data?.year}</p>
              </div>
            )}
            {editMode ? (
              <Modal.Root>
                <Modal.Trigger asChild>
                  <button
                    className="flex w-full justify-end border-2 border-transparent hover:border-dashed hover:border-red-100"
                    type="button"
                  >
                    <p className="max-w-[250px] truncate text-right text-text-400">
                      Criado por{' '}
                      <span className="text-text-300 underline">
                        {data?.creator}
                      </span>
                    </p>
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
              <div className="flex w-full justify-end border-2 border-transparent">
                <p className="max-w-[250px] truncate text-right text-text-400">
                  Criado por{' '}
                  <span className="text-text-300 underline">
                    {data?.creator}
                  </span>
                </p>
              </div>
            )}
          </div>
          <h1 className="heading-trail mb-6 text-2xl font-semibold">
            Média Geral
          </h1>
          <div className="flex items-center justify-center rounded-lg bg-card p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-green-500">
                <h1 className="text-5xl font-semibold">{data.value}</h1>
              </div>
              <span>
                Baseado em {data.views.length}{' '}
                {data.views.length === 1 ? 'avaliação' : 'avaliações'}
              </span>
            </div>
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
