import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NOMBRE_SITIO = 'AIda | Asistente Institucional UTN FRT'
const URL_SITIO = 'https://aida-utn.vercel.app'

function cambiarAtributo(selector, atributo, valor) {
  document.querySelector(selector)?.setAttribute(atributo, valor)
}

// Cada página manda su propio título y descripción; las etiquetas ya existen en index.html
// y acá solo se actualiza su contenido para no duplicarlas
function Seo({ titulo, descripcion }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const tituloCompleto = titulo ? `${titulo} | AIda UTN FRT` : NOMBRE_SITIO
    const url = URL_SITIO + pathname

    document.title = tituloCompleto
    cambiarAtributo('meta[property="og:title"]', 'content', tituloCompleto)
    cambiarAtributo('meta[property="og:url"]', 'content', url)
    cambiarAtributo('link[rel="canonical"]', 'href', url)

    if (descripcion) {
      cambiarAtributo('meta[name="description"]', 'content', descripcion)
      cambiarAtributo('meta[property="og:description"]', 'content', descripcion)
    }
  }, [titulo, descripcion, pathname])

  return null
}

export default Seo
