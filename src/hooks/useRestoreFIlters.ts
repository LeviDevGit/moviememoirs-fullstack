import { FilterContext } from '@/providers/filter'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '@/providers/global'
import { queryFilterAdd } from '../utils/queryFilter'

export function useRestoreFilters() {
  const filter = useContext(FilterContext)

  if (!filter) {
    throw new Error('GlobalContext is undefined')
  }

  const global = useContext(GlobalContext)

  if (!global) {
    throw new Error('GlobalContext is undefined')
  }

  useEffect(() => {
    const { setOption, inputRefs } = filter

    const savedRaw = localStorage.getItem('option')
    if (!savedRaw) return

    const savedObj: Record<string, string> = JSON.parse(savedRaw)
    setOption(savedObj)

    const { setFilterContent } = global

    Object.entries(savedObj).forEach(([key, value]) => {
      setFilterContent((prevState) => ({
        ...prevState,
        [`${key}String`]: value,
      }))

      const input = inputRefs.current[key]

      if (input && input.value !== value) {
        input.value = value
      }
    })

    Object.entries(inputRefs.current).forEach(([key, input]) => {
      console.log(key, input, input?.value)
      if (input) {
        queryFilterAdd({
          inputRef: { current: input },
          request: setFilterContent,
          valueOption: key,
          setOption,
        })
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
