interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  text: string
  withoutLabel?: boolean
}

function Textarea({ text, withoutLabel = false, ...rest }: TextareaProps) {
  return (
    <label htmlFor={text}>
      {!withoutLabel && (
        <span className="text-sm font-medium text-gray-200">{text}</span>
      )}
      <textarea
        id={text}
        className="mt-0.5 w-full resize-none rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm"
        rows={4}
        name={text}
        {...rest}
      ></textarea>
    </label>
  )
}

export default Textarea
