interface ModalFooterProps {
  closeIndex: number
  closeSet: React.Dispatch<React.SetStateAction<boolean[]>>
  children: React.ReactNode
}

export const toggleModalFunction = (
  value: number,
  close: React.Dispatch<React.SetStateAction<boolean[]>>,
  toggler: boolean,
) => {
  close((prev) => {
    const newModals = [...prev]
    newModals[value] = toggler
    return newModals
  })
}

export default function ModalFooter({
  closeIndex,
  closeSet,
  children,
}: ModalFooterProps) {
  return (
    <div className="flex gap-5">
      {children}
      <button
        onClick={() => {
          toggleModalFunction(closeIndex, closeSet, false)
        }}
        className="rounded-xl bg-[#8f001a] p-3 text-white hover:bg-[#8f001a]/80"
      >
        Cancelar
      </button>
    </div>
  )
}
