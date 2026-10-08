import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import ItemFeriado from './ItemFeriado.jsx'
import { obtenerFeriados } from '../services/feriados.js'
import { MESES, convertirFecha } from '../utils/fechas.js'
import '../styles/calendario.css'

// Distingue si la API respondió con un error o si directamente no hubo conexión
function describirError(error) {
  if (error.response) {
    return `El servicio de feriados respondió con un error (código ${error.response.status}).`
  }
  if (error.request) {
    return 'No pudimos conectarnos con el servicio de feriados. Revisá tu conexión.'
  }
  return error.message
}

function CalendarioFeriados() {
  // La fecha se toma una sola vez, al montar: llamar a new Date() en cada render
  // daría un valor distinto cada vez. El año sale de la fecha real, así que
  // desde enero de 2027 el calendario muestra 2027 sin tocar el código
  const [hoy] = useState(() => new Date())
  const anioActual = hoy.getFullYear()
  const mesActual = hoy.getMonth()

  const [feriados, setFeriados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mes, setMes] = useState(mesActual)

  // La API se consulta al mostrar el calendario y trae el año entero.
  // Moverse entre meses no vuelve a pedir nada: solo filtra lo que ya llegó
  useEffect(() => {
    const controlador = new AbortController()

    async function cargarFeriados() {
      try {
        setFeriados(await obtenerFeriados(anioActual, controlador.signal))
      } catch (errorPedido) {
        if (controlador.signal.aborted) return
        setError(describirError(errorPedido))
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }

    cargarFeriados()

    // Si el componente se desmonta antes de que llegue la respuesta, se cancela el pedido
    return () => controlador.abort()
  }, [anioActual])

  const feriadosDelMes = feriados.filter((feriado) => convertirFecha(feriado.fecha).getMonth() === mes)

  return (
    <aside className="calendario" aria-labelledby="titulo-calendario">
      <h2 id="titulo-calendario" className="calendario-titulo">
        Calendario académico
      </h2>

      {/* El título va afuera de la caja para quedar alineado con "Explorá el sitio" */}
      <div className="calendario-caja">
        <div className="calendario-nav">
          <Button
            variant=""
            className="calendario-flecha"
            onClick={() => setMes((actual) => Math.max(actual - 1, 0))}
            disabled={mes === 0}
            aria-label="Mes anterior"
          >
            ‹
          </Button>
          <h3 className="calendario-mes" aria-live="polite">
            {MESES[mes]} {anioActual}
          </h3>
          <Button
            variant=""
            className="calendario-flecha"
            onClick={() => setMes((actual) => Math.min(actual + 1, 11))}
            disabled={mes === 11}
            aria-label="Mes siguiente"
          >
            ›
          </Button>
        </div>

        {cargando && (
          <p className="calendario-estado">
            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            Cargando feriados…
          </p>
        )}

        {!cargando && error && <p className="calendario-estado calendario-error">{error}</p>}

        {!cargando && !error && feriadosDelMes.length === 0 && (
          <p className="calendario-estado">No hay feriados en {MESES[mes].toLowerCase()}.</p>
        )}

        {!cargando && !error && feriadosDelMes.length > 0 && (
          <ul className="calendario-lista list-unstyled">
            {feriadosDelMes.map((feriado) => (
              <ItemFeriado
                key={feriado.fecha + feriado.nombre}
                fecha={feriado.fecha}
                nombre={feriado.nombre}
                tipo={feriado.tipo}
                hoy={hoy}
              />
            ))}
          </ul>
        )}

        {mes !== mesActual && (
          <Button variant="" className="calendario-hoy" onClick={() => setMes(mesActual)}>
            Volver a hoy
          </Button>
        )}
      </div>
    </aside>
  )
}

export default CalendarioFeriados
