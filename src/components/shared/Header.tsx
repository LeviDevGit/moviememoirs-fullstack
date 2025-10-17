import { FilterContent } from '@/app/page'
import Search from '../features/Search'
import { FilterIcon, PlusIcon, UserRoundIcon } from 'lucide-react'
import { toggleModal } from '@/utils/toggleModal'

interface HeaderProps {
  setFilterContent: React.Dispatch<React.SetStateAction<FilterContent>>
  setToggleModalList: React.Dispatch<React.SetStateAction<boolean[]>>
  toggleModalList: boolean[]
}

function Header({
  setFilterContent,
  setToggleModalList,
  toggleModalList,
}: HeaderProps) {
  return (
    <header className="flex w-full flex-col items-center gap-6 py-4">
      <nav className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Minhas mídias</h1>
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
            className="flex h-full items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-5 hover:bg-[#8B5CF6e0]"
            onClick={() => {
              toggleModal({ index: 0, set: setToggleModalList, toggler: true })
            }}
          >
            <PlusIcon />
            <span className="font-semibold">Registrar</span>
          </button>
          <button
            className="rounded-full bg-[#1F2937] p-2"
            onClick={() => {
              toggleModal({ index: 2, set: setToggleModalList, toggler: true })
            }}
          >
            <UserRoundIcon />
          </button>
        </div>
      </nav>
      <hr className="w-full border-text-50 opacity-25" />
    </header>
  )
}

export default Header
