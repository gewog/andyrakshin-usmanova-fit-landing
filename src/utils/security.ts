const HTML_TAG_PATTERN = /<[^>]*>/g
const CONTROL_CHARS_PATTERN = /[\u0000-\u001F\u007F]/g
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const sanitizeInput = (value: string, maxLength = 500): string =>
  value
    .replace(HTML_TAG_PATTERN, '')
    .replace(CONTROL_CHARS_PATTERN, '')
    .trim()
    .slice(0, maxLength)

export const validateEmail = (email: string): boolean => EMAIL_PATTERN.test(email.trim())

export const validateName = (name: string): boolean => {
  const sanitized = sanitizeInput(name, 100)
  return sanitized.length >= 2 && sanitized.length <= 100
}

export const validateMessage = (message: string): boolean => {
  const sanitized = sanitizeInput(message, 1000)
  return sanitized.length >= 10 && sanitized.length <= 1000
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {}

  if (!validateName(data.name)) {
    errors.name = 'Введите имя (от 2 до 100 символов)'
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Введите корректный e-mail'
  }

  if (!validateMessage(data.message)) {
    errors.message = 'Сообщение должно содержать от 10 до 1000 символов'
  }

  return errors
}

export const isContactFormValid = (errors: ContactFormErrors): boolean =>
  Object.keys(errors).length === 0
