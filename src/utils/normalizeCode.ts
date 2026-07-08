const javaKeywords = [
  'public',
  'private',
  'protected',
  'class',
  'static',
  'void',
  'return',
  'new',
  'this',
  'int',
  'double',
  'string',
  'boolean',
]

export function normalizeCode(value: string) {
  return javaKeywords
    .reduce(
      (result, keyword) =>
        result.replace(new RegExp(`\\b${keyword}\\b`, 'gi'), keyword),
      value,
    )
    .replace(/\/\/.*$/gm, '')
    .replace(/;/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([(){}[\],.=+<>])\s*/g, '$1')
    .trim()
}
