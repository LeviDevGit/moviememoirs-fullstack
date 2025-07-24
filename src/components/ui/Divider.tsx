interface DividerProps {
  children: React.ReactNode
}

function Divider({ children }: DividerProps) {
  return (
    <span className="flex items-center">
      <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
      <span className="shrink-0 px-4 text-gray-900 dark:text-white">
        {children}
      </span>
      <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
    </span>
  )
}

export default Divider
