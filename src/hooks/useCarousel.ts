import { useCallback, useState } from 'react'

export const useCarousel = (itemCount: number) => {
  const [index, setIndex] = useState(0)

  const goNext = useCallback(() => {
    if (itemCount <= 0) return
    setIndex((current) => (current + 1) % itemCount)
  }, [itemCount])

  const goPrev = useCallback(() => {
    if (itemCount <= 0) return
    setIndex((current) => (current - 1 + itemCount) % itemCount)
  }, [itemCount])

  const goTo = useCallback(
    (nextIndex: number) => {
      if (itemCount <= 0) return
      setIndex(((nextIndex % itemCount) + itemCount) % itemCount)
    },
    [itemCount],
  )

  return { index, goNext, goPrev, goTo }
}
