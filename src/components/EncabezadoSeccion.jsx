import '../styles/secciones.css'

// Cada página tiene un solo h1, que es el título de este encabezado
function EncabezadoSeccion({ numero, kicker, titulo }) {
  return (
    <div className="sec-head aparecer">
      <span className="sec-num" aria-hidden="true">
        {numero}
      </span>
      <div>
        <span className="sec-kicker">{kicker}</span>
        <h1 className="sec-title">{titulo}</h1>
      </div>
    </div>
  )
}

export default EncabezadoSeccion
