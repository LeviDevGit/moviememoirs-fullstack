function Chooser() {
  return (
    <div className="flex w-1/2 flex-col text-xs">
      <label>
        Tipo <strong>*</strong>
      </label>
      <select
        name="type"
        required
        className="rounded-xl border border-gray-500 bg-transparent p-2"
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
