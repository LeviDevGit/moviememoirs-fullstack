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
          className="mt-0.5 w-full rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm"
          {...rest}
        >
          {children}
        </select>
      </label>
    </div>
  )
}

export default Select
