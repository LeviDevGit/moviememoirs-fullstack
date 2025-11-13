import getFavoriteName from '@/lib/api/Category/getFavoriteName'
import counterView from '@/lib/api/View/counter'
import getAverageRating from '@/lib/api/View/getAverageRating'
import { StarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FavoriteCategory {
  id: number
  name: string
  totalViews: number
}

// interface FavoriteCategoryResponse {
//   favoriteCategory: FavoriteCategory
// }

function StatsSummary() {
  const [totalEntries, setTotalEntries] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [favoriteCategory, setFavoriteCategory] =
    useState<FavoriteCategory | null>(null)

  useEffect(() => {
    function loadStats() {
      counterView().then((total) => {
        setTotalEntries(total as number)
      })
      getAverageRating().then((average) => {
        setAverageRating(average as number)
      })
      getFavoriteName().then((favorite) => {
        setFavoriteCategory(favorite as FavoriteCategory)
      })
    }

    loadStats()
  }, [])

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-medium">Estatísticas de Resumo</h1>
      <div className="flex justify-between gap-4">
        <div className="flex w-[250px] flex-col gap-2 rounded-lg bg-card p-4">
          <h2 className="text-lg text-[#9CA3AF]">Total de Entradas</h2>
          <span className="text-2xl font-semibold">{totalEntries}</span>
        </div>
        <div className="flex w-[250px] flex-col gap-2 rounded-lg bg-card p-4">
          <h2 className="text-lg text-[#9CA3AF]">Média Geral</h2>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold">{averageRating}</span>
            <StarIcon color="#facc15" />
          </div>
        </div>
        <div className="flex w-[250px] flex-col gap-2 rounded-lg bg-card p-4">
          <h2 className="text-lg text-[#9CA3AF]">Categoria Favorita</h2>
          <span className="text-2xl font-semibold">
            {favoriteCategory?.name || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatsSummary
