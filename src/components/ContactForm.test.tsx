import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('shows validation errors for empty submit', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /отправить заявку/i }))

    expect(screen.getByText(/введите имя/i)).toBeInTheDocument()
    expect(screen.getByText(/введите корректный e-mail/i)).toBeInTheDocument()
  })

  it('submits valid form', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/имя/i), 'Мария')
    await user.type(screen.getByLabelText(/e-mail/i), 'maria@example.com')
    await user.type(
      screen.getByLabelText(/сообщение/i),
      'Хочу подобрать программу для домашних тренировок',
    )
    await user.click(screen.getByRole('button', { name: /отправить заявку/i }))

    expect(screen.getByRole('status')).toHaveTextContent(/спасибо/i)
  })

  it('renders external contact links', () => {
    render(<ContactForm />)

    expect(screen.getByRole('link', { name: /telegram/i })).toHaveAttribute(
      'href',
      'https://t.me/UsmanovaSport_bot',
    )
  })
})
