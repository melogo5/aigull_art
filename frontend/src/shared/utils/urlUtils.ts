export const getFullImageUrl = (relativePath?: string): string | undefined => {
  if (!relativePath) return undefined

  if (
    relativePath.startsWith('http://') ||
    relativePath.startsWith('https://')
  ) {
    return relativePath
  }

  const { origin } = window.location
  return `${origin}${relativePath}`
}

export const getApiBaseUrl = (): string => {
  const { hostname, port, protocol } = window.location
  if (
    (hostname === 'localhost' || hostname === '127.0.0.1') &&
    port === '3000'
  ) {
    return `http://localhost:5000/api`
  }

  return `${protocol}//${hostname}/api`
}
