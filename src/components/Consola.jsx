import { useEffect, useRef, useState } from 'react'
import Mensaje from './Mensaje.jsx'
import { respuestaPorDefecto, respuestasChat, saludoChat, sugerencias } from '../data/respuestas.js'
import { normalizarTexto } from '../utils/texto.js'
import '../styles/asistente.css'

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
        {/* Deshabilitado mientras redacta, para que la respuesta pendiente no caiga en la conversación nueva */}
        <button
          className="chip chip-nueva"
          type="button"
          onClick={nuevaConversacion}
          disabled={redactando}
        >
          ↺ Nueva conversación
        </button>
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
