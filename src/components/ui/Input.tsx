import { tv, VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'w-full rounded-lg text-white',
  variants: {
    background: {
      default: 'bg-card',
      modal: 'bg-background',
    },
  },
  defaultVariants: {
    background: 'default',
  },
})

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  text?: string
  type?: React.HTMLInputTypeAttribute
  ref?: React.Ref<HTMLInputElement>
  icon?: React.ReactNode | false
  useTodayDate?: boolean
  withoutLabel?: boolean
}

function Input({
  background,
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
        className={input({
          background,
          className: `relative border border-gray-600 shadow-sm ${
            icon && 'flex items-center gap-2 px-3'
          }`,
        })}
      >
        {icon && <span>{icon}</span>}
        <input
          type={type}
          id={text}
          name={text}
          className={input({
            background,
            className:
              'mt-0.5 border-none outline-none focus:ring-0 sm:text-sm',
          })}
          defaultValue={useTodayDate ? todayValue : undefined}
          ref={ref}
          {...rest}
        />
      </div>
    </label>
  )
}

export default Input
