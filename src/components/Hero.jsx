import { Fragment } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Logo from './Logo.jsx'
import Metrica from './Metrica.jsx'
import '../styles/portada.css'

const temas = ['Mesas', 'Inscripciones', 'Correlativas', 'Trámites', 'Calendario']

const metricas = [
  { valor: '24', etiqueta: 'horas disponible' },
  { valor: '06', etiqueta: 'temas cubiertos' },
  { valor: '2026', etiqueta: 'trabajo final' },
]

function Hero() {
  return (
    <Container as="header" className="hero" id="inicio">
      <Row className="align-items-center g-5">
        <Col xs={12} lg>
          <div className="hero-tag aparecer">
            <span className="dot" /> UTN · Facultad Regional Tucumán
          </div>

          <h1 className="aparecer d1">
            Asistente Institucional <span className="accent">AI</span>da
            <span className="cursor" />
          </h1>

          <p className="hero-sub aparecer d2">
            {temas.map((tema, indice) => (
              <Fragment key={tema}>
                {indice > 0 && <span className="sep">·</span>}
                {tema}
              </Fragment>
            ))}
          </p>

          <p className="hero-tagline aparecer d3">
            Sistema de gestión de consultas y conocimiento académico con panel web y
            asistente conversacional basado en IA para la Facultad Regional Tucumán.
          </p>

          <div className="hero-meta aparecer d4">
            {metricas.map((metrica) => (
              <Metrica key={metrica.etiqueta} valor={metrica.valor} etiqueta={metrica.etiqueta} />
            ))}
          </div>

          <Button variant="" href="#asistente" className="hero-cta aparecer d4">
            Consultar ahora <span aria-hidden="true">›</span>
          </Button>
        </Col>

        <Col xs={12} lg="auto">
          <figure className="hero-logo-marco aparecer d2 mb-0">
            <Logo alt="Logo de AIda, asistente institucional de la UTN FRT" />
            <figcaption className="hero-logo-pie">Asistente Institucional De Alumnos</figcaption>
          </figure>
        </Col>
      </Row>
    </Container>
  )
}

export default Hero
