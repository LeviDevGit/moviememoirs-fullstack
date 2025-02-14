interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string
}

function InputField({ text, ...rest }: InputFieldProps) {
  return (
    <div
      className={`flex w-full flex-col gap-1 text-xs ${text !== 'Nome' && 'w-1/2'}`}
    >
      <label>
        {text} <strong className="text-red-600">*</strong>
      </label>
      <input
        type="text"
        {...rest}
        className="h-[32px] rounded-xl border border-gray-500 bg-transparent p-2"
      />
    </div>
  )
}
export default InputField
