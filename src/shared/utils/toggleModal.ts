interface ToggleModalProps {
  index: number
  set: React.Dispatch<React.SetStateAction<boolean[]>>
  toggler: boolean
}

export function toggleModal({ set, index, toggler }: ToggleModalProps) {
  set((prev) => {
    const newModals = [...prev]
    newModals[index] = toggler
    return newModals
  })
}
