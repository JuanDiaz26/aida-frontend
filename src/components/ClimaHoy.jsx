import { Alert, Card, Spinner } from 'react-bootstrap'
import { useConsulta } from '../hooks/useConsulta.js'
import { obtenerClima } from '../services/clima.js'
import { describirClima } from '../utils/clima.js'

function ClimaHoy() {
  // obtenerClima ya recibe solo el signal, así que se pasa directo al hook
  const { datos, cargando, error } = useConsulta(obtenerClima, 'clima')

  function contenido() {
    if (cargando) {
      return (
        <p className="d-flex align-items-center gap-2 small text-body-secondary mb-0">
          <Spinner as="span" animation="border" size="sm" variant="primary" role="status" aria-hidden="true" />
          Consultando el clima…
        </p>
      )
    }

    if (error) return <Alert variant="danger" className="small mb-0">{error}</Alert>

    const estado = describirClima(datos.current.weather_code)
    const maxima = Math.round(datos.daily.temperature_2m_max[0])
    const minima = Math.round(datos.daily.temperature_2m_min[0])

    return (
      <div className="d-flex align-items-center gap-3">
        <span className="fs-1 lh-1" aria-hidden="true">
          {estado.icono}
        </span>
        <div>
          <p className="fs-2 fw-bolder lh-1 mb-1">{Math.round(datos.current.temperature_2m)} °C</p>
          <p className="meta text-body-secondary mb-0">
            {estado.texto} · máx {maxima}° · mín {minima}°
          </p>
        </div>
      </div>
    )
  }

  return (
    <aside aria-labelledby="titulo-clima">
      <h2 id="titulo-clima" className="kicker mb-3">
        Hoy en San Miguel de Tucumán
      </h2>
      <Card className="px-4 py-3">{contenido()}</Card>
    </aside>
  )
}

export default ClimaHoy
