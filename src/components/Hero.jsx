import { Fragment } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Metrica from './Metrica.jsx'

const temas = ['Mesas', 'Inscripciones', 'Correlativas', 'Trámites', 'Calendario']

const metricas = [
  { valor: '24', etiqueta: 'horas disponible' },
  { valor: '06', etiqueta: 'temas cubiertos' },
  { valor: '2026', etiqueta: 'trabajo final' },
]

function Hero() {
  return (
    <Container as="header" className="portada d-flex flex-column justify-content-center">
      <Row className="align-items-center g-5">
        <Col xs={12} lg>
          <div className="kicker d-flex align-items-center gap-2 mb-4 aparecer">
            <span className="punto-vivo" /> UTN · Facultad Regional Tucumán
          </div>

          <h1 className="portada-titulo serif fw-black mb-4 aparecer d1">
            Asistente Institucional <span className="text-primary">AI</span>da
            <span className="cursor text-primary" />
          </h1>

          <p className="fs-6 fw-medium mb-4 aparecer d2">
            {temas.map((tema, indice) => (
              <Fragment key={tema}>
                {indice > 0 && <span className="text-primary px-2">·</span>}
                {tema}
              </Fragment>
            ))}
          </p>

          <p className="prosa serif fst-italic fs-4 text-body-secondary aparecer d3">
            Sistema de gestión de consultas y conocimiento académico con panel web y asistente
            conversacional basado en IA para la Facultad Regional Tucumán.
          </p>

          <div className="d-flex flex-wrap gap-5 mt-5 aparecer d4">
            {metricas.map((metrica) => (
              <Metrica key={metrica.etiqueta} valor={metrica.valor} etiqueta={metrica.etiqueta} />
            ))}
          </div>

          <Button as={Link} to="/asistente" variant="acento" className="meta px-4 py-3 mt-5 aparecer d4">
            Consultar ahora <span aria-hidden="true">›</span>
          </Button>
        </Col>

        <Col xs={12} lg="auto">
          <figure className="logo-marco position-relative d-flex flex-column align-items-center border rounded-2 bg-body-tertiary p-4 mb-0 aparecer d2">
            <Logo className="portada-logo img-fluid position-relative" alt="Logo de AIda, asistente institucional de la UTN FRT" />
            <figcaption className="meta text-body-tertiary text-center position-relative w-100 border-top pt-3 mt-4">
              Asistente Institucional De Alumnos
            </figcaption>
          </figure>
        </Col>
      </Row>
    </Container>
  )
}

export default Hero
