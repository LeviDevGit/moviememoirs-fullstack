export const handleAddSelect = (
  sectionOptions: string[],
  setSectionOptions: React.Dispatch<React.SetStateAction<string[]>>,
  OPTIONS: string[],
) => {
  const usedValues = sectionOptions.filter((v) => v)
  const available = OPTIONS.find((opt) => !usedValues.includes(opt))

  if (available) {
    setSectionOptions([...sectionOptions, available])
  }
}

// Remove um select pelo índice
export const handleRemoveSelect = (
  value: string,
  sectionOptions: string[],
  setSectionOptions: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const updated = [...sectionOptions]
  setSectionOptions(updated.filter((e) => e !== value))
}

// Atualiza o valor de um select e impede duplicatas
export const handleChangeSelect = (
  value: string,
  index: number,
  sectionOptions: string[],
  setSectionOptions: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const updated = [...sectionOptions]
  updated[index] = value
  setSectionOptions(updated)
}

// Retorna as opções disponíveis para um select, desconsiderando o valor atual
export const getAvailableOptions = (
  OPTIONS: string[],
  sectionOptions: string[],
) => {
  const usedOptions = OPTIONS.filter((opt) => !sectionOptions.includes(opt))
  return usedOptions
}
