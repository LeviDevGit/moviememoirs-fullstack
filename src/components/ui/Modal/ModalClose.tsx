import { cloneElement } from 'react'
import { useModal } from './ModalRoot'
import { tv, VariantProps } from 'tailwind-variants'

const modalclose = tv({
  base: 'rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none border',
  variants: {
    bordered: {
      true: 'border-[#374151] text-[#E5E7EB] hover:bg-[#374151]',
      false:
        'border-transparent  text-gray-500  hover:bg-gray-800 hover:text-gray-300 focus:outline-none',
    },
    flex: {
      default: '',
      half: 'flex-1',
    },
  },
  defaultVariants: {
    bordered: true,
    flex: 'default',
  },
})

interface ModalCloseProps extends VariantProps<typeof modalclose> {
  asChild?: boolean
  children: React.ReactElement
}

export default function ModalClose({
  asChild = false,
  children,
  bordered = false,
  flex = 'default',
}: ModalCloseProps) {
  const { setOpen } = useModal()

  if (asChild) {
    return cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e)
        setOpen(false)
      },
    })
  }

  return (
    <button
      type="button"
      className={modalclose({ bordered, flex })}
      aria-label="Close"
      onClick={() => setOpen(false)}
    >
      {children}
    </button>
  )
}
