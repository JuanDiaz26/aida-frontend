import { Navigate, useLocation } from 'react-router-dom'
import Pagina from './Pagina.jsx'
import { useSesion } from '../hooks/useSesion.js'

// Sin sesión manda a Ingresar y recuerda a dónde se quería ir; con un rol sin permiso lo avisa
function RutaProtegida({ roles, children }) {
  const { usuario } = useSesion()
  const { pathname } = useLocation()

  if (!usuario) return <Navigate to="/ingresar" replace state={{ desde: pathname }} />

  if (roles && !roles.includes(usuario.rol)) {
    return (
      <Pagina seoTitulo="Sin permisos" numero="403" kicker="Acceso" titulo="No tenés permisos">
        <p className="prosa small text-body-secondary mb-0">
          La cuenta {usuario.email} no pertenece al personal de Alumnos. Si deberías tener acceso,
          pedíselo a un administrador.
        </p>
      </Pagina>
    )
  }

  return children
}

export default RutaProtegida
