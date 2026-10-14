import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pagina from '../components/Pagina.jsx'

function NoEncontrada() {
  return (
    <Pagina seoTitulo="Página no encontrada" numero="404" kicker="Error" titulo="Esta página no existe">
      <p className="prosa small text-body-secondary mb-5 aparecer d1">
        <span className="text-primary">$</span> cd: no existe el directorio. Puede que el enlace
        esté mal escrito o que la página se haya movido.
      </p>

      <Button as={Link} to="/" variant="" className="hero-cta aparecer d2">
        Volver al inicio <span aria-hidden="true">›</span>
      </Button>
    </Pagina>
  )
}

export default NoEncontrada
