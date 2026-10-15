import { useState } from 'react'
import { Alert, Button, Card, ListGroup, Spinner } from 'react-bootstrap'
import ItemFeriado from './ItemFeriado.jsx'
import { useConsulta } from '../hooks/useConsulta.js'
import { obtenerFeriados } from '../services/feriados.js'
import { MESES, convertirFecha } from '../utils/fechas.js'

// Fuera del componente para que sea siempre la misma función (ver useConsulta).
// Pide el año entero: moverse entre meses no vuelve a consultar, solo filtra lo que llegó
const pedirFeriados = (signal) => obtenerFeriados(new Date().getFullYear(), signal)

function CalendarioFeriados() {
  // La fecha se toma una sola vez, al montar: llamar a new Date() en cada render
  // daría un valor distinto cada vez. El año sale de la fecha real, así que
  // desde enero de 2027 el calendario muestra 2027 sin tocar el código
  const [hoy] = useState(() => new Date())
  const anioActual = hoy.getFullYear()
  const mesActual = hoy.getMonth()
  const [mes, setMes] = useState(mesActual)

  const { datos, cargando, error } = useConsulta(pedirFeriados, 'feriados')
  const feriados = datos || []

  const feriadosDelMes = feriados.filter((feriado) => convertirFecha(feriado.fecha).getMonth() === mes)

  // Un solo estado a la vez: cada condición se evalúa una vez, de arriba hacia abajo
  function contenido() {
    if (cargando) {
      return (
        <p className="d-flex align-items-center gap-2 small text-body-secondary py-3 mb-0">
          <Spinner as="span" animation="border" size="sm" variant="primary" role="status" aria-hidden="true" />
          Cargando feriados…
        </p>
      )
    }

    if (error) return <Alert variant="danger" className="small mt-3 mb-0">{error}</Alert>

    if (feriadosDelMes.length === 0) {
      return <p className="small text-body-secondary py-3 mb-0">No hay feriados en {MESES[mes].toLowerCase()}.</p>
    }

    return (
      <ListGroup as="ul" variant="flush">
        {feriadosDelMes.map((feriado) => (
          <ItemFeriado
            key={feriado.fecha + feriado.nombre}
            fecha={feriado.fecha}
            nombre={feriado.nombre}
            tipo={feriado.tipo}
            hoy={hoy}
          />
        ))}
      </ListGroup>
    )
  }

  return (
    <aside className="d-flex flex-column flex-grow-1" aria-labelledby="titulo-calendario">
      {/* El título va afuera de la tarjeta para quedar alineado con "Explorá el sitio" */}
      <h2 id="titulo-calendario" className="kicker mb-3">
        Calendario académico
      </h2>

      <Card className="flex-grow-1 px-4 py-3">
        <div className="d-flex align-items-center gap-2 pb-3 border-bottom">
          <Button
            variant="aida"
            size="sm"
            onClick={() => setMes((actual) => Math.max(actual - 1, 0))}
            disabled={mes === 0}
            aria-label="Mes anterior"
          >
            ‹
          </Button>
          <h3 className="serif fw-semibold fs-5 text-center flex-grow-1 mb-0" aria-live="polite">
            {MESES[mes]} {anioActual}
          </h3>
          <Button
            variant="aida"
            size="sm"
            onClick={() => setMes((actual) => Math.min(actual + 1, 11))}
            disabled={mes === 11}
            aria-label="Mes siguiente"
          >
            ›
          </Button>
        </div>

        {contenido()}

        {mes !== mesActual && (
          <Button variant="aida" size="sm" className="meta align-self-start mt-3" onClick={() => setMes(mesActual)}>
            Volver a hoy
          </Button>
        )}
      </Card>
    </aside>
  )
}

export default CalendarioFeriados
