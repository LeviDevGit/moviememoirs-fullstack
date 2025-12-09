'use client'

import { UserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { useContext } from 'react'
import { GlobalContext } from '@/providers/global'
import { FilterContext } from '@/providers/filter'
import SearchInput from './search/Search'
import RegisterButton from './register/RegisterButton'
import FilterButton from './filter/FilterButton'

function Header() {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { setFilterContent, filterContent, setUpdater, updater } = context

  const updaterState = { updater, setUpdater }

  const filter = useContext(FilterContext)

  if (!filter) {
    throw new Error('FilterContext is undefined')
  }

  const { option } = filter

  return (
    <header className="flex w-full flex-col items-center gap-6 py-4">
      <nav className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href={'/'} className="text-2xl font-bold">
            Minhas mídias
          </Link>
        </div>
        <div className="flex h-full items-center gap-4">
          <SearchInput request={setFilterContent} />
          <FilterButton filterContent={filterContent} option={option} />
        </div>
        <div className="flex h-full items-center gap-4">
          <RegisterButton updaterState={updaterState} />
          <Link href={'/profile'} className="rounded-full bg-[#1F2937] p-2">
            <UserRoundIcon />
          </Link>
        </div>
      </nav>
      <hr className="w-full border-text-50 opacity-25" />
    </header>
  )
}

export default Header
