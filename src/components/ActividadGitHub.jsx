import { useState } from 'react'
import { contarPorSemana } from '../utils/actividad.js'

function formatearDia(fecha) {
  return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}

// Gráfico de barras con los commits de cada semana, como la actividad de un perfil de GitHub.
// Va dentro del texto de la tarjeta, que es un <p>: por eso usa <span> y no <div>
function ActividadGitHub({ fechas }) {
  // Igual que en el calendario: la fecha de hoy se toma una sola vez, al montar
  const [hoy] = useState(() => new Date())
  const semanas = contarPorSemana(fechas, hoy)
  const total = semanas.reduce((suma, semana) => suma + semana.commits, 0)
  const maximo = Math.max(...semanas.map((semana) => semana.commits), 1)

  return (
    <span className="d-block mt-3 mb-3">
      <span className="d-block meta mb-2">Actividad en AIda · {total} commits</span>

      <span
        className="actividad d-flex align-items-end gap-1"
        role="img"
        aria-label={`${total} commits en los repositorios de AIda, agrupados por semana`}
      >
        {semanas.map((semana) => (
          <span
            key={semana.inicio.toISOString()}
            className={`flex-fill rounded-1 bg-success ${semana.commits === 0 ? 'bg-opacity-25' : ''}`}
            // La semana con más commits ocupa toda la altura y el resto, en proporción
            style={{ height: semana.commits === 0 ? '2px' : `${Math.max((semana.commits / maximo) * 100, 8)}%` }}
            title={`Semana del ${formatearDia(semana.inicio)}: ${semana.commits} ${semana.commits === 1 ? 'commit' : 'commits'}`}
          />
        ))}
      </span>

      <span className="d-flex justify-content-between meta text-body-tertiary mt-2">
        <span>{formatearDia(semanas[0].inicio)}</span>
        <span>Hoy</span>
      </span>
    </span>
  )
}

export default ActividadGitHub
