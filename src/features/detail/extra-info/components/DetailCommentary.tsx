import Rater from '@/shared/components/Rater'
import { Modal } from '@/shared/ui/Modal'
import { MediaView } from '@/shared/utils/dispatchDetail'
import EditViewModal from '../../modals/components/EditViewModal'

interface DetailCommentaryProps {
  editMode: boolean
  setModalView: React.Dispatch<React.SetStateAction<MediaView | undefined>>
  views: MediaView[]
  modalView: MediaView | undefined
}

function DetailCommentary({
  editMode,
  setModalView,
  views,
  modalView,
}: DetailCommentaryProps) {
  return (
    <div className="mb-20 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <h1 className="heading-trail text-2xl font-semibold">Comentários</h1>
        <div className="rounded-md bg-gray-700 px-3">
          <span>{views.length}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {views.map((e) => (
          <div
            key={e.id}
            className="flex w-full items-center justify-between gap-6"
          >
            {editMode ? (
              <Modal.Root>
                <Modal.Trigger asChild>
                  <button
                    className="flex w-full flex-col gap-4 border-2 border-transparent text-start hover:border-dashed hover:border-red-100"
                    type="button"
                    onClick={() => {
                      setModalView(e)
                    }}
                  >
                    <div className="flex flex-col rounded-lg bg-card p-5">
                      <Rater
                        defaultValue={e.rating}
                        width="w-[100px] mb-3"
                        readOnly={true}
                      />
                      <h2 className="mb-3 text-sm text-white/50">
                        Assistido em{' '}
                        {new Date(e.date).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </h2>
                      <div className="pr-3">
                        <p className="text-white/90">{e.commentary}</p>
                      </div>
                    </div>
                  </button>
                </Modal.Trigger>
                <Modal.Content>
                  <EditViewModal modalView={modalView} />
                  <Modal.Close>
                    <span>Fechar</span>
                  </Modal.Close>
                </Modal.Content>
              </Modal.Root>
            ) : (
              <div className="flex w-full flex-col gap-4 border-2 border-transparent">
                <div className="flex flex-col rounded-lg bg-card p-5">
                  <Rater
                    defaultValue={e.rating}
                    width="w-[100px] mb-3"
                    readOnly={true}
                  />
                  <h2 className="mb-3 text-sm text-white/50">
                    Assistido em{' '}
                    {new Date(e.date).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </h2>
                  <div className="pr-3">
                    <p className="text-white/90">{e.commentary}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailCommentary
