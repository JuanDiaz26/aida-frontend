import { useEffect, useState } from 'react'
import { avisarError, describirError } from '../utils/avisos.js'

// Hook propio: junta la lógica de pedido que repetían el calendario, el clima y el equipo.
// Consulta la API al montar el componente y devuelve los datos, si está cargando y el error.
// "pedir" tiene que definirse fuera del componente: si se creara en cada render,
// sería una función nueva cada vez y el efecto se volvería a ejecutar sin parar
export function useConsulta(pedir, servicio) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    async function consultar() {
      try {
        setDatos(await pedir(controlador.signal))
      } catch (errorPedido) {
        if (controlador.signal.aborted) return
        const mensaje = describirError(errorPedido, servicio)
        setError(mensaje)
        avisarError(mensaje)
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }

    consultar()

    // Si el componente se desmonta antes de que llegue la respuesta, se cancela el pedido
    return () => controlador.abort()
  }, [pedir, servicio])

  return { datos, cargando, error }
}
