interface queryFilterAddProps {
  inputRef: React.RefObject<HTMLInputElement>
  setOption: React.Dispatch<
    React.SetStateAction<{
      director: string
      year: string
      value: string
    }>
  >
  selectOption: 'director' | 'year' | 'value'
  request: (
    value: React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>,
  ) => void
}

function queryFilterAdd({
  inputRef,
  setOption,
  selectOption,
  request,
}: queryFilterAddProps) {
  if (inputRef.current && inputRef.current.value !== '') {
    setOption((prev) => ({
      ...prev,
      [selectOption]: inputRef.current!.value,
    }))

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
}

function queryFilterClear({ setOption, request }: queryFilterClearProps) {
  setOption((prev) => {
    const optionState = { ...prev }
    Object.keys(optionState).forEach((key) => {
      optionState[key as keyof typeof optionState] = ''
    })
    return optionState
  })

  request((prevState) => {
    const requestState = { ...prevState }
    Object.keys(requestState).forEach((key) => {
      requestState[key as keyof typeof requestState] = ''
    })
    return requestState
  })
}

export { queryFilterAdd, queryFilterClear }
