interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  custom?: string | null
}

function Textarea({
  custom = 'Escreva um comentário (opcional)',
  ...rest
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <label>Comentário</label>
      <textarea
        name="commentary"
        placeholder={custom || 'Sem comentário'}
        className="h-[100px] resize-none rounded-xl border border-gray-500 bg-transparent p-2 text-base"
        {...rest}
      />
    </div>
  )
}

export default Textarea
