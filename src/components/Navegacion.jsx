import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import SwitchTema from './SwitchTema.jsx'
import { secciones } from '../data/secciones.js'

function Navegacion({ tema, onCambiarTema }) {
  const [abierto, setAbierto] = useState(false)

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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navegacion
