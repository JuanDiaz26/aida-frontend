import { Container } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import GrillaTarjetas from '../components/GrillaTarjetas.jsx'
import { herramientasPanel } from '../data/panel.js'

function Panel() {
  return (
    <section className="section-pad">
      <Container>
        <EncabezadoSeccion numero="04" kicker="Panel" titulo="Gestión institucional" />

        <p className="sec-intro aparecer d1">
          Herramienta para Bedelía, Alumnado y Secretaría: carga y actualización de información
          oficial, bandeja de consultas priorizadas derivadas por el asistente, y métricas de uso.
        </p>

        <GrillaTarjetas items={herramientasPanel} className="aparecer d2" />
      </Container>
    </section>
  )
}

export default Panel
