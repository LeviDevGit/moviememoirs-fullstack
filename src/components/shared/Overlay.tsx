'use client'

import { FormMedia } from '../../app/_components/modals/form-media'
import { Modal } from '../ui/Modal'
import { useContext } from 'react'
import { GlobalContext } from '@/providers/global'
import FilterMenu from '../layout/header/components/FilterMenu/FilterMenu'

function Overlay() {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const {
    toggleModalList,
    setToggleModalList,
    updater,
    setUpdater,
    filterContent,
  } = context

  const updaterState = { updater, setUpdater }

  return (
    <>
      {toggleModalList[0] ? (
        <Modal.Root set={setToggleModalList} index={0}>
          <Modal.Main>
            <FormMedia
              updaterState={updaterState}
              setToggleModal={setToggleModalList}
            />
          </Modal.Main>
        </Modal.Root>
      ) : (
        toggleModalList[1] && (
          <Modal.Root set={setToggleModalList} index={1}>
            <Modal.Main>
              <FilterMenu filterContent={filterContent} />
            </Modal.Main>
          </Modal.Root>
        )
      )}
    </>
  )
}

export default Overlay
