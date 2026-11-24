// Si el dato guardado está dañado o el navegador bloquea el almacenamiento,
// se sigue funcionando como si no hubiera nada guardado
export function leerGuardado(clave) {
  try {
    const guardado = sessionStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    return null
  }
}

export function guardar(clave, valor) {
  try {
    sessionStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // Sin espacio o almacenamiento bloqueado: el sitio anda igual, solo no recuerda el dato
  }
}
