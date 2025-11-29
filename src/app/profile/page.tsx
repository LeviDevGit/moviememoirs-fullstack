import CategoryPanel from '@/features/profile/category-panel/components/CategoryPanel'
import RecentActivityItem from '@/features/profile/stats-overview/components/RecentActivityItem'
import StatsSummary from '@/features/profile/stats-overview/components/StatsSummary'

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
    </div>
  )
}
