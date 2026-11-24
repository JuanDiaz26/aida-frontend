import { useContext } from 'react'
import { SesionContext } from '../context/sesion.js'

export const ROLES_PERSONAL = ['PERSONAL', 'ADMIN']

export function useSesion() {
  return useContext(SesionContext)
}
