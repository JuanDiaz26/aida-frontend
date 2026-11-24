import { backend } from './backend.js'

// Pedidos del panel del personal: todos necesitan la sesión iniciada (el token lo agrega backend.js)

export async function obtenerMetricas(signal) {
  const { data } = await backend.get('/metricas/resumen', { signal })
  return data
}

export async function obtenerDerivaciones(signal) {
  const { data } = await backend.get('/derivaciones', { params: { limite: 100 }, signal })
  return data.datos
}

export async function obtenerDerivacion(id, signal) {
  const { data } = await backend.get(`/derivaciones/${id}`, { signal })
  return data
}

export async function actualizarDerivacion(id, cambios) {
  const { data } = await backend.patch(`/derivaciones/${id}`, cambios)
  return data
}
