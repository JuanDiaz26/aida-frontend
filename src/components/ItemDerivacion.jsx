import { Badge, ListGroup } from 'react-bootstrap'
import { formatearFechaHora } from '../utils/fechas.js'

const COLOR_PRIORIDAD = { ALTA: 'danger', MEDIA: 'warning', BAJA: 'secondary' }
const NOMBRE_ESTADO = { PENDIENTE: 'pendiente', EN_CURSO: 'en curso', RESUELTA: 'resuelta' }

function ItemDerivacion({ derivacion, activa, onElegir }) {
  return (
    <ListGroup.Item
      action
      active={activa}
      onClick={() => onElegir(derivacion.id)}
      className="d-flex flex-column gap-1 py-3"
    >
      <span className="d-flex align-items-center gap-2 meta">
        <Badge bg={COLOR_PRIORIDAD[derivacion.prioridad] ?? 'secondary'}>{derivacion.prioridad}</Badge>
        <span className="text-body-tertiary">
          #{derivacion.id} · {NOMBRE_ESTADO[derivacion.estado] ?? derivacion.estado}
        </span>
      </span>
      <span className="small">{derivacion.motivo}</span>
      <span className="small text-body-tertiary">
        {formatearFechaHora(derivacion.creadaEn)} · {derivacion.conversacion?.canal ?? 'WEB'}
      </span>
    </ListGroup.Item>
  )
}

export default ItemDerivacion
