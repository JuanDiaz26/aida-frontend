import { Col, Container, Row } from 'react-bootstrap'
import Logo from './Logo.jsx'
import { integrantes } from '../data/integrantes.js'
import '../styles/pie.css'

function Pie() {
  return (
    <footer className="pie">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={5}>
            <p className="pie-marca">
              Asistente Institucional <span className="accent">AI</span>da
            </p>
            <Logo className="pie-logo" alt="Logo de AIda, asistente institucional de la UTN FRT" />
          </Col>

          <Col xs={12} sm={6} md className="pie-col">
            <h2>Institución</h2>
            <p>Universidad Tecnológica Nacional</p>
            <p>Facultad Regional Tucumán</p>
            <p>Tecnicatura Universitaria en Programación</p>
          </Col>

          <Col xs={12} sm={6} md className="pie-col">
            <h2>Equipo</h2>
            {integrantes.map((integrante) => (
              <p key={integrante.github}>
                {integrante.apellido}, <b>{integrante.nombre}</b>
              </p>
            ))}
            <p>
              Año: <b>2026</b>
            </p>
          </Col>
        </Row>

        <div className="pie-fondo">
          <span>
            <span className="accent">$</span> echo "asistente institucional" — 2026
          </span>
          <span>Trabajo Final — Tecnicatura Universitaria en Programación</span>
        </div>
      </Container>
    </footer>
  )
}

export default Pie
