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
        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 hover:bg-primary-hover">
          <PlusIcon />
          <span className="font-semibold">Registrar</span>
        </button>
      </Modal.Trigger>
      <Modal.Content>
        <FormMedia updaterState={updaterState} />
        <Modal.Footer>
          <Modal.Close bordered>
            <span>Cancelar</span>
          </Modal.Close>
          <button
            type="submit"
            form="media-create-form"
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Registrar
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  )
}
