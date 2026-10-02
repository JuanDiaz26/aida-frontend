import { Col, Container, Row } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import { integrantes } from '../data/integrantes.js'

function Equipo() {
  return (
    <section className="section-pad">
      <Container>
        <EncabezadoSeccion numero="06" kicker="Equipo" titulo="Quiénes lo hacemos" />

        <p className="sec-intro aparecer d1">
          AIda es el trabajo final de la Tecnicatura Universitaria en Programación de la UTN
          Facultad Regional Tucumán.
        </p>

        <Row xs={1} md={2} className="tarjetas g-0 aparecer d2">
          {integrantes.map((integrante, indice) => (
            <Col key={integrante.github}>
              <Tarjeta
                indice={String(indice + 1).padStart(2, '0')}
                glifo="◉"
                etiqueta="Integrante · TUP"
                titulo={`${integrante.nombre} ${integrante.apellido}`}
              >
                GitHub:{' '}
                <a
                  href={`https://github.com/${integrante.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{integrante.github}
                </a>
              </Tarjeta>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Equipo
