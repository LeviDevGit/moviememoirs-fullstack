import { StarIcon } from 'lucide-react'

function RecentActivityItem() {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-card p-4">
      <img
        src="https://image.tmdb.org/t/p/original/8LJJjLjAzAwXS40S5mx79PJ2jSs.jpg"
        className="h-[200px] rounded-lg bg-contain bg-center"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Duna: Parte 2</h2>
        <span className="text-[#9CA3AF]">Filme</span>
        <div className="flex gap-2">
          <StarIcon color="#facc15" />
          <span className="text-yellow-400">4.5/5</span>
        </div>
        <span className="text-[#9CA3AF]">25 de Maio, 2024</span>
        <p className="line-clamp-2 max-w-[800px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

export default RecentActivityItem
