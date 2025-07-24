import Form from './form'
import FormCategory from './FormCategory/FormCategory'
import Modal from './Modal'

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
        <Modal set={setToggleModal} index={0}>
          <Form updaterState={updaterState} setToggleModal={setToggleModal} />
        </Modal>
      ) : (
        toggleModal[2] && (
          <Modal set={setToggleModal} index={2}>
            <FormCategory />
          </Modal>
        )
      )}
    </>
  )
}

export default Overlay
