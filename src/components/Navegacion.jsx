import { useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import SwitchTema from './SwitchTema.jsx'
import { secciones } from '../data/secciones.js'
import { useSesion } from '../hooks/useSesion.js'

function Navegacion({ tema, onCambiarTema }) {
  const [abierto, setAbierto] = useState(false)
  const { usuario, salir } = useSesion()
  const navigate = useNavigate()

  // Primero se sale de la página: si se borrara la sesión estando en la bandeja,
  // la ruta protegida mandaría a Ingresar
  function cerrarSesion() {
    setAbierto(false)
    navigate('/')
    salir()
  }

  // En celular va dentro del menú, porque al lado del logo no entra
  function botonSesion(className) {
    return usuario ? (
      <Button variant="aida" size="sm" className={`meta ${className}`} onClick={cerrarSesion} title={`Sesión de ${usuario.email}`}>
        Salir
      </Button>
    ) : (
      <Button as={Link} to="/ingresar" variant="aida" size="sm" className={`meta ${className}`} onClick={() => setAbierto(false)}>
        Ingresar
      </Button>
    )
  }

  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={abierto}
      onToggle={setAbierto}
      collapseOnSelect
      className="navegacion border-bottom"
    >
      <Container className="gap-3">
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => setAbierto(false)}
          className="d-flex align-items-center gap-2 fs-6 fw-bolder"
        >
          <Logo className="brand-logo border rounded-1 p-1 bg-body-tertiary" alt="Logo de AIda" />
          <span>
            ~/<b className="text-primary">AI</b>da<span className="fw-medium text-body-tertiary">.utnfrt</span>
          </span>
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2 order-lg-3">
          {botonSesion('d-none d-lg-inline-block')}
          <SwitchTema tema={tema} onCambiar={onCambiarTema} />

          <Navbar.Toggle aria-controls="navMenu" aria-expanded={abierto} label="Abrir menú de navegación">
            <span className="barra" />
            <span className="barra" />
            <span className="barra" />
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="navMenu" className="order-lg-2">
          <Nav className="ms-auto gap-1 py-2 py-lg-0">
            {secciones.map((seccion) => (
              <Nav.Link
                key={seccion.ruta}
                as={NavLink}
                to={seccion.ruta}
                eventKey={seccion.ruta}
                className="text-nowrap"
              >
                <span className="text-success me-1">{seccion.numero}</span>
                {seccion.nombre}
              </Nav.Link>
            ))}
            {botonSesion('d-lg-none align-self-start mt-2')}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navegacion
