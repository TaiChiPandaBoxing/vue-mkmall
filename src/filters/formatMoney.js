/* eslint-disable import/prefer-default-export */
export function currency(value, currencys, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currencys = currencys != null ? currencys : '$'
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(value).toFixed(decimals)
  const intNumber = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  const i = intNumber.length % 3
  const head = i > 0
    ? (intNumber.slice(0, i) + (intNumber.length > 3 ? ',' : ''))
    : ''
  const floatNumber = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  const sign = value < 0 ? '-' : ''
  return sign + currencys + head +
    intNumber.slice(i).replace(digitsRE, '$1,') +
    floatNumber
}
