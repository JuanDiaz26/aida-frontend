import axios from 'axios'

const API_URL = import.meta.env.VITE_GITHUB_API_URL

// Los dos repositorios de AIda: de acá salen los commits de cada integrante
const REPOS_AIDA = ['lazartej71/AIda', 'JuanDiaz26/aida-frontend']

// Trae el perfil del usuario y sus commits en cada repositorio de AIda.
// Promise.all lanza los tres pedidos juntos y espera a que lleguen todos
async function obtenerIntegrante(usuario, signal) {
  const [perfil, ...commitsPorRepo] = await Promise.all([
    axios.get(`${API_URL}/users/${usuario}`, { signal }),
    ...REPOS_AIDA.map((repo) =>
      axios.get(`${API_URL}/repos/${repo}/commits`, { params: { author: usuario, per_page: 100 }, signal }),
    ),
  ])

  // De cada commit solo interesa la fecha, para armar el gráfico de actividad
  const fechasCommits = commitsPorRepo.flatMap((respuesta) =>
    respuesta.data.map((commit) => commit.commit.author.date),
  )

  return { ...perfil.data, fechasCommits }
}

// Pide los datos de todos los integrantes a la vez. Si un pedido falla, falla el conjunto
export async function obtenerPerfiles(usuarios, signal) {
  if (!API_URL) {
    throw new Error('Falta configurar VITE_GITHUB_API_URL en el archivo .env')
  }

  return Promise.all(usuarios.map((usuario) => obtenerIntegrante(usuario, signal)))
}
