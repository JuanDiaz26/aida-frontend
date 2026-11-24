import { useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Pagina from '../components/Pagina.jsx'
import { mensajeDelBackend } from '../services/backend.js'
import { useSesion } from '../hooks/useSesion.js'

function Ingresar() {
  const { usuario, ingresar, salir } = useSesion()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  async function manejarSubmit(evento) {
    evento.preventDefault()
    setEnviando(true)
    setError('')
    try {
      await ingresar(email, password)
      navigate(state?.desde ?? '/panel/bandeja', { replace: true })
    } catch (errorIngreso) {
      setError(mensajeDelBackend(errorIngreso, 'No pudimos iniciar la sesión.'))
      setEnviando(false)
    }
  }

  return (
    <Pagina
      seoTitulo="Ingresar"
      descripcion="Ingreso del personal de Alumnos de la UTN FRT al panel de gestión de AIda."
      numero="07"
      kicker="Acceso"
      titulo="Ingreso del personal"
    >
      {usuario ? (
        <div className="prosa aparecer d1">
          <p className="small text-body-secondary mb-4">
            Ya iniciaste sesión como <b className="text-body">{usuario.nombre}</b> ({usuario.email}).
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Button as={Link} to="/panel/bandeja" variant="acento" className="meta px-4 py-3">
              Ir a la bandeja <span aria-hidden="true">›</span>
            </Button>
            <Button variant="aida" className="meta px-4 py-3" onClick={salir}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      ) : (
        <Form onSubmit={manejarSubmit} className="ingreso aparecer d1">
          <p className="small text-body-secondary mb-4">
            Acceso para Bedelía y Alumnado: bandeja de consultas derivadas y métricas de uso.
          </p>

          {error && <Alert variant="danger" className="small">{error}</Alert>}

          <Form.Group className="mb-3" controlId="ingreso-email">
            <Form.Label className="meta text-body-tertiary">Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              className="bg-body-tertiary rounded-0 py-3"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="ingreso-password">
            <Form.Label className="meta text-body-tertiary">Contraseña</Form.Label>
            <Form.Control
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              className="bg-body-tertiary rounded-0 py-3"
            />
          </Form.Group>

          <Button type="submit" variant="acento" className="meta px-4 py-3" disabled={enviando}>
            {enviando ? (
              <>
                <Spinner as="span" animation="border" size="sm" aria-hidden="true" className="me-2" />
                Ingresando…
              </>
            ) : (
              'Ingresar'
            )}
          </Button>
        </Form>
      )}
    </Pagina>
  )
}

export default Ingresar
