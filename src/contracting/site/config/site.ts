export const CONTRACTING_BASE_PATH = '/contracting/build'

export function contractingPath(path = '') {
  const cleanPath = path.replace(/^\/+/, '')

  if (!cleanPath) {
    return CONTRACTING_BASE_PATH
  }

  return `${CONTRACTING_BASE_PATH}/${cleanPath}`
}