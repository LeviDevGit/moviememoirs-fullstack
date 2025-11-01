'use client'

import { Modal } from '@/components/ui/Modal'
import { useState } from 'react'
import CategoryPanel from './_components/CategoryPanel'
import ModalFormCategory from './_components/modal-form-category/ModalFormCategory'
import StatsSummary from './_components/Main/StatsSummary'
import RecentActivityItem from './_components/Main/RecentActivityItem'

export default function Page() {
  const [toggleModalProfile, setToggleModalProfile] = useState([false])

  return (
    <div className="mx-4 flex h-full justify-center">
      <div className="flex w-[1300px] justify-between gap-8">
        <div className="flex w-full flex-col gap-8">
          <StatsSummary />
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl font-medium">Atividade Recente</h1>
            <div className="flex w-full flex-col gap-4">
              <RecentActivityItem />
            </div>
          </div>
        </div>
        <CategoryPanel setToggleModalProfile={setToggleModalProfile} />
      </div>
      {toggleModalProfile[0] && (
        <Modal.Root set={setToggleModalProfile} index={0}>
          <Modal.Main>
            <ModalFormCategory />
          </Modal.Main>
        </Modal.Root>
      )}
    </div>
  )
}
