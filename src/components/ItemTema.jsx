import { Link } from 'react-router-dom'
import '../styles/grilla-temas.css'

// Si recibe una ruta se comporta como enlace (lo usa la portada), si no es solo texto
function ItemTema({ numero, texto, ruta }) {
  const contenido = (
    <>
      <span className="n">{numero}</span>
      <b>{texto}</b>
    </>
  )

  if (ruta) {
    return (
      <Link to={ruta} className="tema">
        {contenido}
      </Link>
    )
  }

  return <span className="tema">{contenido}</span>
}

export default ItemTema
