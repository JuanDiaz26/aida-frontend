// Cada página tiene un solo h1, que es el título de este encabezado
function EncabezadoSeccion({ numero, kicker, titulo }) {
  return (
    <div className="d-flex flex-wrap align-items-baseline gap-3 gap-sm-4 border-bottom pb-3 mb-5 aparecer">
      <span className="sec-num" aria-hidden="true">
        {numero}
      </span>
      <div>
        <span className="kicker d-block mb-2">{kicker}</span>
        <h1 className="serif fw-semibold fs-1 lh-1 mb-0">{titulo}</h1>
      </div>
    </div>
  )
}

export default EncabezadoSeccion
