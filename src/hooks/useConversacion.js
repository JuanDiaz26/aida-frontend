import { useEffect, useRef, useState } from 'react'
import { saludoChat } from '../data/respuestas.js'
import { obtenerRespuesta } from '../services/asistente.js'
import { guardar, leerGuardado } from '../utils/almacenamiento.js'

// sessionStorage: la conversación se conserva al cambiar de página y se borra al cerrar la pestaña
const CLAVE_CONVERSACION = 'aida-conversacion'

const ERROR_RESPUESTA = 'No pude responder en este momento. Probá de nuevo en unos segundos.'

function obtenerHoraActual() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function crearMensaje(tipo, texto, fuente) {
  return { tipo, texto, fuente, hora: obtenerHoraActual() }
}

function crearConversacionNueva() {
  return [crearMensaje('respuesta', saludoChat)]
}

function leerConversacionGuardada() {
  const guardada = leerGuardado(CLAVE_CONVERSACION)
  return Array.isArray(guardada) && guardada.length > 0 ? guardada : crearConversacionNueva()
}

export function useConversacion() {
  const [mensajes, setMensajes] = useState(leerConversacionGuardada)
  const [redactando, setRedactando] = useState(false)
  const controladorRef = useRef(null)

  useEffect(() => {
    guardar(CLAVE_CONVERSACION, mensajes)
  }, [mensajes])

  // Si se cambia de página mientras redacta, se cancela la respuesta pendiente
  useEffect(() => () => controladorRef.current?.abort(), [])

  function agregar(mensaje) {
    setMensajes((anteriores) => [...anteriores, mensaje])
  }

  async function responder(consulta) {
    const controlador = new AbortController()
    controladorRef.current = controlador

    try {
      const respuesta = await obtenerRespuesta(consulta, controlador.signal)
      agregar(crearMensaje('respuesta', respuesta.texto, respuesta.fuente))
    } catch {
      if (controlador.signal.aborted) return
      agregar(crearMensaje('respuesta', ERROR_RESPUESTA))
    } finally {
      if (!controlador.signal.aborted) setRedactando(false)
    }
  }

  // Devuelve false si no se envió, para que la consola sepa si limpiar el campo
  function enviar(texto) {
    const limpio = texto.trim()
    if (limpio === '' || redactando) return false

    agregar(crearMensaje('consulta', limpio))
    setRedactando(true)
    responder(limpio)
    return true
  }

  function nuevaConversacion() {
    setMensajes(crearConversacionNueva())
  }

  return { mensajes, redactando, enviar, nuevaConversacion }
}
