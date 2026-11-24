import { useState } from 'react'
import { Alert, Button, Col, ListGroup, Row, Spinner } from 'react-bootstrap'
import DetalleDerivacion from '../components/DetalleDerivacion.jsx'
import ItemDerivacion from '../components/ItemDerivacion.jsx'
import Pagina from '../components/Pagina.jsx'
import ResumenMetricas from '../components/ResumenMetricas.jsx'
import { useConsulta } from '../hooks/useConsulta.js'
import { useSesion } from '../hooks/useSesion.js'
import { obtenerDerivaciones, obtenerMetricas } from '../services/gestion.js'

const ORDEN_PRIORIDAD = { ALTA: 0, MEDIA: 1, BAJA: 2 }

// Abiertas: primero las urgentes y, a igual prioridad, las más viejas (HU07).
// Resueltas: primero las últimas que se respondieron
function ordenar(a, b) {
  if (a.estado === 'RESUELTA') return new Date(b.resueltaEn ?? 0) - new Date(a.resueltaEn ?? 0)
  return (
    (ORDEN_PRIORIDAD[a.prioridad] ?? 3) - (ORDEN_PRIORIDAD[b.prioridad] ?? 3) ||
    new Date(a.creadaEn) - new Date(b.creadaEn)
  )
}

function Bandeja() {
  const { usuario } = useSesion()
  const metricas = useConsulta(obtenerMetricas, 'métricas')
  const derivaciones = useConsulta(obtenerDerivaciones, 'derivaciones')
  // Las que se respondieron en esta visita reemplazan a las que llegaron del backend
  const [actualizadas, setActualizadas] = useState({})
  const [verResueltas, setVerResueltas] = useState(false)
  const [elegida, setElegida] = useState(null)

  const lista = (derivaciones.datos ?? []).map((derivacion) => actualizadas[derivacion.id] ?? derivacion)
  const abiertas = lista.filter((derivacion) => derivacion.estado !== 'RESUELTA')
  const visibles = (verResueltas ? lista.filter((derivacion) => derivacion.estado === 'RESUELTA') : abiertas).sort(ordenar)

  function actualizar(derivacion) {
    setActualizadas((anteriores) => ({ ...anteriores, [derivacion.id]: derivacion }))
  }

  return (
    <Pagina
      seoTitulo="Bandeja de derivaciones"
      descripcion="Bandeja de consultas derivadas por AIda al personal de Alumnos de la UTN FRT."
      numero="04"
      kicker="Panel · Bandeja"
      titulo="Consultas derivadas"
    >
      <p className="prosa small text-body-secondary mb-4 aparecer d1">
        Sesión de <b className="text-body">{usuario.nombre}</b> ({usuario.rol.toLowerCase()}). Estas son las
        consultas que AIda no pudo responder con evidencia. Al resolverlas, el estudiante ve la respuesta en
        su conversación.
      </p>

      {metricas.datos && <ResumenMetricas metricas={metricas.datos} pendientes={abiertas.length} />}
      {metricas.error && <Alert variant="danger" className="small">{metricas.error}</Alert>}

      <div className="d-flex flex-wrap gap-2 mb-3" role="group" aria-label="Filtrar derivaciones">
        <Button size="sm" variant={verResueltas ? 'aida' : 'acento'} aria-pressed={!verResueltas} onClick={() => setVerResueltas(false)}>
          Abiertas ({abiertas.length})
        </Button>
        <Button size="sm" variant={verResueltas ? 'acento' : 'aida'} aria-pressed={verResueltas} onClick={() => setVerResueltas(true)}>
          Resueltas ({lista.length - abiertas.length})
        </Button>
      </div>

      {derivaciones.cargando && (
        <p className="d-flex align-items-center gap-2 small text-body-secondary">
          <Spinner as="span" animation="border" size="sm" variant="primary" aria-hidden="true" />
          Cargando derivaciones…
        </p>
      )}
      {derivaciones.error && <Alert variant="danger" className="small">{derivaciones.error}</Alert>}

      {derivaciones.datos && (
        <Row className="g-4">
          <Col lg={5}>
            {visibles.length === 0 ? (
              <p className="border bg-body-tertiary small text-body-secondary p-4 mb-0">
                {verResueltas ? 'Todavía no hay derivaciones resueltas.' : 'No hay consultas esperando respuesta.'}
              </p>
            ) : (
              <ListGroup>
                {visibles.map((derivacion) => (
                  <ItemDerivacion
                    key={derivacion.id}
                    derivacion={derivacion}
                    activa={derivacion.id === elegida}
                    onElegir={setElegida}
                  />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col lg={7}>
            {elegida ? (
              <DetalleDerivacion key={elegida} id={elegida} onActualizada={actualizar} />
            ) : (
              <p className="small text-body-secondary">Elegí una derivación para ver la conversación y responderla.</p>
            )}
          </Col>
        </Row>
      )}
    </Pagina>
  )
}

export default Bandeja
