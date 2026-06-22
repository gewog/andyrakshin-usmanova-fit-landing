import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCarousel } from './useCarousel'

describe('useCarousel', () => {
  it('navigates forward and backward', () => {
    const { result } = renderHook(() => useCarousel(3))

    expect(result.current.index).toBe(0)

    act(() => result.current.goNext())
    expect(result.current.index).toBe(1)

    act(() => result.current.goPrev())
    expect(result.current.index).toBe(0)
  })

  it('wraps around edges', () => {
    const { result } = renderHook(() => useCarousel(2))

    act(() => result.current.goPrev())
    expect(result.current.index).toBe(1)

    act(() => result.current.goNext())
    act(() => result.current.goNext())
    expect(result.current.index).toBe(1)
  })

  it('goes to specific index', () => {
    const { result } = renderHook(() => useCarousel(4))

    act(() => result.current.goTo(2))
    expect(result.current.index).toBe(2)
  })

  it('ignores navigation when empty', () => {
    const { result } = renderHook(() => useCarousel(0))

    act(() => result.current.goNext())
    act(() => result.current.goPrev())
    act(() => result.current.goTo(1))

    expect(result.current.index).toBe(0)
  })
})
