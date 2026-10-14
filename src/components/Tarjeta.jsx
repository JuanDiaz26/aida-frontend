import { Card } from 'react-bootstrap'

function Tarjeta({ indice, glifo, etiqueta, titulo, children }) {
  return (
    <Card as="article" className="tarjeta superficie h-100 border-0 p-4">
      <span className="position-absolute top-0 end-0 m-4 small text-body-tertiary">{indice}</span>
      <span className="fs-3 lh-1 text-primary mb-3" aria-hidden="true">
        {glifo}
      </span>
      <span className="meta text-success mb-3">{etiqueta}</span>
      <Card.Title as="h2" className="serif fw-semibold fs-4 mb-2">
        {titulo}
      </Card.Title>
      <Card.Text className="small text-body-secondary">{children}</Card.Text>
    </Card>
  )
}

export default Tarjeta
