import axios from 'axios'
import { leerGuardado } from '../utils/almacenamiento.js'

export const CLAVE_SESION = 'aida-sesion'
export const EVENTO_SESION_VENCIDA = 'aida-sesion-vencida'

// El servidor gratuito se duerme sin uso y el primer pedido puede tardar casi un minuto
export const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 70000,
})

backend.interceptors.request.use((config) => {
  if (!config.baseURL) {
    throw new Error('Falta configurar VITE_BACKEND_URL en el archivo .env')
  }
  const sesion = leerGuardado(CLAVE_SESION, true)
  if (sesion?.token) config.headers.Authorization = `Bearer ${sesion.token}`
  return config
})

// Un 401 con token significa que la sesión venció o se cerró en otro lado
backend.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401 && error.config?.headers?.Authorization) {
    window.dispatchEvent(new Event(EVENTO_SESION_VENCIDA))
  }
  return Promise.reject(error)
})

// El backend explica el error en "message" (texto o lista, si falló la validación)
export function mensajeDelBackend(error, porDefecto) {
  const mensaje = error.response?.data?.message
  if (Array.isArray(mensaje)) return mensaje.join(' ')
  if (typeof mensaje === 'string') return mensaje
  if (error.code === 'ECONNABORTED' || !error.response) {
    return 'No pudimos conectarnos con el servidor de AIda. Probá de nuevo en unos segundos.'
  }
  return porDefecto
}
