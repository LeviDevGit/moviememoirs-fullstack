interface ChooserProps {
  defaultValue?: string | undefined
}

function Chooser({ defaultValue = undefined }: ChooserProps) {
  return (
    <div className="flex w-1/2 flex-col gap-1 text-xs">
      <label>
        Tipo <strong className="text-red-600">*</strong>
      </label>
      <select
        name="type"
        className="rounded-xl border border-gray-500 bg-transparent p-2"
        defaultValue={defaultValue}
      >
        <option value="MOVIE">Filme</option>
        <option value="SERIES">Série</option>
        <option value="DOCUMENTARY">Documentário</option>
        <option value="SHORT FILM">Curta</option>
      </select>
    </div>
  )
}

export default Chooser
