import { backend } from './backend.js'

export async function obtenerPreguntasFrecuentes(signal) {
  const { data } = await backend.get('/preguntas-frecuentes', { params: { limite: 100 }, signal })
  return data.datos.map(({ pregunta, respuesta, categoria }) => ({ pregunta, respuesta, categoria }))
}
