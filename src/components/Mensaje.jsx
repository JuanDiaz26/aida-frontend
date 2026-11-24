import { Fragment } from 'react'

function Mensaje({ tipo, texto, hora, fuentes, derivada, error, etiqueta }) {
  const esRespuesta = tipo === 'respuesta'
  const listaFuentes = Array.isArray(fuentes) ? fuentes : []
  const color = error ? 'danger' : 'success'

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-2 meta text-body-tertiary">
        <span className={`border rounded-1 px-2 ${esRespuesta ? `border-${color} text-${color}` : ''}`}>
          {etiqueta ?? (esRespuesta ? 'aida' : 'vos')}
        </span>
        <span>{hora}</span>
      </div>
      <div
        className={`border-start border-2 ps-3 ${esRespuesta ? `border-${color} text-body` : 'text-body-secondary'}`}
      >
        <span className="texto-mensaje">{texto}</span>
        {listaFuentes.length > 0 && (
          <span className="d-block mt-2 small text-body-tertiary">
            <span className="meta">fuente: </span>
            {listaFuentes.map((fuente, indice) => (
              <Fragment key={fuente.titulo}>
                {indice > 0 && ' · '}
                {fuente.url ? (
                  <a href={fuente.url} className="link-secondary" target="_blank" rel="noopener noreferrer">
                    {fuente.titulo}
                  </a>
                ) : (
                  fuente.titulo
                )}
              </Fragment>
            ))}
          </span>
        )}
        {derivada && (
          <span className="d-block mt-2 meta text-warning">derivada al personal de Alumnos · la respuesta va a aparecer en esta conversación</span>
        )}
      </div>
    </div>
  )
}

export default Mensaje
