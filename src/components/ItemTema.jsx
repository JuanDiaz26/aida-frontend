import { Link } from 'react-router-dom'

const clases = 'tema superficie d-flex align-items-baseline gap-3 h-100 p-4'

// Si recibe una ruta se comporta como enlace (lo usa la portada), si no es solo texto
function ItemTema({ numero, texto, ruta }) {
  const contenido = (
    <>
      <span className="meta text-primary">{numero}</span>
      <b className="serif fw-semibold">{texto}</b>
    </>
  )

  if (ruta) {
    return (
      <Link to={ruta} className={`${clases} text-reset text-decoration-none`}>
        {contenido}
      </Link>
    )
  }

  return <span className={clases}>{contenido}</span>
}

export default ItemTema
