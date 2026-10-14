function Metrica({ valor, etiqueta }) {
  return (
    <span className="d-flex flex-column">
      <b className="fs-4 text-success">{valor}</b>
      <span className="meta text-body-tertiary">{etiqueta}</span>
    </span>
  )
}

export default Metrica
