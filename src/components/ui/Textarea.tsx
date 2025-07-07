type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

function Textarea({ ...rest }: TextareaProps) {
  return (
    <label htmlFor="Comentário">
      <span className="text-sm font-medium text-gray-200">Comentário</span>
      <textarea
        id="Comentário"
        className="mt-0.5 w-full resize-none rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm"
        rows={4}
        placeholder="Escreva um comentário (opcional)"
        {...rest}
      ></textarea>
    </label>
  )
}

export default Textarea
