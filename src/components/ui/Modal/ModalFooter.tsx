import { tv, VariantProps } from 'tailwind-variants'

const modalfooter = tv({
  base: 'mt-6 flex w-full gap-2',
  variants: {
    layout: {
      default: 'justify-end',
      spaced: 'justify-center',
    },
  },
  defaultVariants: {
    layout: 'default',
  },
})

interface ModalFooterProps extends VariantProps<typeof modalfooter> {
  children: React.ReactNode
}

export default function ModalFooter({ children, layout }: ModalFooterProps) {
  return <div className={modalfooter({ layout })}>{children}</div>
}
