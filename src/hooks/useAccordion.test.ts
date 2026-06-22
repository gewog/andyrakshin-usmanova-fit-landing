import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAccordion } from './useAccordion'

describe('useAccordion', () => {
  it('opens and closes items', () => {
    const { result } = renderHook(() => useAccordion())

    act(() => result.current.toggle('one'))
    expect(result.current.isOpen('one')).toBe(true)

    act(() => result.current.toggle('one'))
    expect(result.current.isOpen('one')).toBe(false)
  })

  it('switches between items', () => {
    const { result } = renderHook(() => useAccordion('a'))

    expect(result.current.isOpen('a')).toBe(true)

    act(() => result.current.toggle('b'))
    expect(result.current.isOpen('b')).toBe(true)
    expect(result.current.isOpen('a')).toBe(false)
  })
})
