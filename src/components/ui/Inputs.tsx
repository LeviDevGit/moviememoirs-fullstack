interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string
  type?: React.HTMLInputTypeAttribute
  useTodayDate?: boolean
}

function Input({ text, type = 'text', useTodayDate, ...rest }: InputProps) {
  const today = new Date().toISOString().slice(0, 10)
  const todayValue = useTodayDate ? today : ''

  return (
    <label htmlFor={text}>
      <span className="text-sm font-medium text-gray-200">{text}</span>
      <input
        type={type}
        id={text}
        name={text}
        className="mt-0.5 w-full rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm"
        {...rest}
        defaultValue={todayValue}
        max={todayValue}
      />
    </label>
  )
}

interface InputIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string
  children: React.ReactNode
}

function InputIcon({ text, children, ...rest }: InputIconProps) {
  return (
    <label htmlFor={text}>
      <span className="text-sm font-medium text-gray-200">{text}</span>
      <div className="relative">
        <input
          type="text"
          id={text}
          name={text}
          className="mt-0.5 w-full rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm"
          {...rest}
        />
        <span className="absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-200">
          {children}
        </span>
      </div>
    </label>
  )
}

export { Input, InputIcon }
