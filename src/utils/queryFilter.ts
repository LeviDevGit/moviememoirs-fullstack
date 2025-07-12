interface queryFilterAddProps {
  inputRef: React.RefObject<HTMLInputElement>
  setOption: React.Dispatch<
    React.SetStateAction<{
      director: string
      year: string
      value: string
    }>
  >
  selectOption: string | undefined
  request: (
    value: React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>,
  ) => void
  setFilterSelectHandle: React.Dispatch<React.SetStateAction<boolean>>
}

function queryFilterAdd({
  inputRef,
  setOption,
  selectOption,
  request,
  setFilterSelectHandle,
}: queryFilterAddProps) {
  if (inputRef.current && inputRef.current.value !== '' && selectOption) {
    setOption((prev) => ({
      ...prev,
      [selectOption]: inputRef.current!.value,
    }))

    setFilterSelectHandle(true)

    request((prevState) => ({
      ...prevState,
      [`${selectOption}String`]: inputRef.current!.value,
    }))
  }
}

interface queryFilterClearProps {
  setOption: (
    value: React.SetStateAction<{
      director: string
      year: string
      value: string
    }>,
  ) => void
  request: (
    value: React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>,
  ) => void
  setSelectOption: React.Dispatch<React.SetStateAction<undefined | string>>
  setSelectLimit: React.Dispatch<React.SetStateAction<boolean>>
}

function queryFilterClear({
  setOption,
  request,
  setSelectOption,
  setSelectLimit,
}: queryFilterClearProps) {
  setOption({
    director: '',
    year: '',
    value: '',
  })

  setSelectOption('director')

  setSelectLimit(false)

  request((prevState) => {
    const requestState = { ...prevState }
    Object.keys(requestState).forEach((key) => {
      requestState[key as keyof typeof requestState] = ''
    })
    return requestState
  })
}

export { queryFilterAdd, queryFilterClear }
