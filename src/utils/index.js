export const clearAllTimer = () => {
  const length = setTimeout(() => {}, 0)
  for (let i = 0; i < length; i++) {
    clearTimeout(i)
  }
}
// 格式化金额数字
export const formatNumber = (number, max) => {
  if (parseInt(number) > 999999) return '999,999+'
  let b = parseInt(number).toString()
  const length = max - b.length
  if (b.length < max) {
    for (let i = 0; i < length; i++) {
      b = '0' + b
    }
  }
  const len = b.length
  if (len <= 3) { return b }
  const r = len % 3
  return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
}
