export const isNaN = (value: unknown) => Number.isNaN(Number(String(value)))

export const toCurrency = (value?: unknown, compact = false) => {
  if (isNaN(value)) return ''

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: compact ? 3 : 2,
    notation: compact ? 'compact' : 'standard',
  }).format(Number(value))
}

export const toKilogram = (value?: unknown) => {
  if (isNaN(value)) return ''

  return (
    new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 1,
    }).format(Number(value)) + ' kg'
  )
}
export const formatDecimal = (value: number | string) =>
  String(value).padStart(2, '0')

export function truncNoRound(value: number, precision: number) {
  if (isNaN(value)) return 0
  const magnitude = Math.pow(10, precision)
  return Math.trunc(value * magnitude) / magnitude
}

export function removeMask(value: string) {
  if (!value) return 0

  const parsedValue = String(value)
  const parsedNumber = parseFloat(
    parsedValue
      .replace(/,/g, '.')
      .replace(/[.](?=.*[.])/g, '')
      .replace(/R\$/g, '')
      .replace(' ', ''),
  )

  return isNaN(parsedNumber) ? 0 : parsedNumber
}

function removeTrailingSlash(pathname: string) {
  if (pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

export const matchesPathname = (asPath: string, pathname: string) => {
  if (asPath === pathname) {
    return true
  }
  const baseAsPath = removeTrailingSlash(asPath.split('?')[0])
  const basePathname = removeTrailingSlash(pathname.split('?')[0])
  if (baseAsPath === basePathname) {
    return true
  }
  const basePathRegex = new RegExp(
    `^${basePathname.replace(/(\[[a-zA-Z0-9-]+\])+/g, '[a-zA-Z0-9-]+')}$`
      .replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, '?.*')
      .replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, '.*'),
  )
  return basePathRegex.test(baseAsPath)
}

export function fillNumericalId(value: string) {
  return `#${value.padStart(5, '0')}`
}

export function formatDate(date: Date, locale = 'pt-BR') {
  if (!date) return ''
  return new Date(date).toLocaleDateString(locale)
}

export function formatDocument(value: string) {
  const document = value.replace(/\D/g, '')

  if (document.length === 11) {
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  }

  if (document.length > 14) return document

  return document.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5',
  )
}

export function formatPhone(value: string) {
  const phone = value.replace(/\D/g, '')

  if (phone.length === 10)
    return phone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')

  return phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export function formatCep(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}

export function verifyCPF(cpf: string) {
  let sum = 0
  let rest = 0

  const { cpfValid, isValid } = validFormatCPF(cpf)
  if (!isValid) return false

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpfValid.substring(i - 1, i)) * (11 - i)
  }

  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(cpfValid.substring(9, 10))) return false

  sum = 0

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpfValid.substring(i - 1, i)) * (12 - i)
  }

  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(cpfValid.substring(10, 11))) return false

  return true
}

export function validFormatCPF(cpf: string) {
  const regexValidCPF = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/

  if (!cpf.match(regexValidCPF)) {
    return {
      cpfValid: cpf,
      isValid: false,
    }
  }

  cpf = cpf.replace('-', '').replace(/\./g, '')

  if (cpf.match(/^(\d)\1{10}/g)) {
    return {
      cpfValid: cpf,
      isValid: false,
    }
  }

  return { cpfValid: cpf, isValid: true }
}

export function cleanCPF(cpf: string) {
  return cpf.replace(/\D/g, '')
}

export function removeSpecialCaracters(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, '')
}
