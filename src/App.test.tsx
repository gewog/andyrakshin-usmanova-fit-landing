import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders all main sections', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /фитнес с катей усмановой/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /приведите тело в форму/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /доверьте свое тело/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /не знаете, с чего начать/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /отвечаем на вопросы/i })).toBeInTheDocument()
  })
})
