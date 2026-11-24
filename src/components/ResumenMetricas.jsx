import { ListGroup } from 'react-bootstrap'
import Metrica from './Metrica.jsx'

// Resumen de los últimos días: cuánto se usó AIda y qué consultas se repiten (RF14)
function ResumenMetricas({ metricas, pendientes }) {
  const promedioMs = metricas.rendimiento?._avg?.duracionMs
  const frecuentes = (metricas.preguntasFrecuentes ?? []).slice(0, 5)

  const valores = [
    { valor: metricas.conversaciones, etiqueta: 'conversaciones' },
    { valor: metricas.mensajes, etiqueta: 'mensajes' },
    { valor: pendientes, etiqueta: 'derivaciones abiertas' },
    { valor: promedioMs ? `${(promedioMs / 1000).toFixed(1)} s` : '—', etiqueta: 'respuesta promedio' },
  ]

  return (
    <section className="border bg-body-tertiary p-4 mb-5" aria-labelledby="titulo-metricas">
      <h2 id="titulo-metricas" className="kicker mb-4">
        Últimos {metricas.periodo?.dias ?? 30} días
      </h2>
      <div className="d-flex flex-wrap gap-5 mb-4">
        {valores.map((item) => (
          <Metrica key={item.etiqueta} valor={item.valor} etiqueta={item.etiqueta} />
        ))}
      </div>

      {frecuentes.length > 0 && (
        <>
          <h3 className="meta text-body-tertiary mb-2">Consultas más frecuentes</h3>
          <ListGroup as="ol" variant="flush" numbered className="small">
            {frecuentes.map((item) => (
              <ListGroup.Item as="li" key={item.consulta} className="bg-transparent px-0">
                {item.consulta}{' '}
                <span className="text-body-tertiary">
                  · {item.cantidad} {item.cantidad === 1 ? 'vez' : 'veces'}
                  {item.sinRespuesta > 0 && <span className="text-warning"> · sin respuesta</span>}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </section>
  )
}

export default ResumenMetricas
