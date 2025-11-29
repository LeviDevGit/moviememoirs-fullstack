import { toggleModal } from '@/shared/utils/toggleModal'
import { useEffect } from 'react'

interface useDropdownProps {
  toggleModalList: boolean[]
  dropdown: React.MutableRefObject<HTMLDivElement | null>
  setToggleModalList: React.Dispatch<React.SetStateAction<boolean[]>>
}

function useDropdown({
  toggleModalList,
  dropdown,
  setToggleModalList,
}: useDropdownProps) {
  useEffect(() => {
    if (!toggleModalList[1]) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        event.target instanceof Node &&
        !dropdown.current.contains(event.target)
      ) {
        toggleModal({ index: 1, set: setToggleModalList, toggler: false })
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [dropdown, toggleModalList, setToggleModalList])
}

export default useDropdown
