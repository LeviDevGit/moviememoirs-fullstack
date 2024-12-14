interface ModalFooterProps {
  closeIt: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalFooter({ closeIt }: ModalFooterProps) {
  return (
    <button
      onClick={() => {
        closeIt(false)
      }}
    >
      Cancelar
    </button>
  )
}
