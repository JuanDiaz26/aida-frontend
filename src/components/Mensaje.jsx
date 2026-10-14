function Mensaje({ tipo, texto, hora, fuente }) {
  const esRespuesta = tipo === 'respuesta'

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-2 meta text-body-tertiary">
        <span className={`border rounded-1 px-2 ${esRespuesta ? 'border-success text-success' : ''}`}>
          {esRespuesta ? 'aida' : 'vos'}
        </span>
        <span>{hora}</span>
      </div>
      <div className={`border-start border-2 ps-3 ${esRespuesta ? 'border-success text-body' : 'text-body-secondary'}`}>
        {texto}
        {fuente && (
          <span className="d-block mt-2 meta text-body-tertiary">
            fuente: {fuente} · actualización: pendiente de carga
          </span>
        )}
      </div>
    </div>
  )
}

export default Mensaje
