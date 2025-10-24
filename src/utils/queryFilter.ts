interface queryFilterAddProps {
  inputRef: React.RefObject<HTMLInputElement>
  setOption: React.Dispatch<React.SetStateAction<Record<string, string>>>
  valueOption: string | undefined
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
  valueOption,
  request,
}: queryFilterAddProps) {
  if (inputRef.current && valueOption) {
    console.log(valueOption, inputRef.current.value)

    setOption((prev) => ({
      ...prev,
      [valueOption]: inputRef.current!.value,
    }))

    request((prevState) => ({
      ...prevState,
      [`${valueOption}String`]: inputRef.current!.value,
    }))

    const savedRaw = localStorage.getItem('option')
    const savedObj: Record<string, string> = savedRaw
      ? JSON.parse(savedRaw)
      : {}

    const updated = {
      ...savedObj,
      [valueOption]: inputRef.current!.value,
    }

    localStorage.setItem('option', JSON.stringify(updated))
  }
}

interface queryFilterClearProps {
  setOption: React.Dispatch<React.SetStateAction<Record<string, string>>>
  request: (
    value: React.SetStateAction<{
      searchString: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>,
  ) => void
  setSelectLimit: React.Dispatch<React.SetStateAction<boolean>>
}

function queryFilterClear({
  setOption,
  request,
  setSelectLimit,
}: queryFilterClearProps) {
  setOption({})

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
