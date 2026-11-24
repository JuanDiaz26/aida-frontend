import { useEffect, useState } from 'react'
import { SesionContext } from './sesion.js'
import { backend, CLAVE_SESION, EVENTO_SESION_VENCIDA } from '../services/backend.js'
import { borrarGuardado, guardar, leerGuardado } from '../utils/almacenamiento.js'

function leerSesionGuardada() {
  const sesion = leerGuardado(CLAVE_SESION, true)
  return sesion?.token && sesion?.usuario ? sesion : null
}

// Guarda quién inició sesión y lo comparte con todo el sitio (navbar, panel, rutas protegidas)
function SesionProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesionGuardada)

  function olvidarSesion() {
    borrarGuardado(CLAVE_SESION, true)
    setSesion(null)
  }

  // Al abrir el sitio se confirma con el backend que el token sigue vigente (dura una hora)
  // y se actualizan los datos del usuario, por si le cambiaron el rol
  useEffect(() => {
    const guardada = leerSesionGuardada()
    if (!guardada) return
    const controlador = new AbortController()
    backend
      .get('/auth/me', { signal: controlador.signal })
      .then(({ data }) => {
        const actualizada = { ...guardada, usuario: data }
        guardar(CLAVE_SESION, actualizada, true)
        setSesion(actualizada)
      })
      .catch(() => {})
    return () => controlador.abort()
  }, [])

  // El cliente del backend avisa cuando un pedido devuelve 401 con la sesión vencida
  useEffect(() => {
    window.addEventListener(EVENTO_SESION_VENCIDA, olvidarSesion)
    return () => window.removeEventListener(EVENTO_SESION_VENCIDA, olvidarSesion)
  }, [])

  async function ingresar(email, password) {
    const { data } = await backend.post('/auth/login', { email, password })
    const nueva = { token: data.access_token, usuario: data.user }
    guardar(CLAVE_SESION, nueva, true)
    setSesion(nueva)
    return nueva.usuario
  }

  async function salir() {
    try {
      await backend.post('/auth/logout')
    } catch {
      // Aunque el backend no responda, la sesión se borra de este navegador
    }
    olvidarSesion()
  }

  return (
    <SesionContext.Provider value={{ usuario: sesion?.usuario ?? null, ingresar, salir }}>
      {children}
    </SesionContext.Provider>
  )
}

export default SesionProvider
