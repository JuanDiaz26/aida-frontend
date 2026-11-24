import { respuestaPorDefecto, respuestasChat } from '../data/respuestas.js'
import { normalizarTexto } from '../utils/texto.js'

// Por ahora responde por palabras clave. Al conectar el backend solo cambia este archivo:
// la consola y el hook siguen recibiendo una promesa con { texto, fuente }
const DEMORA = 700

function buscarRespuesta(consulta) {
  const consultaNormalizada = normalizarTexto(consulta)
  const coincidencia = respuestasChat.find((item) =>
    item.palabras.some((palabra) => consultaNormalizada.includes(palabra)),
  )
  return coincidencia || respuestaPorDefecto
}

export function obtenerRespuesta(consulta, signal) {
  return new Promise((resolver, rechazar) => {
    const espera = setTimeout(() => resolver(buscarRespuesta(consulta)), DEMORA)

    signal?.addEventListener('abort', () => {
      clearTimeout(espera)
      rechazar(new DOMException('Consulta cancelada', 'AbortError'))
    })
  })
}
