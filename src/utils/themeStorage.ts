export type AppTheme = 'dark' | 'light'

export const themeStorageKey = 'd286-java-trainer-theme'

export function readTheme(): AppTheme {
  const savedTheme = localStorage.getItem(themeStorageKey)

  return savedTheme === 'light' ? 'light' : 'dark'
}

export function saveTheme(theme: AppTheme) {
  localStorage.setItem(themeStorageKey, theme)
}
