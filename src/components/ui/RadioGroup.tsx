import React, { useRef, useEffect } from 'react'

interface RadioGroupsProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string
  name?: string
  children?: React.ReactNode
  checked?: boolean
}

function RadioGroup({
  value,
  name,
  children,
  checked,
  ...rest
}: RadioGroupsProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = !!checked
    }
  }, [checked])

  return (
    <div className="w-1/2">
      <input
        ref={inputRef}
        type="radio"
        name={name}
        value={value}
        id={value}
        className="peer sr-only"
        {...rest}
      />
      <label
        htmlFor={value}
        className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
      >
        {children}
      </label>
    </div>
  )
}

export default RadioGroup
