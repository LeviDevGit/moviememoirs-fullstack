'use client'

import { FormCategory } from '@/components/features/form-category'
import { Modal } from '@/components/ui/Modal'
import { toggleModal } from '@/utils/toggleModal'
import { useState } from 'react'

export default function Page() {
  const [toggleModalProfile, setToggleModalProfile] = useState([false])

  return (
    <div>
      <h1>Página profile</h1>
      <div>
        <button
          className="rounded-full bg-[#1F2937] p-2"
          onClick={() => {
            toggleModal({ index: 0, set: setToggleModalProfile, toggler: true })
          }}
        >
          Adicionar categoria
        </button>
      </div>
      {toggleModalProfile[0] && (
        <Modal.Root set={setToggleModalProfile} index={0}>
          <Modal.Main>
            <FormCategory />
          </Modal.Main>
        </Modal.Root>
      )}
    </div>
  )
}
