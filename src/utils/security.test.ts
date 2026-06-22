import { describe, expect, it } from 'vitest'
import {
  isContactFormValid,
  sanitizeInput,
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
} from './security'

describe('security utils', () => {
  it('sanitizes html and trims input', () => {
    expect(sanitizeInput('  <b>Hello</b>  ')).toBe('Hello')
  })

  it('limits input length', () => {
    expect(sanitizeInput('a'.repeat(20), 5)).toBe('aaaaa')
  })

  it('validates email', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('invalid')).toBe(false)
  })

  it('validates name', () => {
    expect(validateName('Катя')).toBe(true)
    expect(validateName('A')).toBe(false)
  })

  it('validates message length', () => {
    expect(validateMessage('Короткое сообщение для теста')).toBe(true)
    expect(validateMessage('коротко')).toBe(false)
  })

  it('returns errors for invalid contact form', () => {
    const errors = validateContactForm({ name: 'A', email: 'bad', message: 'short' })
    expect(errors.name).toBeDefined()
    expect(errors.email).toBeDefined()
    expect(errors.message).toBeDefined()
    expect(isContactFormValid(errors)).toBe(false)
  })

  it('returns no errors for valid contact form', () => {
    const errors = validateContactForm({
      name: 'Анна',
      email: 'anna@example.com',
      message: 'Хочу подобрать программу для дома',
    })
    expect(isContactFormValid(errors)).toBe(true)
  })
})
