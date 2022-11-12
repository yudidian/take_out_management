export const clearAllTimer = () => {
  const length = setTimeout(() => {}, 0)
  console.log('xxxxxxxxxxxxx', length)
  for (let i = 0; i < length; i++) {
    clearTimeout(i)
  }
}
