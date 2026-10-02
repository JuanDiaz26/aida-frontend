import { useEffect, useRef, useState } from 'react'
import Mensaje from './Mensaje.jsx'
import { respuestaPorDefecto, respuestasChat, saludoChat, sugerencias } from '../data/respuestas.js'
import '../styles/asistente.css'

// Quita tildes y pasa a minúsculas para que "trámite" y "tramite" coincidan igual
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function obtenerRespuesta(consulta) {
  const consultaNormalizada = normalizarTexto(consulta)
  const coincidencia = respuestasChat.find((item) =>
    item.palabras.some((palabra) => consultaNormalizada.includes(palabra)),
  )
  return coincidencia || respuestaPorDefecto
}

function obtenerHoraActual() {
  const ahora = new Date()
  const horas = String(ahora.getHours()).padStart(2, '0')
  const minutos = String(ahora.getMinutes()).padStart(2, '0')
  return `${horas}:${minutos}`
}

function Consola({ nombre }) {
  const [mensajes, setMensajes] = useState(() => [
    { tipo: 'respuesta', texto: saludoChat, hora: obtenerHoraActual() },
  ])
  const [consulta, setConsulta] = useState('')
  const [redactando, setRedactando] = useState(false)
  const registroRef = useRef(null)
  const esperaRef = useRef(null)

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

  function manejarSubmit(evento) {
    evento.preventDefault()
    enviar(consulta)
  }

  return (
    <div className="term consola">
      <div className="term-bar">
        <span className="d r" />
        <span className="d y" />
        <span className="d g" />
        <span className="name">{nombre}</span>
        <span className="estado">en línea</span>
      </div>

      <div
        className="consola-registro"
        ref={registroRef}
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
        {redactando && <p className="redactando">redactando</p>}
      </div>

      <div className="consola-chips">
        {sugerencias.map((sugerencia) => (
          <button key={sugerencia} className="chip" type="button" onClick={() => enviar(sugerencia)}>
            {sugerencia}
          </button>
        ))}
      </div>

      <form className="consola-entrada" onSubmit={manejarSubmit}>
        <span className="prompt" aria-hidden="true">
          $
        </span>
        <input
          type="text"
          value={consulta}
          onChange={(evento) => setConsulta(evento.target.value)}
          placeholder="Escribí tu consulta"
          aria-label="Escribí tu consulta"
          autoComplete="off"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Consola
