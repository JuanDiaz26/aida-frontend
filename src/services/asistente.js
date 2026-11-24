import { backend } from './backend.js'

// Cada conversación del backend tiene un id y un token privado ("acceso"):
// sin el token nadie más puede leerla ni escribir en ella
function adaptarRespuesta(datos) {
  const titulos = new Set()
  const fuentes = (datos.fuentes ?? [])
    .filter((fuente) => !titulos.has(fuente.titulo) && titulos.add(fuente.titulo))
    .map((fuente) => ({ titulo: fuente.titulo, url: fuente.url ?? null }))

  return { texto: datos.respuesta, fuentes, derivada: Boolean(datos.derivada) }
}

async function iniciarConversacion(consulta, signal) {
  const { data } = await backend.post('/chat', { canal: 'WEB', mensaje: consulta }, { signal })
  return { ...adaptarRespuesta(data), acceso: { id: data.id, token: data.tokenConversacion } }
}

export async function obtenerRespuesta(consulta, acceso, signal) {
  if (!acceso) return iniciarConversacion(consulta, signal)

  try {
    const { data } = await backend.post(
      `/chat/${acceso.id}/mensajes`,
      { mensaje: consulta },
      { headers: { 'x-conversacion-token': acceso.token }, signal },
    )
    return { ...adaptarRespuesta(data), acceso }
  } catch (error) {
    // Si la conversación se cerró o ya no existe, la consulta sigue en una nueva
    if ([400, 403, 404].includes(error.response?.status)) return iniciarConversacion(consulta, signal)
    throw error
  }
}

export async function cerrarConversacion(acceso) {
  try {
    await backend.post(`/chat/${acceso.id}/cerrar`, null, {
      headers: { 'x-conversacion-token': acceso.token },
    })
  } catch {
    // Si no se pudo cerrar, el backend la deja abierta: no afecta a la conversación nueva
  }
}

// Respuestas que el personal ya cargó para las derivaciones de esta conversación
export async function obtenerRespuestasDelPersonal(acceso, signal) {
  const { data } = await backend.get(`/chat/${acceso.id}`, {
    headers: { 'x-conversacion-token': acceso.token },
    signal,
  })
  return (data.derivaciones ?? []).filter((derivacion) => derivacion.estado === 'RESUELTA' && derivacion.respuesta)
}
