import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { About } from './About'

describe('About', () => {
  it('renders achievements and carousel', () => {
    render(<About />)

    expect(screen.getByRole('heading', { name: /доверьте свое тело/i })).toBeInTheDocument()
    expect(screen.getByText(/вице-чемпионка мира/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /катя усманова — фото 1/i })).toBeInTheDocument()
  })

  it('changes carousel image', async () => {
    const user = userEvent.setup()
    render(<About />)

    await user.click(screen.getByRole('button', { name: /следующее фото/i }))

    expect(screen.getByRole('img', { name: /катя усманова — фото 2/i })).toBeInTheDocument()
  })
})
