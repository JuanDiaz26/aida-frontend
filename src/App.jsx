import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Asistente from './pages/Asistente.jsx'
import ComoFunciona from './pages/ComoFunciona.jsx'
import Equipo from './pages/Equipo.jsx'
import Inicio from './pages/Inicio.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'
import Panel from './pages/Panel.jsx'
import Temas from './pages/Temas.jsx'

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
        <Route path="temas" element={<Temas />} />
        <Route path="asistente" element={<Asistente />} />
        <Route path="panel" element={<Panel />} />
        <Route path="equipo" element={<Equipo />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
