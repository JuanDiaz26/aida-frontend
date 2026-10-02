function Mensaje({ tipo, texto, hora, fuente }) {
  return (
    <div className={`msg msg-${tipo}`}>
      <div className="msg-meta">
        <span className="msg-quien">{tipo === 'consulta' ? 'vos' : 'aida'}</span>
        <span>{hora}</span>
      </div>
      <div className="msg-cuerpo">
        {texto}
        {fuente && (
          <span className="msg-fuente">fuente: {fuente} · actualización: pendiente de carga</span>
        )}
      </div>
    </div>
  )
}

export default Mensaje
