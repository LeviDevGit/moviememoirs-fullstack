import Dashboard from './dashboard'
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
      {toggleModal[0] ? (
        <Modal set={setToggleModal} index={0}>
          <Form updaterState={updaterState} setToggleModal={setToggleModal} />
        </Modal>
      ) : (
        toggleModal[1] && (
          <Modal set={setToggleModal} index={1}>
            <Dashboard updaterState={updaterState} />
          </Modal>
        )
      )}
    </>
  )
}

export default Overlay
