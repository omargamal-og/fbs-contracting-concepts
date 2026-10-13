export function isValidSupplierPhone(value: string): boolean {
  const normalized = value.replace(/[٠-٩۰-۹]/g, (digit) => {
    const code = digit.charCodeAt(0)
    return String(code - (code <= 0x0669 ? 0x0660 : 0x06f0))
  })

  // Check before trimming so unsupported whitespace is not silently removed.
  if (/[^0-9 ()+-]/.test(normalized)) return false

  const formatted = normalized.trim()
  if (
    formatted.includes('+') &&
    (!formatted.startsWith('+') || formatted.indexOf('+', 1) !== -1)
  ) {
    return false
  }

  const digitCount = normalized.replace(/\D/g, '').length
  return digitCount >= 8 && digitCount <= 15
}
