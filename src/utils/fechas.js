export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const UN_DIA = 1000 * 60 * 60 * 24

// "2026-10-12" se arma a mano: new Date('2026-10-12') la interpreta en UTC
// y en Argentina (UTC-3) quedaría el 11 a las 21 hs, un día antes
export function convertirFecha(texto) {
  const [anio, mes, dia] = texto.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

export function diasHasta(fecha, hoy) {
  const inicioDeHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  return Math.round((fecha - inicioDeHoy) / UN_DIA)
}

export function describirDistancia(dias) {
  if (dias < 0) return 'ya pasó'
  if (dias === 0) return 'hoy'
  if (dias === 1) return 'mañana'
  return `en ${dias} días`
}

// "2026-11-24T10:40:12Z" → "24/11 07:40", en la hora de Argentina
export function formatearFechaHora(iso) {
  return new Date(iso).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
