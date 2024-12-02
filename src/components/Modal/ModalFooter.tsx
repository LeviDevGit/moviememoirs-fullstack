interface ModalFooterProps {
  closeIt: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalFooter({ closeIt }: ModalFooterProps) {
  return (
    <div className="flex items-center justify-end">
      <button>Adicionar</button>
      <button
        onClick={() => {
          closeIt(false)
        }}
      >
        Cancelar
      </button>
    </div>
  )
}
