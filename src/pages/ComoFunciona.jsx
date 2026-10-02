import { Container } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import GrillaTarjetas from '../components/GrillaTarjetas.jsx'
import Seo from '../components/Seo.jsx'
import { reglas } from '../data/reglas.js'

function ComoFunciona() {
  return (
    <section className="section-pad">
      <Seo
        titulo="Cómo funciona"
        descripcion="Las tres reglas con las que AIda responde: datos exactos desde la base de datos, documentos oficiales citados y derivación cuando no hay evidencia suficiente."
      />
      <Container>
        <EncabezadoSeccion numero="01" kicker="Cómo funciona" titulo="Tres reglas para responder" />
        <GrillaTarjetas items={reglas} className="aparecer d1" />
      </Container>
    </section>
  )
}

export default ComoFunciona
