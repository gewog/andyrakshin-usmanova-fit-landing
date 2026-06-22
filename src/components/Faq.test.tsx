import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Faq } from './Faq'

describe('Faq', () => {
  it('renders faq items', () => {
    render(<Faq />)

    expect(screen.getByRole('heading', { name: /отвечаем на вопросы/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /подойдёт ли мне программа/i }),
    ).toBeInTheDocument()
  })

  it('toggles answer visibility', async () => {
    const user = userEvent.setup()
    render(<Faq />)

    const question = screen.getByRole('button', { name: /сколько времени в день/i })
    expect(question).toHaveAttribute('aria-expanded', 'false')

    await user.click(question)
    expect(question).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/от 20 до 45 минут/i)).toBeVisible()

    await user.click(question)
    expect(question).toHaveAttribute('aria-expanded', 'false')
  })
})
