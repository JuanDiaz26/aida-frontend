import { Container } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import GrillaTarjetas from '../components/GrillaTarjetas.jsx'
import { reglas } from '../data/reglas.js'

function ComoFunciona() {
  return (
    <section className="section-pad">
      <Container>
        <EncabezadoSeccion numero="01" kicker="Cómo funciona" titulo="Tres reglas para responder" />
        <GrillaTarjetas items={reglas} className="aparecer d1" />
      </Container>
    </section>
  )
}

export default ComoFunciona
