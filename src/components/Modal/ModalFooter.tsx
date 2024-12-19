interface ModalFooterProps {
  closeIndex: number
  closeSet: React.Dispatch<React.SetStateAction<boolean[]>>
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
}: ModalFooterProps) {
  return (
    <button
      onClick={() => {
        toggleModalFunction(closeIndex, closeSet, false)
        // closeIt(false)
      }}
      className="text-red-500"
    >
      Cancelar
    </button>
  )
}
