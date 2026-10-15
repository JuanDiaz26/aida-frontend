import Swal from 'sweetalert2'

// Toast: un aviso chico en una esquina que se cierra solo, para no tapar la página.
// Los colores salen de las variables del tema, así acompaña al modo claro y al oscuro
const toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  icon: 'error',
  showConfirmButton: false,
  timer: 6000,
  timerProgressBar: true,
  background: 'var(--bg-elev)',
  color: 'var(--text)',
})

export function avisarError(mensaje) {
  toast.fire({ title: 'No pudimos cargar los datos', text: mensaje })
}

// Distingue si la API respondió con un error o si directamente no hubo conexión
export function describirError(error, servicio) {
  if (error.response) {
    return `El servicio de ${servicio} respondió con un error (código ${error.response.status}).`
  }
  if (error.request) {
    return `No pudimos conectarnos con el servicio de ${servicio}. Revisá tu conexión.`
  }
  return error.message
}
