import { tv, VariantProps } from 'tailwind-variants'

const textarea = tv({
  base: 'mt-0.5 w-full resize-none rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm',
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

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textarea> {
  text: string
  withoutLabel?: boolean
}

function Textarea({
  text,
  withoutLabel = false,
  background,
  ...rest
}: TextareaProps) {
  return (
    <label htmlFor={text}>
      {!withoutLabel && (
        <span className="text-sm font-medium text-gray-200">{text}</span>
      )}
      <textarea
        id={text}
        className={textarea({ background })}
        rows={4}
        name={text}
        {...rest}
      ></textarea>
    </label>
  )
}

export default Textarea
