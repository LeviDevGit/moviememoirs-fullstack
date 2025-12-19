import { PlusIcon } from 'lucide-react'
import FormMedia from './FormMedia'
import { Modal } from '@/components/ui/Modal'

interface RegisterButtonProps {
  updaterState: {
    updater: boolean
    setUpdater: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export default function RegisterButton({ updaterState }: RegisterButtonProps) {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-5 hover:bg-[#8B5CF6e0]">
          <PlusIcon />
          <span className="font-semibold">Registrar</span>
        </button>
      </Modal.Trigger>
      <Modal.Content>
        <FormMedia updaterState={updaterState} />
        <Modal.Footer>
          <Modal.Close>
            <span>Fechar</span>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  )
}
