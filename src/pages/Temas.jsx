import { Col, Container, Row } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import ItemTema from '../components/ItemTema.jsx'
import { temas } from '../data/temas.js'

function Temas() {
  return (
    <section className="section-pad">
      <Container>
        <EncabezadoSeccion numero="02" kicker="Temas" titulo="Qué podés consultar" />

        <Row as="ul" xs={1} sm={2} lg={3} className="temas-grid g-0 list-unstyled aparecer d1">
          {temas.map((tema, indice) => (
            <Col as="li" key={tema}>
              <ItemTema numero={String(indice + 1).padStart(2, '0')} texto={tema} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Temas
