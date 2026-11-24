import { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import Mensaje from './Mensaje.jsx'
import { sugerencias } from '../data/respuestas.js'
import { useConversacion } from '../hooks/useConversacion.js'

function Consola({ nombre }) {
  const { mensajes, redactando, enviar, nuevaConversacion } = useConversacion()
  const [consulta, setConsulta] = useState('')
  const registroRef = useRef(null)

  useEffect(() => {
    const registro = registroRef.current
    registro.scrollTop = registro.scrollHeight
  }, [mensajes, redactando])

  function manejarSubmit(evento) {
    evento.preventDefault()
    if (enviar(consulta)) setConsulta('')
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
            fuentes={mensaje.fuentes}
            derivada={mensaje.derivada}
            error={mensaje.error}
            etiqueta={mensaje.etiqueta}
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
            maxLength={2000}
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
