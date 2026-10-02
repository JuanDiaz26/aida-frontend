import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navegacion from './Navegacion.jsx'
import Pie from './Pie.jsx'

// Lo que se repite en todas las páginas: el navbar arriba y el pie abajo.
// En el medio, Outlet muestra la página que corresponde a la ruta actual
function Layout({ tema, onCambiarTema }) {
  const { pathname } = useLocation()

  // Al cambiar de página se vuelve arriba, si no queda el scroll de la página anterior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Navegacion tema={tema} onCambiarTema={onCambiarTema} />
      <main>
        <Outlet />
      </main>
      <Pie />
    </>
  )
}

export default Layout
