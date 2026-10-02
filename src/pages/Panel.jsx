import { Container } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import GrillaTarjetas from '../components/GrillaTarjetas.jsx'
import Seo from '../components/Seo.jsx'
import { herramientasPanel } from '../data/panel.js'

function Panel() {
  return (
    <section className="section-pad">
      <Seo
        titulo="Panel institucional"
        descripcion="Panel de gestión para Bedelía, Alumnado y Secretaría de la UTN FRT: carga de información oficial, consultas derivadas y reportes de uso."
      />
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
