import { queryFilterAdd } from './queryFilter'

export function restoreFilters(
  setOption: (value: React.SetStateAction<Record<string, string>>) => void,
  option: Record<string, string>,
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>,
  request: React.Dispatch<
    React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>
  >,
) {
  const savedRaw = localStorage.getItem('option')
  if (!savedRaw) return

  const savedObj: Record<string, string> = JSON.parse(savedRaw)
  setOption(savedObj)

  Object.entries(option).forEach(([key, value]) => {
    const input = inputRefs.current[key]
    if (input && input.value !== value) {
      input.value = value
    }
  })
  Object.entries(inputRefs.current).forEach(([key, input]) => {
    if (input) {
      queryFilterAdd({
        inputRef: { current: input },
        request,
        valueOption: key,
        setOption,
      })
    }
  })
}
