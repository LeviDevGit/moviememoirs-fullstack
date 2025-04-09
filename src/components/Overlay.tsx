import Dashboard from './dashboard'
import Detail from './detail'
import Form from './form'
import Modal from './Modal'

interface OverlayProps {
  toggleModal: boolean[]
  setToggleModal: React.Dispatch<React.SetStateAction<boolean[]>>
  updaterState: {
    updater: boolean
    setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  }
  toggleDetail: number | undefined
  setToggleDetail: React.Dispatch<React.SetStateAction<number | undefined>>
}

function Overlay({
  toggleModal,
  setToggleModal,
  updaterState,
  setToggleDetail,
  toggleDetail,
}: OverlayProps) {
  return (
    <div>
      {toggleModal[0] ? (
        <Modal set={setToggleModal} index={0}>
          <Form updaterState={updaterState} setToggleModal={setToggleModal} />
        </Modal>
      ) : toggleModal[1] ? (
        <Modal set={setToggleModal} index={1}>
          <Dashboard updaterState={updaterState} />
        </Modal>
      ) : (
        toggleDetail && (
          <Modal set={setToggleDetail} index={undefined}>
            <Detail id={toggleDetail} />
          </Modal>
        )
      )}
    </div>
  )
}

export default Overlay
