import { useState } from 'react'
import { Accordion, Alert, Button, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pagina from '../components/Pagina.jsx'
import { preguntas as preguntasSobreAida } from '../data/preguntas.js'
import { useConsulta } from '../hooks/useConsulta.js'
import { obtenerPreguntasFrecuentes } from '../services/preguntas.js'
import { normalizarTexto, numerar } from '../utils/texto.js'

const SOBRE_AIDA = 'Sobre AIda'
const TODAS = 'Todas'

const locales = preguntasSobreAida.map((item) => ({ ...item, categoria: SOBRE_AIDA }))

// Datos estructurados de schema.org para que los buscadores reconozcan la página como FAQ
function crearDatosEstructurados(preguntas) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: item.respuesta },
    })),
  }
}

function Preguntas() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState(TODAS)
  const { datos, cargando, error } = useConsulta(obtenerPreguntasFrecuentes, 'preguntas frecuentes')

  // Primero las de la facultad, que vienen del backend; al final las que explican AIda
  const preguntas = [...(datos ?? []), ...locales]
  const categorias = [TODAS, ...new Set(preguntas.map((item) => item.categoria))]

  const textoBuscado = normalizarTexto(busqueda.trim())
  const preguntasFiltradas = preguntas.filter(
    (item) =>
      (categoria === TODAS || item.categoria === categoria) &&
      normalizarTexto(`${item.pregunta} ${item.respuesta}`).includes(textoBuscado),
  )

  return (
    <Pagina
      seoTitulo="Preguntas frecuentes"
      descripcion="Preguntas frecuentes de la UTN FRT sobre calendario, mesas de examen, plan de estudio e ingreso, y dudas sobre cómo funciona AIda."
      numero="05"
      kicker="Preguntas"
      titulo="Dudas frecuentes"
    >
      <script type="application/ld+json">{JSON.stringify(crearDatosEstructurados(preguntas))}</script>

      <div className="d-flex flex-wrap gap-2 mb-3 aparecer d1" role="group" aria-label="Filtrar por categoría">
        {categorias.map((nombre) => (
          <Button
            key={nombre}
            size="sm"
            variant={nombre === categoria ? 'acento' : 'aida'}
            aria-pressed={nombre === categoria}
            onClick={() => setCategoria(nombre)}
          >
            {nombre}
          </Button>
        ))}
      </div>

      <Form.Control
        type="search"
        size="sm"
        className="bg-body-tertiary rounded-0 py-3 px-4 mb-3 aparecer d1"
        placeholder="Buscar en las preguntas (ej: mesas, ingreso)"
        aria-label="Buscar en las preguntas frecuentes"
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      {cargando && (
        <p className="d-flex align-items-center gap-2 small text-body-secondary mb-3">
          <Spinner as="span" animation="border" size="sm" variant="primary" aria-hidden="true" />
          Cargando las preguntas de la facultad…
        </p>
      )}
      {error && <Alert variant="danger" className="small mb-3">{error}</Alert>}

      {preguntasFiltradas.length > 0 ? (
        <Accordion className="faq aparecer d2">
          {/* eventKey es la pregunta y no el índice: al filtrar, los índices cambian */}
          {preguntasFiltradas.map((item, indice) => (
            <Accordion.Item key={item.pregunta} eventKey={item.pregunta}>
              <Accordion.Header>
                <span className="meta text-primary me-3">{numerar(indice + 1)}</span>
                {item.pregunta}
              </Accordion.Header>
              <Accordion.Body className="small text-body-secondary">
                <span className="d-block meta text-success mb-2">{item.categoria}</span>
                {item.respuesta}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <p className="border bg-body-tertiary small text-body-secondary p-4 mb-0">
          No encontramos preguntas sobre "{busqueda}". Probá{' '}
          <Link to="/asistente">preguntarle a AIda</Link>.
        </p>
      )}
    </Pagina>
  )
}

export default Preguntas
