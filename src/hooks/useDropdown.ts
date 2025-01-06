import { toggleModal } from '@/components/Dismiss'
import { useEffect } from 'react'

interface useDropdownProps {
  isOpen: boolean[]
  dropdown: React.MutableRefObject<HTMLDivElement | null>
  toggleDropdown: React.Dispatch<React.SetStateAction<boolean[]>>
}

function useDropdown({ isOpen, dropdown, toggleDropdown }: useDropdownProps) {
  useEffect(() => {
    if (!isOpen[2]) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        event.target instanceof Node &&
        !dropdown.current.contains(event.target)
      ) {
        toggleModal({ index: 2, set: toggleDropdown, toggler: false })
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [dropdown, isOpen, toggleDropdown])
}

export default useDropdown
