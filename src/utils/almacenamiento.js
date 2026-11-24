// Si el dato guardado está dañado o el navegador bloquea el almacenamiento,
// se sigue funcionando como si no hubiera nada guardado.
// "persistente" usa localStorage (sobrevive al cerrar la pestaña); si no, sessionStorage
function almacen(persistente) {
  return persistente ? localStorage : sessionStorage
}

export function leerGuardado(clave, persistente = false) {
  try {
    const guardado = almacen(persistente).getItem(clave)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    return null
  }
}

export function guardar(clave, valor, persistente = false) {
  try {
    almacen(persistente).setItem(clave, JSON.stringify(valor))
  } catch {
    // Sin espacio o almacenamiento bloqueado: el sitio anda igual, solo no recuerda el dato
  }
}

export function borrarGuardado(clave, persistente = false) {
  try {
    almacen(persistente).removeItem(clave)
  } catch {
    // Almacenamiento bloqueado: no había nada que borrar
  }
}
