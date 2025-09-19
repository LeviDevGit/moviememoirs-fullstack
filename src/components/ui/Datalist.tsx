import { ChevronDownIcon } from 'lucide-react'
import { MediaType } from '../features/form-media/FormMedia'
import React from 'react'

interface DatalistProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  options: MediaType[]
}

function Datalist({ text, options, ...rest }: DatalistProps) {
  return (
    <label htmlFor={text}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {text}
      </span>
      <div className="relative">
        <input
          type="text"
          id={text}
          name={text}
          list="HeadlineList"
          className="mt-0.5 w-full rounded border-gray-600 bg-transparent pe-8 text-white shadow-sm sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
          {...rest}
        />
        <span className="absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-200">
          <ChevronDownIcon
            className="size-4"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </span>
      </div>
      <datalist id="HeadlineList">
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </datalist>
    </label>
  )
}

export default Datalist
