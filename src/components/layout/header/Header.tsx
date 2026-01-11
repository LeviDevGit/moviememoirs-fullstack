'use client'

import { SearchIcon, UserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { useContext, useRef } from 'react'
import { GlobalContext } from '@/providers/global'
import RegisterButton from './register/RegisterButton'
import FilterButton from './filter/FilterButton'
import { FilterContent } from '@/app/page'
import Input from '@/components/ui/Input'

function handleInputKey(
  inputRef: React.RefObject<HTMLInputElement>,
  request: React.Dispatch<React.SetStateAction<FilterContent>>,
) {
  console.log(request)

  if (inputRef.current) {
    request((prevState) => ({
      ...prevState,
      filter: inputRef.current!.value.trim(),
    }))
  }
}

function Header() {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('GlobalContext is undefined')
  }

  const { setFilterContent, setUpdater, updater } = context

  const updaterState = { updater, setUpdater }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <header className="flex w-full flex-col items-center gap-4 pt-4">
      <nav className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href={'/'} className="text-2xl font-bold">
            Minhas mídias
          </Link>
        </div>
        <div className="flex h-full items-center gap-4">
          <div className="w-[350px]">
            <Input
              placeholder="Procurar por midias"
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputKey(inputRef, setFilterContent)
                }
              }}
              icon={<SearchIcon className="text-[#9CA3AF]" size={16} />}
            />
          </div>
          <FilterButton />
        </div>
        <div className="flex h-full items-center gap-4">
          <RegisterButton updaterState={updaterState} />
          <Link
            href={'/profile'}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2937]"
          >
            <UserRoundIcon size={20} />
          </Link>
        </div>
      </nav>
      <hr className="w-full border-text-50 opacity-25" />
    </header>
  )
}

export default Header
