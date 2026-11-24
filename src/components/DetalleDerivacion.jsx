import { useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import Mensaje from './Mensaje.jsx'
import { mensajeDelBackend } from '../services/backend.js'
import { actualizarDerivacion, obtenerDerivacion } from '../services/gestion.js'
import { formatearFechaHora } from '../utils/fechas.js'

// Se monta de nuevo con cada derivación elegida (key={id} en la bandeja), así arranca cargando
function DetalleDerivacion({ id, onActualizada }) {
  const [detalle, setDetalle] = useState(null)
  const [error, setError] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    const controlador = new AbortController()
    obtenerDerivacion(id, controlador.signal)
      .then(setDetalle)
      .catch((errorPedido) => {
        if (!controlador.signal.aborted) setError(mensajeDelBackend(errorPedido, 'No pudimos cargar la derivación.'))
      })
    return () => controlador.abort()
  }, [id])

  async function guardar(cambios) {
    setGuardando(true)
    setError('')
    try {
      const actualizada = await actualizarDerivacion(id, cambios)
      const completa = { ...detalle, ...actualizada, conversacion: detalle.conversacion }
      setDetalle(completa)
      onActualizada(completa)
    } catch (errorPedido) {
      setError(mensajeDelBackend(errorPedido, 'No pudimos guardar los cambios.'))
    } finally {
      setGuardando(false)
    }
  }

  function manejarSubmit(evento) {
    evento.preventDefault()
    guardar({ estado: 'RESUELTA', respuesta: respuesta.trim() })
  }

  if (!detalle) {
    return error ? (
      <Alert variant="danger" className="small">{error}</Alert>
    ) : (
      <p className="d-flex align-items-center gap-2 small text-body-secondary">
        <Spinner as="span" animation="border" size="sm" variant="primary" aria-hidden="true" />
        Cargando la conversación…
      </p>
    )
  }

  const mensajes = detalle.conversacion?.mensajes ?? []
  const resuelta = detalle.estado === 'RESUELTA'

  return (
    <Card className="p-4">
      <h2 className="serif fw-semibold fs-4 mb-1">Derivación #{detalle.id}</h2>
      <p className="small text-body-tertiary mb-4">
        {formatearFechaHora(detalle.creadaEn)} · prioridad {detalle.prioridad.toLowerCase()} · motivo: {detalle.motivo}
      </p>

      <h3 className="meta text-body-tertiary mb-3">Conversación</h3>
      <div className="d-flex flex-column gap-3 mb-4">
        {mensajes.length === 0 && <p className="small text-body-secondary mb-0">La conversación no tiene mensajes.</p>}
        {mensajes.map((mensaje) => (
          <Mensaje
            key={mensaje.id}
            tipo={mensaje.rol === 'ESTUDIANTE' ? 'consulta' : 'respuesta'}
            etiqueta={mensaje.rol === 'ESTUDIANTE' ? 'estudiante' : 'aida'}
            texto={mensaje.texto}
            hora={formatearFechaHora(mensaje.enviadoEn)}
            fuentes={mensaje.fuentes}
          />
        ))}
      </div>

      {error && <Alert variant="danger" className="small">{error}</Alert>}

      {resuelta ? (
        <div className="border-start border-2 border-primary ps-3">
          <span className="d-block meta text-primary mb-2">
            respuesta del personal{detalle.resueltaEn && ` · ${formatearFechaHora(detalle.resueltaEn)}`}
          </span>
          <span className="texto-mensaje small">{detalle.respuesta}</span>
        </div>
      ) : (
        <Form onSubmit={manejarSubmit}>
          <Form.Group className="mb-3" controlId={`respuesta-${detalle.id}`}>
            <Form.Label className="meta text-body-tertiary">Respuesta para el estudiante</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              maxLength={5000}
              value={respuesta}
              onChange={(evento) => setRespuesta(evento.target.value)}
              className="bg-body-tertiary rounded-0"
            />
          </Form.Group>
          <div className="d-flex flex-wrap gap-2">
            <Button type="submit" variant="acento" className="meta" disabled={guardando || respuesta.trim() === ''}>
              Responder y resolver
            </Button>
            {detalle.estado === 'PENDIENTE' && (
              <Button variant="aida" className="meta" disabled={guardando} onClick={() => guardar({ estado: 'EN_CURSO' })}>
                Marcar en curso
              </Button>
            )}
          </div>
        </Form>
      )}
    </Card>
  )
}

export default DetalleDerivacion
