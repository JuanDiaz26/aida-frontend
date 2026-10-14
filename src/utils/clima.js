// Open-Meteo informa el estado del cielo con los códigos de la Organización Meteorológica Mundial
const estados = [
  { codigos: [0], texto: 'Despejado', icono: '☀️' },
  { codigos: [1, 2], texto: 'Parcialmente nublado', icono: '⛅' },
  { codigos: [3], texto: 'Nublado', icono: '☁️' },
  { codigos: [45, 48], texto: 'Niebla', icono: '🌫️' },
  { codigos: [51, 53, 55, 56, 57], texto: 'Llovizna', icono: '🌦️' },
  { codigos: [61, 63, 65, 66, 67, 80, 81, 82], texto: 'Lluvia', icono: '🌧️' },
  { codigos: [71, 73, 75, 77, 85, 86], texto: 'Nieve', icono: '🌨️' },
  { codigos: [95, 96, 99], texto: 'Tormenta', icono: '⛈️' },
]

export function describirClima(codigo) {
  return estados.find((estado) => estado.codigos.includes(codigo)) || { texto: 'Sin datos', icono: '·' }
}
