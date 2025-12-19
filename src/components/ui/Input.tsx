interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  type?: React.HTMLInputTypeAttribute
  ref?: React.Ref<HTMLInputElement>
  icon?: React.ReactNode | false
  useTodayDate?: boolean
  withoutLabel?: boolean
}

function Input({
  text,
  type = 'text',
  ref,
  icon = false,
  useTodayDate = false,
  withoutLabel = false,
  ...rest
}: InputProps) {
  const today = new Date().toISOString().slice(0, 10)
  const todayValue = useTodayDate ? today : ''

  return (
    <label htmlFor={text}>
      {!withoutLabel && (
        <span className="text-sm font-medium text-gray-200">{text}</span>
      )}
      <div
        className={`relative w-full rounded-lg border border-gray-600 bg-[#1F2937] text-white shadow-sm ${
          icon && 'flex items-center gap-2 px-3'
        }`}
      >
        {icon && <span>{icon}</span>}
        <input
          type={type}
          id={text}
          name={text}
          className="mt-0.5 w-full rounded-lg border-none bg-[#1F2937] text-white outline-none focus:ring-0 sm:text-sm"
          defaultValue={useTodayDate ? todayValue : undefined}
          ref={ref}
          {...rest}
        />
      </div>
    </label>
  )
}

export default Input
