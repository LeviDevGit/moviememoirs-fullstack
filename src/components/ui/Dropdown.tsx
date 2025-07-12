import { Input } from './Inputs'

interface DropdownProps {
  children: React.ReactNode
}

function Dropdown({ children }: DropdownProps) {
  return (
    <div className="absolute top-2 z-auto w-56 divide-y divide-gray-200 overflow-hidden rounded border border-gray-300 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-600 dark:bg-gray-800">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Presets
        </span>
        <button
          type="button"
          className="text-sm text-red-600 transition-colors hover:text-white"
        >
          Reset
        </button>
      </div>
      <div>
        <fieldset className="flex flex-col gap-3 p-3">
          {children}
          <div className="flex items-start gap-3">
            <Input text="Lançamento" />
            <Input text="Nota" />
          </div>
        </fieldset>
        <div className="p-3">
          <button className="block w-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
            APPLY
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
