import axios from 'axios'

const API_URL = import.meta.env.VITE_CLIMA_API_URL

// Coordenadas de San Miguel de Tucumán
const UBICACION = { latitude: -26.8083, longitude: -65.2176 }

// Devuelve el clima actual y la máxima y mínima del día
export async function obtenerClima(signal) {
  if (!API_URL) {
    throw new Error('Falta configurar VITE_CLIMA_API_URL en el archivo .env')
  }

  // Axios arma la query string a partir de params: ?latitude=...&longitude=...
  const respuesta = await axios.get(API_URL, {
    params: {
      ...UBICACION,
      current: 'temperature_2m,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone: 'America/Argentina/Tucuman',
      forecast_days: 1,
    },
    signal,
  })

  return respuesta.data
}
