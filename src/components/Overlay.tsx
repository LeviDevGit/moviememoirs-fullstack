import Form from './form'
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
      {toggleModal[0] && (
        <Modal set={setToggleModal} index={0}>
          <Form updaterState={updaterState} setToggleModal={setToggleModal} />
        </Modal>
      )}
    </>
  )
}

export default Overlay
