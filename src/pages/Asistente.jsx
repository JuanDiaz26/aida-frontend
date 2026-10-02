import { Container } from 'react-bootstrap'
import Consola from '../components/Consola.jsx'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'

function Asistente() {
  return (
    <section className="section-pad">
      <Container>
        <EncabezadoSeccion numero="03" kicker="Asistente" titulo="Consola conversacional" />

        <p className="sec-intro aparecer d1">
          Consultá las 24 horas, los 7 días de la semana. El asistente te responderá con
          información oficial y te derivará al panel si es necesario.
        </p>

        <div className="aparecer d2">
          <Consola nombre="aida — consulta institucional" />
        </div>
      </Container>
    </section>
  )
}

export default Asistente
