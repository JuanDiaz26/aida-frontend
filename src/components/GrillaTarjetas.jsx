import { Col, Row } from 'react-bootstrap'
import Tarjeta from './Tarjeta.jsx'

// La usan Cómo funciona y Panel: cambia la lista que recibe, no el componente
function GrillaTarjetas({ items, className = '' }) {
  return (
    <Row xs={1} md={3} className={`tarjetas g-0 ${className}`}>
      {items.map((item, indice) => (
        <Col key={item.titulo}>
          <Tarjeta
            indice={String(indice + 1).padStart(2, '0')}
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
