export function handleDirectionChange(
  operation: number,
  direction: number,
  totalItems: number,
  setDirection: (value: React.SetStateAction<number>) => void,
) {
  let newStart = direction + operation

  console.log(newStart, totalItems, direction, operation)

  if (newStart < 0) {
    if (newStart === -1) {
      newStart = totalItems - 2
    } else {
      newStart = totalItems - 1
    }
  }

  // Se ultrapassar o último índice, volta para 0
  if (newStart >= totalItems) {
    newStart = 1
  }

  setDirection(newStart)
}
