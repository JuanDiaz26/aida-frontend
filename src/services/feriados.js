import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export async function obtenerFeriados(anio, signal) {
  if (!API_URL) {
    throw new Error('Falta configurar VITE_API_URL en el archivo .env')
  }

  const respuesta = await axios.get(`${API_URL}/${anio}`, { signal })

  if (!Array.isArray(respuesta.data)) {
    throw new Error('La API de feriados devolvió un formato inesperado')
  }

  return respuesta.data
}
