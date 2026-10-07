import { useState } from 'react'
import { Accordion, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import Seo from '../components/Seo.jsx'
import { preguntas } from '../data/preguntas.js'
import { normalizarTexto } from '../utils/texto.js'
import '../styles/preguntas.css'

// Datos estructurados de schema.org para que los buscadores reconozcan la página como FAQ.
// Salen de la misma lista que el acordeón, así no hay que mantener dos copias
const datosEstructurados = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: preguntas.map((item) => ({
    '@type': 'Question',
    name: item.pregunta,
    acceptedAnswer: { '@type': 'Answer', text: item.respuesta },
  })),
}

function Preguntas() {
  // Lo que el estudiante escribe en el buscador; cambia con cada tecla
  const [busqueda, setBusqueda] = useState('')

  // La lista filtrada no necesita su propio estado: se calcula a partir de busqueda
  // cada vez que el componente se vuelve a dibujar
  const textoBuscado = normalizarTexto(busqueda.trim())
  const preguntasFiltradas = preguntas.filter((item) =>
    normalizarTexto(`${item.pregunta} ${item.respuesta}`).includes(textoBuscado),
  )

  return (
    <section className="section-pad">
      <Seo
        titulo="Preguntas frecuentes"
        descripcion="Dudas frecuentes sobre AIda, el asistente de la UTN FRT: qué responde, cómo consultar las mesas de examen, qué datos usa y qué pasa cuando no sabe la respuesta."
      />
      <script type="application/ld+json">{JSON.stringify(datosEstructurados)}</script>

      <Container>
        <EncabezadoSeccion numero="05" kicker="Preguntas" titulo="Dudas frecuentes" />

        <Form.Control
          type="search"
          className="faq-buscador aparecer d1"
          placeholder="Buscar en las preguntas (ej: mesas, trámite)"
          aria-label="Buscar en las preguntas frecuentes"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
        />

        {preguntasFiltradas.length > 0 ? (
          <Accordion className="faq aparecer d2">
            {/* eventKey es la pregunta y no el índice: al filtrar, los índices cambian */}
            {preguntasFiltradas.map((item, indice) => (
              <Accordion.Item key={item.pregunta} eventKey={item.pregunta}>
                <Accordion.Header className="faq-header">
                  <span className="n">{String(indice + 1).padStart(2, '0')}</span>
                  {item.pregunta}
                </Accordion.Header>
                <Accordion.Body className="faq-cuerpo">{item.respuesta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p className="faq-vacio">
            No encontramos preguntas sobre "{busqueda}". Probá{' '}
            <Link to="/asistente">preguntarle a AIda</Link>.
          </p>
        )}
      </Container>
    </section>
  )
}

export default Preguntas
