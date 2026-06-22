import { useCallback, useState } from 'react'

export const useAccordion = (initialOpenId: string | null = null) => {
  const [openId, setOpenId] = useState<string | null>(initialOpenId)

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  const isOpen = useCallback((id: string) => openId === id, [openId])

  return { openId, toggle, isOpen }
}
