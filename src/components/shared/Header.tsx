import { FilterContent } from '@/app/page'
import Search from '../features/Search'
import { BookIcon, PlusIcon, UserRoundIcon } from 'lucide-react'
import { toggleModal } from '@/utils/toggleModal'

interface HeaderProps {
  setFilterContent: React.Dispatch<React.SetStateAction<FilterContent>>
  setToggleModalList: React.Dispatch<React.SetStateAction<boolean[]>>
  toggleModalList: boolean[]
  dropdown: React.MutableRefObject<HTMLDivElement | null>
  filterContent: FilterContent
}

function Header({
  setFilterContent,
  setToggleModalList,
  toggleModalList,
  dropdown,
  filterContent,
}: HeaderProps) {
  return (
    <header className="flex w-full flex-col items-center gap-4 py-4">
      <nav className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <BookIcon />
          <h1 className="text-2xl font-bold">Minhas mídias</h1>
        </div>
        <div className="flex h-full items-center gap-1">
          <Search
            request={setFilterContent}
            dropdown={dropdown}
            filterContent={filterContent}
            setFilterContent={setFilterContent}
            setToggleModalList={setToggleModalList}
            toggleModalList={toggleModalList}
          />
        </div>
        <div className="flex h-full items-center gap-4">
          <button
            className="flex h-full items-center justify-center gap-2 rounded-full bg-secondary-700 px-5 hover:bg-secondary-600"
            onClick={() => {
              toggleModal({ index: 0, set: setToggleModalList, toggler: true })
            }}
          >
            <PlusIcon />
            <span>Registrar</span>
          </button>
          <button
            className="rounded-full border p-1"
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
