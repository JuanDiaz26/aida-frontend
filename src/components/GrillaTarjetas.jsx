import { Col, Row } from 'react-bootstrap'
import Tarjeta from './Tarjeta.jsx'
import { numerar } from '../utils/texto.js'

// La usan Cómo funciona y Panel: cambia la lista que recibe, no el componente
function GrillaTarjetas({ items, className = '' }) {
  return (
    <Row xs={1} md={3} className={`g-0 border-top border-start ${className}`}>
      {items.map((item, indice) => (
        <Col key={item.titulo} className="border-end border-bottom">
          <Tarjeta
            indice={numerar(indice + 1)}
            glifo={item.glifo}
            etiqueta={item.etiqueta}
            titulo={item.titulo}
          >
            {item.texto}
          </Tarjeta>
        </Col>
      ))}
    </Row>
  )
}

export default GrillaTarjetas
