import { describe, expect, it, vi } from 'vitest'
import { scrollToElement } from './scrollTo'

describe('scrollToElement', () => {
  it('returns false when element is missing', () => {
    expect(scrollToElement('missing-id')).toBe(false)
  })

  it('scrolls to existing element', () => {
    const element = document.createElement('section')
    element.id = 'target'
    element.scrollIntoView = vi.fn()
    document.body.appendChild(element)

    expect(scrollToElement('target')).toBe(true)
    expect(element.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })

    element.remove()
  })
})
