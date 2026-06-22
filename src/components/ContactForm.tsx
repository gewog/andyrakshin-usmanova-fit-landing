import { type FormEvent, useState } from 'react'
import { CONTACT_LINKS } from '../data/content'
import { appLogger } from '../utils/logger'
import {
  type ContactFormData,
  type ContactFormErrors,
  isContactFormValid,
  sanitizeInput,
  validateContactForm,
} from '../utils/security'
import './ContactForm.css'

const INITIAL_FORM: ContactFormData = {
  name: '',
  email: '',
  message: '',
}

export const ContactForm = () => {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
    setSubmitted(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const sanitized: ContactFormData = {
      name: sanitizeInput(form.name, 100),
      email: sanitizeInput(form.email, 254),
      message: sanitizeInput(form.message, 1000),
    }

    const validationErrors = validateContactForm(sanitized)

    if (!isContactFormValid(validationErrors)) {
      setErrors(validationErrors)
      appLogger.warn('contact_form_validation_failed', { fields: Object.keys(validationErrors) })
      return
    }

    appLogger.info('contact_form_submitted', {
      nameLength: sanitized.name.length,
      emailDomain: sanitized.email.split('@')[1] ?? 'unknown',
    })

    setForm(INITIAL_FORM)
    setErrors({})
    setSubmitted(true)
  }

  return (
    <section id="contact-form" className="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <h2 id="contact-title" className="contact__title">
          Не знаете, с чего начать?
        </h2>
        <p className="contact__lead">
          Напишите нам и подберём программу под вашу цель и уровень. Это бесплатно и быстро.
        </p>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <label className="contact__field">
            <span className="contact__label">Имя</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="contact__error" role="alert">
                {errors.name}
              </span>
            )}
          </label>

          <label className="contact__field">
            <span className="contact__label">E-mail</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="contact__error" role="alert">
                {errors.email}
              </span>
            )}
          </label>

          <label className="contact__field">
            <span className="contact__label">Сообщение</span>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={(event) => handleChange('message', event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" className="contact__error" role="alert">
                {errors.message}
              </span>
            )}
          </label>

          <button type="submit" className="contact__submit">
            Отправить заявку
          </button>

          {submitted && (
            <p className="contact__success" role="status">
              Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>
          )}
        </form>

        <div className="contact__links">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.href}
              className="contact__link"
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
