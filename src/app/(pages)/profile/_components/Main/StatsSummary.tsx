import { StarIcon } from 'lucide-react'

function StatsSummary() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-medium">Estatísticas de Resumo</h1>
      <div className="flex justify-between gap-4">
        <div className="flex w-[250px] flex-col gap-2 rounded-lg bg-card p-4">
          <h2 className="text-lg text-[#9CA3AF]">Total de Entradas</h2>
          <span className="text-2xl font-semibold">128</span>
        </div>
        <div className="flex w-[250px] flex-col gap-2 rounded-lg bg-card p-4">
          <h2 className="text-lg text-[#9CA3AF]">Média Geral</h2>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold">4.5</span>
            <StarIcon color="#facc15" />
          </div>
        </div>
        <div className="flex w-[250px] flex-col gap-2 rounded-lg bg-card p-4">
          <h2 className="text-lg text-[#9CA3AF]">Categoria Favorita</h2>
          <span className="text-2xl font-semibold">Filmes</span>
        </div>
      </div>
    </div>
  )
}

export default StatsSummary
