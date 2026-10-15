import { Col, Row } from 'react-bootstrap'
import ItemTema from '../components/ItemTema.jsx'
import Pagina from '../components/Pagina.jsx'
import { temas } from '../data/temas.js'
import { numerar } from '../utils/texto.js'

function Temas() {
  return (
    <Pagina
      seoTitulo="Temas"
      descripcion="Qué le podés consultar a AIda: mesas de examen, inscripciones, correlativas, trámites administrativos, ingreso y calendario académico de la UTN FRT."
      numero="02"
      kicker="Temas"
      titulo="Qué podés consultar"
    >
      <Row as="ul" xs={1} sm={2} lg={3} className="g-0 border-top border-start list-unstyled aparecer d1">
        {temas.map((tema, indice) => (
          <Col as="li" key={tema} className="border-end border-bottom">
            <ItemTema numero={numerar(indice + 1)} texto={tema} />
          </Col>
        ))}
      </Row>
    </Pagina>
  )
}

export default Temas
