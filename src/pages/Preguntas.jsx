import { Accordion, Container } from 'react-bootstrap'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import { preguntas } from '../data/preguntas.js'
import '../styles/preguntas.css'


function Preguntas() {
  return (
    <section className="section-pad">

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
