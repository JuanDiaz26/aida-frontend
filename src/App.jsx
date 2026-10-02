import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ComoFunciona from './pages/ComoFunciona.jsx'
import Inicio from './pages/Inicio.jsx'

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
    <Routes>
      <Route element={<Layout tema={tema} onCambiarTema={cambiarTema} />}>
        <Route index element={<Inicio />} />
        <Route path="como-funciona" element={<ComoFunciona />} />
      </Route>
    </Routes>
  )
}

export default App
