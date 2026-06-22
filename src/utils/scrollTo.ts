export const scrollToElement = (elementId: string): boolean => {
  const element = document.getElementById(elementId)

  if (!element) {
    return false
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}
