import { ACHIEVEMENTS, GALLERY_IMAGES } from '../data/content'
import { useCarousel } from '../hooks/useCarousel'
import './About.css'

export const About = () => {
  const { index, goNext, goPrev } = useCarousel(GALLERY_IMAGES.length)

  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__inner">
        <h2 id="about-title" className="about__title">
          Доверьте свое тело чемпионке фитнес-бикини и тренеру{' '}
          <span className="about__highlight">Кате Усмановой</span>
        </h2>
        <p className="about__lead">
          С 2015 года создаёт топовые тренировки для идеальных ягодиц, плоского живота и
          стройности без жёстких диет. Уже более 580 000+ участниц тренируются с Катей, ведь
          она:
        </p>

        <ul className="about__achievements">
          {ACHIEVEMENTS.map((item) => (
            <li key={item} className="about__achievement">
              <span className="about__achievement-icon" aria-hidden="true">
                ✦
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="about__carousel" aria-roledescription="carousel" aria-label="Фото Кати Усмановой">
          <button
            type="button"
            className="about__carousel-btn about__carousel-btn--prev"
            onClick={goPrev}
            aria-label="Предыдущее фото"
          >
            ‹
          </button>
          <div className="about__carousel-viewport">
            <img
              className="about__carousel-image"
              src={GALLERY_IMAGES[index]}
              alt={`Катя Усманова — фото ${index + 1}`}
              loading="lazy"
            />
          </div>
          <button
            type="button"
            className="about__carousel-btn about__carousel-btn--next"
            onClick={goNext}
            aria-label="Следующее фото"
          >
            ›
          </button>
        </div>
        <p className="about__carousel-hint">Листайте вправо</p>
      </div>
    </section>
  )
}
