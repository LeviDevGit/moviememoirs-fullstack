import React, { useRef, useEffect } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const radiogroup = tv({
  base: 'flex items-center gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800',
  variants: {
    spacing: {
      between: 'justify-between',
      gap: 'gap-4',
    },
  },
  defaultVariants: {
    spacing: 'between',
  },
})

interface RadioGroupsProps
  extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof radiogroup> {
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
  spacing,
  ...rest
}: RadioGroupsProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = !!checked
    }
  }, [checked])

  return (
    <div>
      <input
        ref={inputRef}
        type="radio"
        name={name}
        value={value}
        id={value}
        className="peer sr-only"
        {...rest}
      />
      <label htmlFor={value} className={radiogroup({ spacing })}>
        {children}
      </label>
    </div>
  )
}

export default RadioGroup
