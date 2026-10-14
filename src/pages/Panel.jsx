import GrillaTarjetas from '../components/GrillaTarjetas.jsx'
import Pagina from '../components/Pagina.jsx'
import { herramientasPanel } from '../data/panel.js'

function Panel() {
  return (
    <Pagina
      seoTitulo="Panel institucional"
      descripcion="Panel de gestión para Bedelía, Alumnado y Secretaría de la UTN FRT: carga de información oficial, consultas derivadas y reportes de uso."
      numero="04"
      kicker="Panel"
      titulo="Gestión institucional"
    >
      <p className="prosa small text-body-secondary mb-5 aparecer d1">
        Herramienta para Bedelía, Alumnado y Secretaría: carga y actualización de información
        oficial, bandeja de consultas priorizadas derivadas por el asistente, y métricas de uso.
      </p>

      <GrillaTarjetas items={herramientasPanel} className="aparecer d2" />
    </Pagina>
  )
}

export default Panel
