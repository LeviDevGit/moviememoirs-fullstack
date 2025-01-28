interface CalendarProps {
  custom?: string
}

function Calendar({
  custom = new Date().toISOString().slice(0, 10),
}: CalendarProps) {
  return (
    <div className="flex w-1/2 flex-col gap-1 text-xs">
      <label>
        Data de visualização <strong className="text-red-600">*</strong>
      </label>
      <input
        type="date"
        name="viewDate"
        className="rounded-xl border border-gray-500 bg-transparent p-2"
        defaultValue={custom}
        max={new Date().toISOString().slice(0, 10)}
      />
    </div>
  )
}

export default Calendar
