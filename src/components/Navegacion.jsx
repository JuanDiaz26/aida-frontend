import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import SwitchTema from './SwitchTema.jsx'
import { secciones } from '../data/secciones.js'
import '../styles/navegacion.css'

function Navegacion({ tema, onCambiarTema }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <Navbar expand="lg" sticky="top" expanded={abierto} onToggle={setAbierto} collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setAbierto(false)}>
          <Logo className="brand-logo" alt="Logo de AIda" />
          <span>
            ~/<b>AI</b>da<b className="punto">.utnfrt</b>
          </span>
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2 order-lg-3">
          <SwitchTema tema={tema} onCambiar={onCambiarTema} />

          <Navbar.Toggle
            aria-controls="navMenu"
            aria-expanded={abierto}
            label="Abrir menú de navegación"
          >
            <span className="barra" />
            <span className="barra" />
            <span className="barra" />
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="navMenu" className="order-lg-2">
          <Nav className="ms-auto py-2 py-lg-0">
            {secciones.map((seccion) => (
              <Nav.Link key={seccion.ruta} as={NavLink} to={seccion.ruta} eventKey={seccion.ruta}>
                <span className="n">{seccion.numero}</span>
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
