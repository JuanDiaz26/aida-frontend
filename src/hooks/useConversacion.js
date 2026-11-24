import { useEffect, useRef, useState } from 'react'
import { saludoChat } from '../data/respuestas.js'
import { cerrarConversacion, obtenerRespuesta, obtenerRespuestasDelPersonal } from '../services/asistente.js'
import { mensajeDelBackend } from '../services/backend.js'
import { guardar, leerGuardado } from '../utils/almacenamiento.js'

// sessionStorage: la conversación se conserva al cambiar de página y se borra al cerrar la pestaña
const CLAVE_CONVERSACION = 'aida-conversacion'
const CLAVE_ACCESO = 'aida-conversacion-acceso'

const ERROR_RESPUESTA = 'No pude responder en este momento. Probá de nuevo en unos segundos.'

function obtenerHoraActual() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function crearMensaje(tipo, texto, extra = {}) {
  return { tipo, texto, hora: obtenerHoraActual(), ...extra }
}

function crearConversacionNueva() {
  return [crearMensaje('respuesta', saludoChat)]
}

function leerConversacionGuardada() {
  const guardada = leerGuardado(CLAVE_CONVERSACION)
  return Array.isArray(guardada) && guardada.length > 0 ? guardada : crearConversacionNueva()
}

function leerAccesoGuardado() {
  const acceso = leerGuardado(CLAVE_ACCESO)
  return acceso?.id && acceso?.token ? acceso : null
}

export function useConversacion() {
  const [mensajes, setMensajes] = useState(leerConversacionGuardada)
  const [acceso, setAcceso] = useState(leerAccesoGuardado)
  const [redactando, setRedactando] = useState(false)
  const controladorRef = useRef(null)

  useEffect(() => {
    guardar(CLAVE_CONVERSACION, mensajes)
  }, [mensajes])

  useEffect(() => {
    guardar(CLAVE_ACCESO, acceso)
  }, [acceso])

  // Al volver al chat se suman las respuestas que el personal ya dio a las consultas derivadas
  useEffect(() => {
    const guardado = leerAccesoGuardado()
    if (!guardado) return
    const controlador = new AbortController()
    obtenerRespuestasDelPersonal(guardado, controlador.signal)
      .then((resueltas) => {
        setMensajes((anteriores) => {
          const mostradas = new Set(anteriores.map((mensaje) => mensaje.derivacionId))
          const nuevas = resueltas
            .filter((derivacion) => !mostradas.has(derivacion.id))
            .map((derivacion) =>
              crearMensaje('respuesta', derivacion.respuesta, { etiqueta: 'personal', derivacionId: derivacion.id }),
            )
          return nuevas.length > 0 ? [...anteriores, ...nuevas] : anteriores
        })
      })
      .catch(() => {})
    return () => controlador.abort()
  }, [])

  // Si se cambia de página mientras redacta, se cancela la respuesta pendiente
  useEffect(() => () => controladorRef.current?.abort(), [])

  function agregar(mensaje) {
    setMensajes((anteriores) => [...anteriores, mensaje])
  }

  async function responder(consulta) {
    const controlador = new AbortController()
    controladorRef.current = controlador

    try {
      const respuesta = await obtenerRespuesta(consulta, acceso, controlador.signal)
      setAcceso(respuesta.acceso)
      agregar(crearMensaje('respuesta', respuesta.texto, { fuentes: respuesta.fuentes, derivada: respuesta.derivada }))
    } catch (error) {
      if (controlador.signal.aborted) return
      agregar(crearMensaje('respuesta', mensajeDelBackend(error, ERROR_RESPUESTA), { error: true }))
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
    if (acceso) cerrarConversacion(acceso)
    setAcceso(null)
    setMensajes(crearConversacionNueva())
  }

  return { mensajes, redactando, enviar, nuevaConversacion }
}
