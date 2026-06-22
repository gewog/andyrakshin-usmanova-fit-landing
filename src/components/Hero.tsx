import { scrollToElement } from '../utils/scrollTo'
import { appLogger } from '../utils/logger'
import './Hero.css'

interface HeroProps {
  onSelectProgram?: () => void
}

export const Hero = ({ onSelectProgram }: HeroProps) => {
  const handleSelectProgram = () => {
    appLogger.info('hero_cta_clicked')
    const scrolled = scrollToElement('contact-form')

    if (!scrolled) {
      appLogger.warn('contact_form_target_missing')
    }

    onSelectProgram?.()
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <h1 id="hero-title" className="hero__title">
          Приведите тело в форму с чемпионкой Катей Усмановой
        </h1>
        <p className="hero__subtitle">
          без диет, голода и запретов
          <br />
          с пользой для здоровья
        </p>
        <p className="hero__description">
          Похудеть, подтянуть попу и живот, набрать форму в зале, восстановиться после родов —
          тренировки и питание под вашу цель
        </p>
        <button type="button" className="hero__cta" onClick={handleSelectProgram}>
          Выбрать программу
        </button>
      </div>
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/hero-mobile.png" />
          <img
            className="hero__image"
            src="/assets/hero-desktop.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  )
}
