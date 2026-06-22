import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders hero content', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', {
        name: /приведите тело в форму/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /выбрать программу/i })).toBeInTheDocument()
  })

  it('scrolls to contact form on cta click', async () => {
    const user = userEvent.setup()
    const contact = document.createElement('section')
    contact.id = 'contact-form'
    contact.scrollIntoView = vi.fn()
    document.body.appendChild(contact)

    render(<Hero />)
    await user.click(screen.getByRole('button', { name: /выбрать программу/i }))

    expect(contact.scrollIntoView).toHaveBeenCalled()
    contact.remove()
  })

  it('calls optional callback', async () => {
    const user = userEvent.setup()
    const onSelectProgram = vi.fn()

    render(<Hero onSelectProgram={onSelectProgram} />)
    await user.click(screen.getByRole('button', { name: /выбрать программу/i }))

    expect(onSelectProgram).toHaveBeenCalledOnce()
  })
})
