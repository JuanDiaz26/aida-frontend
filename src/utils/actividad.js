const UNA_SEMANA = 1000 * 60 * 60 * 24 * 7

// Lunes de la semana del primer commit del proyecto (26 de agosto de 2026)
const INICIO_PROYECTO = new Date(2026, 7, 24)

// Cuenta los commits de cada semana, desde que arrancó el proyecto hasta hoy.
// Devuelve una entrada por semana: [{ inicio: Date, commits: 3 }, ...]
export function contarPorSemana(fechas, hoy) {
  const cantidadSemanas = Math.floor((hoy - INICIO_PROYECTO) / UNA_SEMANA) + 1

  const semanas = Array.from({ length: cantidadSemanas }, (_, indice) => ({
    // Se suman días y no milisegundos: así cada semana arranca a las 0 hs del lunes
    inicio: new Date(INICIO_PROYECTO.getFullYear(), INICIO_PROYECTO.getMonth(), INICIO_PROYECTO.getDate() + indice * 7),
    commits: 0,
  }))

  fechas.forEach((fecha) => {
    const indice = Math.floor((new Date(fecha) - INICIO_PROYECTO) / UNA_SEMANA)
    // Si un commit quedara fuera del rango, semanas[indice] no existe y se ignora
    if (semanas[indice]) semanas[indice].commits++
  })

  return semanas
}
