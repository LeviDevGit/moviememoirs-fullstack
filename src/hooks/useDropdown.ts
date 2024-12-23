import { toggleModalFunction } from '@/components/Modal/ModalFooter'
import { useEffect } from 'react'

interface useDropdownProps {
  isOpen: boolean[]
  dropdown: React.MutableRefObject<HTMLDivElement | null>
  toggleDropdown: React.Dispatch<React.SetStateAction<boolean[]>>
}

export default function useDropdown({
  isOpen,
  dropdown,
  toggleDropdown,
}: useDropdownProps) {
  useEffect(() => {
    if (!isOpen[2]) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        event.target instanceof Node &&
        !dropdown.current.contains(event.target)
      ) {
        toggleModalFunction(2, toggleDropdown, false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [dropdown, isOpen, toggleDropdown])
}
