import axios from 'axios'

const API_URL = import.meta.env.VITE_GITHUB_API_URL

// Pide los perfiles de varios usuarios a la vez: Promise.all lanza todos los pedidos
// juntos y espera a que lleguen todos. Si uno falla, falla el conjunto
export async function obtenerPerfiles(usuarios, signal) {
  if (!API_URL) {
    throw new Error('Falta configurar VITE_GITHUB_API_URL en el archivo .env')
  }

  const respuestas = await Promise.all(
    usuarios.map((usuario) => axios.get(`${API_URL}/users/${usuario}`, { signal })),
  )

  return respuestas.map((respuesta) => respuesta.data)
}
