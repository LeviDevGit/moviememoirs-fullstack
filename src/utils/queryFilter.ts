interface queryFilterAddProps {
  inputRef: React.RefObject<HTMLInputElement>
  setOption: React.Dispatch<React.SetStateAction<Record<string, string>>>
  valueOption: string | undefined
  request: (
    value: React.SetStateAction<{
      filter: string
      directorString: string | undefined
      yearString: string | undefined
      valueString: string | undefined
    }>,
  ) => void
  setDirection: React.Dispatch<React.SetStateAction<number>>
}

function queryFilterAdd({
  inputRef,
  setOption,
  valueOption,
  request,
  setDirection,
}: queryFilterAddProps) {
  if (inputRef.current && valueOption) {
    setDirection(0)

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
  setDirection: React.Dispatch<React.SetStateAction<number>>
}

function queryFilterClear({
  setOption,
  request,
  setSelectLimit,
  setDirection,
}: queryFilterClearProps) {
  setDirection(0)

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
