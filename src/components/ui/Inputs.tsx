interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  type?: React.HTMLInputTypeAttribute
  ref?: React.RefObject<HTMLInputElement>
  useTodayDate?: boolean
}

function Input({
  text,
  type = 'text',
  ref,
  useTodayDate,
  ...rest
}: InputProps) {
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
        ref={ref}
      />
    </label>
  )
}

interface InputIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  ref?: React.RefObject<HTMLInputElement>
  children: React.ReactNode
}

function InputIcon({ text, children, ref, ...rest }: InputIconProps) {
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
          ref={ref}
        />
        <span className="absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-200">
          {children}
        </span>
      </div>
    </label>
  )
}

export { Input, InputIcon }
