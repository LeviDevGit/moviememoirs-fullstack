import { FormCategory } from '../features/form-category'
import { FormMedia } from '../features/form-media'
import { Modal } from '../ui/Modal'

interface OverlayProps {
  toggleModal: boolean[]
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
  updaterState: {
    updater: boolean
    setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  }
}

function Overlay({ toggleModal, setToggleModal, updaterState }: OverlayProps) {
  return (
    <>
      {toggleModal[0] ? (
        <Modal.Root set={setToggleModal} index={0}>
          <Modal.Main>
            <FormMedia
              updaterState={updaterState}
              setToggleModal={setToggleModal}
            />
          </Modal.Main>
        </Modal.Root>
      ) : (
        toggleModal[2] && (
          <Modal.Root set={setToggleModal} index={2}>
            <Modal.Main>
              <FormCategory />
            </Modal.Main>
          </Modal.Root>
        )
      )}
    </>
  )
}

export default Overlay
