'use client'

import { Modal } from '@/components/ui/Modal'
import { useState } from 'react'
import CategoryPanel from './_components/category-panel/CategoryPanel'
import StatsSummary from './_components/Main/StatsSummary'
import RecentActivityItem from './_components/Main/RecentActivityItem'
import FormCategoryCreate from './_components/modals/form-category-create/FormCategoryCreate'
import FormCategoryEdit from './_components/modals/form-category-edit/FormCategoryEdit'
import { CategoryAndCountType } from './_components/category-panel/CategoryPanel.hook'

export default function Page() {
  // Modal: create, edit category
  const [toggleModalProfile, setToggleModalProfile] = useState([false, false])
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryAndCountType | null>(null)

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
        <CategoryPanel
          setToggleModalProfile={setToggleModalProfile}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {toggleModalProfile[0] ? (
        <Modal.Root set={setToggleModalProfile} index={0}>
          <Modal.Main>
            <FormCategoryCreate />
          </Modal.Main>
        </Modal.Root>
      ) : (
        toggleModalProfile[1] && (
          <Modal.Root
            set={setToggleModalProfile}
            index={1}
            className="w-full max-w-lg"
          >
            <Modal.Main>
              <FormCategoryEdit category={selectedCategory} />
            </Modal.Main>
          </Modal.Root>
        )
      )}
    </div>
  )
}
