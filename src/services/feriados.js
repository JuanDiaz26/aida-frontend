import axios from 'axios'

// La URL sale del archivo .env: no queda escrita en ningún componente
const API_URL = import.meta.env.VITE_API_URL

// Devuelve la lista de feriados del año: [{ fecha: '2026-10-12', tipo, nombre }, ...]
export async function obtenerFeriados(anio, signal) {
  // Sin la variable, axios pediría "undefined/2026" al propio sitio y fallaría de forma confusa
  if (!API_URL) {
    throw new Error('Falta configurar VITE_API_URL en el archivo .env')
  }

  const respuesta = await axios.get(`${API_URL}/${anio}`, { signal })

  if (!Array.isArray(respuesta.data)) {
    throw new Error('La API de feriados devolvió un formato inesperado')
  }

  return respuesta.data
}
