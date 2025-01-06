function Textarea() {
  return (
    <div className="flex flex-col text-xs">
      <label>Comentário</label>
      <textarea
        name="commentary"
        placeholder="Escreva um comentário (opcional)"
        className="resize-none rounded-xl border border-gray-500 bg-transparent p-2"
      />
    </div>
  )
}

export default Textarea
