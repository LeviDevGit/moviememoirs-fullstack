interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  text?: string
  className?: string | undefined
  children: React.ReactNode
}

function Select({ children, className, text, ...rest }: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={text}>
        <span className="text-sm font-medium text-gray-200">{text}</span>
        <select
          name={text}
          id={text}
          className="w-full cursor-pointer appearance-none rounded-md border border-gray-700 bg-[#1F2937] py-2 pl-4 pr-10 font-semibold text-[#E5E7EB] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          {...rest}
        >
          {children}
        </select>
      </label>
    </div>
  )
}

export default Select
