'use client'

import { FilterIcon, PlusIcon, UserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { useContext } from 'react'
import { GlobalContext } from '@/providers/global'
import { FilterContext } from '@/providers/filter'
import SearchInput from './components/Search'
import { Modal } from '@/shared/ui/Modal'
import FormMedia from './components/FormMedia'
import FilterMenu from './components/FilterMenu'

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
          <Modal.Root>
            <Modal.Trigger asChild>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-[#1F2937] text-sm hover:bg-gray-700 hover:text-text-50">
                <button className="flex h-full w-full items-center justify-center text-[#9CA3AF]">
                  <FilterIcon size={16} />
                </button>
                <span className="absolute -bottom-2 -right-2 w-5 cursor-default rounded-full bg-red-500 text-center">
                  {Object.keys(option).length > 0 && Object.keys(option).length}
                </span>
              </div>
            </Modal.Trigger>
            <Modal.Content>
              <FilterMenu filterContent={filterContent} />
              <Modal.Close>
                <span>Fechar</span>
              </Modal.Close>
            </Modal.Content>
          </Modal.Root>
        </div>
        <div className="flex h-full items-center gap-4">
          <Modal.Root>
            <Modal.Trigger asChild>
              <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-5 hover:bg-[#8B5CF6e0]">
                <PlusIcon />
                <span className="font-semibold">Registrar</span>
              </button>
            </Modal.Trigger>
            <Modal.Content>
              <FormMedia updaterState={updaterState} />
              <Modal.Close>
                <span>Fechar</span>
              </Modal.Close>
            </Modal.Content>
          </Modal.Root>
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
