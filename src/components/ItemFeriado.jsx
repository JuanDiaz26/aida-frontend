import { ListGroup } from 'react-bootstrap'
import { convertirFecha, describirDistancia, diasHasta } from '../utils/fechas.js'
import { numerar } from '../utils/texto.js'

function ItemFeriado({ fecha, nombre, tipo, hoy }) {
  const dia = convertirFecha(fecha)
  const dias = diasHasta(dia, hoy)

  return (
    <ListGroup.Item as="li" className={`d-flex align-items-baseline gap-3 px-0 py-3 ${dias < 0 ? 'opacity-50' : ''}`}>
      <time className="fw-bolder fs-3 lh-1 text-primary" dateTime={fecha}>
        {numerar(dia.getDate())}
      </time>
      <div>
        <p className="serif fw-semibold lh-sm mb-1">{nombre}</p>
        <p className="meta text-body-secondary mb-0">
          {tipo} · {describirDistancia(dias)}
        </p>
      </div>
    </ListGroup.Item>
  )
}

export default ItemFeriado
