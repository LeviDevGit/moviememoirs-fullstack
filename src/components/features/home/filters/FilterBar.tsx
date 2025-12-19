'use client'

import { GlobalContext } from '@/providers/global'
import { useContext } from 'react'
import { FilterOrdering } from './types'
import Select from '@/components/ui/Select'

export default function FilterBar() {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { setFilterOrdering } = context

  return (
    <div className="flex h-[100px] w-full items-center justify-between px-4">
      <Select
        onChange={(e) =>
          setFilterOrdering((prev) => ({ ...prev, typeBy: e.target.value }))
        }
      >
        <option value="all">Todos</option>
        <option value="movie">Filmes</option>
        <option value="series">Séries</option>
        <option value="documentary">Documentários</option>
      </Select>
      <Select
        onChange={(e) =>
          setFilterOrdering((prev) => ({
            ...prev,
            orderBy: e.target.value as FilterOrdering['orderBy'],
          }))
        }
      >
        <option value="recent">Adicionado Recentemente</option>
        <option value="new">Data de lançamento</option>
      </Select>
    </div>
  )
}
