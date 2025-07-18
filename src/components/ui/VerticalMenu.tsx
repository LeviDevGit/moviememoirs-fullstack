import { CalendarRangeIcon, SparklesIcon, UserRoundIcon } from 'lucide-react'

interface VerticalMenuProps {
  setOption: React.Dispatch<React.SetStateAction<Record<string, string>>>
  option: object
  setFilterDropdown: (value: React.SetStateAction<boolean>) => void
}

export const Filters = {
  Diretor: { value: 'director', icon: <UserRoundIcon /> },
  Ano: { value: 'year', icon: <CalendarRangeIcon /> },
  Nota: { value: 'value', icon: <SparklesIcon /> },
}

function VerticalMenu({
  setOption,
  option,
  setFilterDropdown,
}: VerticalMenuProps) {
  return (
    <ul className="absolute top-10 space-y-1 bg-filter shadow-md shadow-black">
      {Object.entries(Filters)
        .filter(([, value]) => !(value.value in option))
        .map(([key, value]) => (
          <li key={value.value}>
            <button
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              onClick={(event) => {
                event.stopPropagation()
                setOption((prev) => ({
                  ...prev,
                  [value.value]: '',
                }))
                setFilterDropdown(false)
              }}
            >
              {value.icon}
              <span className="text-sm font-medium">{key}</span>
            </button>
          </li>
        ))}
    </ul>
  )
}

export default VerticalMenu
