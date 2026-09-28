import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import Navegacion from './components/Navegacion.jsx'

const CLAVE_TEMA = 'aida-tema'

function App() {
  // El oscuro es el tema principal: solo se sale de ahí por elección explícita
  const [tema, setTema] = useState(() => localStorage.getItem(CLAVE_TEMA) || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', tema)
    localStorage.setItem(CLAVE_TEMA, tema)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', tema === 'dark' ? '#0d0d0d' : '#eef1f2')
  }, [tema])

  function cambiarTema() {
    setTema((actual) => (actual === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <Navegacion tema={tema} onCambiarTema={cambiarTema} />
      <Hero />
    </>
  )
}

export default App
