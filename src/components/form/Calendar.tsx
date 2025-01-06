function Calendar() {
  return (
    <div className="flex w-1/2 flex-col gap-1 text-xs">
      <label>
        Data de visualização <strong>*</strong>
      </label>
      <input
        type="date"
        name="viewDate"
        className="rounded-xl border border-gray-500 bg-transparent p-2"
        defaultValue={new Date().toISOString().slice(0, 10)}
        max={new Date().toISOString().slice(0, 10)}
      />
    </div>
  )
}

export default Calendar
