import { Hero } from './components/Hero'
import { About } from './components/About'
import { ContactForm } from './components/ContactForm'
import { Faq } from './components/Faq'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <a className="app__logo" href="#top">
          Фитнес с Катей Усмановой
        </a>
      </header>
      <main id="top">
        <Hero />
        <About />
        <ContactForm />
        <Faq />
      </main>
      <footer className="app__footer">
        <p>Учебный проект — воссоздание фрагментов лендинга usmanovafit.gymteam.ru</p>
      </footer>
    </div>
  )
}

export default App
