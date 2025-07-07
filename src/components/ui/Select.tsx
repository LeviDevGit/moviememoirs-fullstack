type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

function Select({ ...rest }: SelectProps) {
  return (
    <div>
      <label htmlFor="Tipo">
        <span className="text-sm font-medium text-gray-200">Tipo</span>
        <select
          name="Tipo"
          id="Tipo"
          className="mt-0.5 w-full rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm"
          {...rest}
        >
          <option value="MOVIE">Filme</option>
          <option value="SERIES">Série</option>
          <option value="DOCUMENTARY">Documentário</option>
          <option value="SHORT FILM">Curta</option>
        </select>
      </label>
    </div>
  )
}

export default Select
