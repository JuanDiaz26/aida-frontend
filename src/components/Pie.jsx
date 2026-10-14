import { Col, Container, Row } from 'react-bootstrap'
import Logo from './Logo.jsx'
import { integrantes } from '../data/integrantes.js'

function Pie() {
  return (
    <footer className="pie position-relative z-1 border-top py-5 mt-4">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={5}>
            <p className="serif fw-black fs-3 lh-sm mb-0">
              Asistente Institucional <span className="text-primary">AI</span>da
            </p>
            <Logo className="pie-logo mt-4" alt="Logo de AIda, asistente institucional de la UTN FRT" />
          </Col>

          <Col xs={12} sm={6} md>
            <h2 className="kicker mb-3">Institución</h2>
            <p className="small text-body-secondary mb-1">Universidad Tecnológica Nacional</p>
            <p className="small text-body-secondary mb-1">Facultad Regional Tucumán</p>
            <p className="small text-body-secondary mb-1">Tecnicatura Universitaria en Programación</p>
          </Col>

          <Col xs={12} sm={6} md>
            <h2 className="kicker mb-3">Equipo</h2>
            {integrantes.map((integrante) => (
              <p key={integrante.github} className="small text-body-secondary mb-1">
                {integrante.apellido}, <b className="text-body">{integrante.nombre}</b>
              </p>
            ))}
            <p className="small text-body-secondary mb-1">
              Año: <b className="text-body">2026</b>
            </p>
          </Col>
        </Row>

        <div className="d-flex flex-wrap justify-content-between gap-2 border-top pt-4 mt-5 small text-body-tertiary">
          <span>
            <span className="text-primary">$</span> echo "asistente institucional" — 2026
          </span>
          <span>Trabajo Final — Tecnicatura Universitaria en Programación</span>
        </div>
      </Container>
    </footer>
  )
}

export default Pie
