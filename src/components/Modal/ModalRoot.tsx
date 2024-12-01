import { ReactNode } from 'react'

interface ModalRootProps {
  children: ReactNode
  closeIt: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalRoot({ children, closeIt }: ModalRootProps) {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/70">
      <div className="bg-white">
        <div>{children}</div>
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
      </div>
    </div>
  )
}
