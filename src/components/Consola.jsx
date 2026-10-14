import { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import Mensaje from './Mensaje.jsx'
import { respuestaPorDefecto, respuestasChat, saludoChat, sugerencias } from '../data/respuestas.js'
import { normalizarTexto } from '../utils/texto.js'

function obtenerRespuesta(consulta) {
  const consultaNormalizada = normalizarTexto(consulta)
  const coincidencia = respuestasChat.find((item) =>
    item.palabras.some((palabra) => consultaNormalizada.includes(palabra)),
  )
  return coincidencia || respuestaPorDefecto
}

// hour12: false para que quede "09:05" y no "09:05 a. m."
function obtenerHoraActual() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

// sessionStorage y no localStorage: la conversación dura lo que dura la visita,
// al cerrar la pestaña se borra (el tema, en cambio, se recuerda siempre)
const CLAVE_CONVERSACION = 'aida-conversacion'

function crearConversacionNueva() {
  return [{ tipo: 'respuesta', texto: saludoChat, hora: obtenerHoraActual() }]
}

// Si en esta pestaña ya había una conversación se retoma; si no, arranca con el saludo
function leerConversacionGuardada() {
  const guardada = sessionStorage.getItem(CLAVE_CONVERSACION)
  return guardada ? JSON.parse(guardada) : crearConversacionNueva()
}

function Consola({ nombre }) {
  const [mensajes, setMensajes] = useState(leerConversacionGuardada)
  const [consulta, setConsulta] = useState('')
  const [redactando, setRedactando] = useState(false)
  const registroRef = useRef(null)
  const esperaRef = useRef(null)

  // Cada vez que cambian los mensajes se guarda la conversación, así no se pierde al
  // cambiar de página. Escribir en el input no lo dispara: eso cambia consulta, no mensajes
  useEffect(() => {
    sessionStorage.setItem(CLAVE_CONVERSACION, JSON.stringify(mensajes))
  }, [mensajes])

  useEffect(() => {
    const registro = registroRef.current
    registro.scrollTop = registro.scrollHeight
  }, [mensajes, redactando])

  // Si se cambia de página mientras "redacta", se cancela la respuesta pendiente
  useEffect(() => () => clearTimeout(esperaRef.current), [])

  function enviar(texto) {
    const limpio = texto.trim()
    if (limpio === '' || redactando) return

    setMensajes((anteriores) => [
      ...anteriores,
      { tipo: 'consulta', texto: limpio, hora: obtenerHoraActual() },
    ])
    setConsulta('')
    setRedactando(true)

    esperaRef.current = setTimeout(() => {
      const respuesta = obtenerRespuesta(limpio)
      setMensajes((anteriores) => [
        ...anteriores,
        { tipo: 'respuesta', ...respuesta, hora: obtenerHoraActual() },
      ])
      setRedactando(false)
    }, 700)
  }

  function nuevaConversacion() {
    setMensajes(crearConversacionNueva())
  }

  function manejarSubmit(evento) {
    evento.preventDefault()
    enviar(consulta)
  }

  return (
    // data-bs-theme="dark": la consola es una terminal y se ve oscura en los dos temas
    <Card data-bs-theme="dark" className="consola bg-body text-body small rounded-3 overflow-hidden">
      <Card.Header className="d-flex align-items-center gap-2 py-2">
        <span className="punto-terminal rounded-circle bg-danger" />
        <span className="punto-terminal rounded-circle bg-warning" />
        <span className="punto-terminal rounded-circle bg-success" />
        <span className="ms-2 text-body-tertiary">{nombre}</span>
        <span className="ms-auto meta text-success">en línea</span>
      </Card.Header>

      <Card.Body
        ref={registroRef}
        className="consola-registro d-flex flex-column gap-4 overflow-auto"
        role="log"
        aria-live="polite"
        aria-label="Conversación con AIda"
      >
        {/* La lista solo crece al final, por eso alcanza con el índice como key */}
        {mensajes.map((mensaje, indice) => (
          <Mensaje
            key={indice}
            tipo={mensaje.tipo}
            texto={mensaje.texto}
            hora={mensaje.hora}
            fuente={mensaje.fuente}
          />
        ))}
        {redactando && (
          <p className="meta text-success d-flex align-items-center gap-2 mb-0">
            redactando <span className="cursor" />
          </p>
        )}
      </Card.Body>

      <div className="d-flex flex-wrap gap-2 p-3 border-top">
        {sugerencias.map((sugerencia) => (
          <Button key={sugerencia} variant="aida" size="sm" onClick={() => enviar(sugerencia)}>
            {sugerencia}
          </Button>
        ))}
        {/* Deshabilitado mientras redacta, para que la respuesta pendiente no caiga en la conversación nueva */}
        <Button
          variant="aida"
          size="sm"
          className="ms-auto text-body-tertiary"
          onClick={nuevaConversacion}
          disabled={redactando}
        >
          ↺ Nueva conversación
        </Button>
      </div>

      <Form onSubmit={manejarSubmit}>
        <InputGroup size="sm" className="border-top">
          <InputGroup.Text className="bg-transparent border-0 text-success" aria-hidden="true">
            $
          </InputGroup.Text>
          <Form.Control
            className="bg-transparent border-0 shadow-none py-3"
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
            placeholder="Escribí tu consulta"
            aria-label="Escribí tu consulta"
            autoComplete="off"
          />
          <Button type="submit" variant="aida" className="meta border-0 border-start rounded-0 px-4">
            Enviar
          </Button>
        </InputGroup>
      </Form>
    </Card>
  )
}

export default Consola
