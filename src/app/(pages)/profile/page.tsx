import CategoryPanel from './_components/category-panel/CategoryPanel'
import StatsSummary from './_components/Main/StatsSummary'
import RecentActivityItem from './_components/Main/RecentActivityItem'

export default function Page() {
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
        <CategoryPanel />
      </div>
      {/* {toggleModalProfile[0] ? (
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
              <FormCategoryEdit
                category={selectedCategory}
                setToggleModalProfile={setToggleModalProfile}
              />
            </Modal.Main>
          </Modal.Root>
        )
      )} */}
    </div>
  )
}
