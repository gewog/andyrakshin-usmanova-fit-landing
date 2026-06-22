import { FAQ_ITEMS } from '../data/faq'
import { useAccordion } from '../hooks/useAccordion'
import { appLogger } from '../utils/logger'
import './Faq.css'

export const Faq = () => {
  const { toggle, isOpen } = useAccordion()

  const handleToggle = (id: string) => {
    const willOpen = !isOpen(id)
    appLogger.info('faq_item_toggled', { id, open: willOpen })
    toggle(id)
  }

  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq__inner">
        <h2 id="faq-title" className="faq__title">
          Отвечаем на вопросы
        </h2>

        <div className="faq__list">
          {FAQ_ITEMS.map((item) => {
            const expanded = isOpen(item.id)

            return (
              <div key={item.id} className="faq__item">
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={expanded}
                  aria-controls={`faq-answer-${item.id}`}
                  onClick={() => handleToggle(item.id)}
                >
                  <span>{item.question}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {expanded ? '×' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  className={`faq__answer ${expanded ? 'faq__answer--open' : ''}`}
                  role="region"
                  aria-hidden={!expanded}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
