import { Accordion, Container } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import Seo from '../components/Seo.jsx'
import { preguntas } from '../data/preguntas.js'
import '../styles/preguntas.css'


function Preguntas() {
  return (
    <section className="section-pad">
      <Seo
        titulo="Preguntas frecuentes"
        descripcion="Dudas frecuentes sobre AIda, el asistente de la UTN FRT: qué responde, cómo consultar las mesas de examen, qué datos usa y qué pasa cuando no sabe la respuesta."
      />

      <Container>
        <EncabezadoSeccion numero="05" kicker="Preguntas" titulo="Dudas frecuentes" />

        <Accordion className="faq aparecer d1">
          {preguntas.map((item, indice) => (
            <Accordion.Item key={item.pregunta} eventKey={String(indice)}>
              <Accordion.Header className="faq-header">
                <span className="n">{String(indice + 1).padStart(2, '0')}</span>
                {item.pregunta}
              </Accordion.Header>
              <Accordion.Body className="faq-cuerpo">{item.respuesta}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}

export default Preguntas
