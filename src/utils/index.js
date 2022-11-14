export const clearAllTimer = () => {
  const length = setTimeout(() => {}, 0)
  for (let i = 0; i < length; i++) {
    clearTimeout(i)
  }
}
