'use client'

import { FilterIcon, PlusIcon, UserRoundIcon } from 'lucide-react'
import { toggleModal } from '@/utils/toggleModal'
import Link from 'next/link'
import { useContext } from 'react'
import { GlobalContext } from '@/providers/global'
import Search from './Search'

function Header() {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { toggleModalList, setToggleModalList, setFilterContent } = context

  return (
    <header className="flex w-full flex-col items-center gap-6 py-4">
      <nav className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href={'/'} className="text-2xl font-bold">
            Minhas mídias
          </Link>
        </div>
        <div className="flex h-full items-center gap-4">
          <Search request={setFilterContent} />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-[#1F2937] text-sm hover:bg-gray-700 hover:text-text-50">
            <button
              onClick={(event) => {
                event.stopPropagation()
                toggleModal({
                  index: 1,
                  set: setToggleModalList,
                  toggler: !toggleModalList[1],
                })
              }}
              className="flex h-full w-full items-center justify-center text-[#9CA3AF]"
            >
              <FilterIcon size={16} />
            </button>
          </div>
        </div>
        <div className="flex h-full items-center gap-4">
          <button
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-5 hover:bg-[#8B5CF6e0]"
            onClick={() => {
              toggleModal({ index: 0, set: setToggleModalList, toggler: true })
            }}
          >
            <PlusIcon />
            <span className="font-semibold">Registrar</span>
          </button>
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
