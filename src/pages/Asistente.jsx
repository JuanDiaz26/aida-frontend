import Consola from '../components/Consola.jsx'
import Pagina from '../components/Pagina.jsx'

function Asistente() {
  return (
    <Pagina
      seoTitulo="Asistente"
      descripcion="Chateá con AIda las 24 horas: respuestas con información oficial de la UTN FRT y derivación al personal de Alumnos cuando hace falta."
      numero="03"
      kicker="Asistente"
      titulo="Consola conversacional"
    >
      <p className="prosa small text-body-secondary mb-5 aparecer d1">
        Consultá las 24 horas, los 7 días de la semana. AIda responde con la información oficial de
        la facultad y cita la fuente. Si no tiene evidencia suficiente, no inventa: deriva tu consulta
        al personal de Alumnos.
      </p>

      <div className="aparecer d2">
        <Consola nombre="aida — consulta institucional" />
      </div>
    </Pagina>
  )
}

export default Asistente
