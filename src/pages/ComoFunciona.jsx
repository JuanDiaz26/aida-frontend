import GrillaTarjetas from '../components/GrillaTarjetas.jsx'
import Pagina from '../components/Pagina.jsx'
import { reglas } from '../data/reglas.js'

function ComoFunciona() {
  return (
    <Pagina
      seoTitulo="Cómo funciona"
      descripcion="Las tres reglas con las que AIda responde: datos exactos desde la base de datos, documentos oficiales citados y derivación cuando no hay evidencia suficiente."
      numero="01"
      kicker="Cómo funciona"
      titulo="Tres reglas para responder"
    >
      <GrillaTarjetas items={reglas} className="aparecer d1" />
    </Pagina>
  )
}

export default ComoFunciona
