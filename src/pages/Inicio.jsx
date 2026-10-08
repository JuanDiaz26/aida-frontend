import { Col, Container, Row } from 'react-bootstrap'
import CalendarioFeriados from '../components/CalendarioFeriados.jsx'
import Hero from '../components/Hero.jsx'
import ItemTema from '../components/ItemTema.jsx'
import Seo from '../components/Seo.jsx'
import { secciones } from '../data/secciones.js'

function Inicio() {
  return (
    <>
      <Seo descripcion="AIda es el asistente institucional de la UTN FRT. Consultá mesas de examen, inscripciones, correlativas y trámites académicos las 24 horas, con fuente oficial citada." />
      <Hero />

      <section className="section-pad pt-0" aria-labelledby="titulo-explorar">
        <Container>
          {/* En pantallas grandes el calendario queda al costado; en celular baja debajo de la grilla */}
          <Row className="g-4">
            <Col lg={8}>
              <h2 id="titulo-explorar" className="explorar-titulo">
                Explorá el sitio
              </h2>
              <Row as="ul" xs={1} sm={2} className="temas-grid g-0 list-unstyled mb-0">
                {secciones.map((seccion) => (
                  <Col as="li" key={seccion.ruta}>
                    <ItemTema numero={seccion.numero} texto={seccion.nombre} ruta={seccion.ruta} />
                  </Col>
                ))}
              </Row>
            </Col>

            <Col lg={4}>
              <CalendarioFeriados />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Inicio
