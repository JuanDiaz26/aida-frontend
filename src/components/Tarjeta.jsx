import '../styles/tarjetas.css'

function Tarjeta({ indice, glifo, etiqueta, titulo, children }) {
  return (
    <article className="tarjeta">
      <span className="tarjeta-idx">{indice}</span>
      <span className="tarjeta-glifo" aria-hidden="true">
        {glifo}
      </span>
      <span className="tarjeta-tag">{etiqueta}</span>
      <h2>{titulo}</h2>
      <p>{children}</p>
    </article>
  )
}

export default Tarjeta
