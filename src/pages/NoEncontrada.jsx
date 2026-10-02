import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx'
import Seo from '../components/Seo.jsx'

function NoEncontrada() {
  return (
    <section className="section-pad">
      <Seo titulo="Página no encontrada" />
      <Container>
        <EncabezadoSeccion numero="404" kicker="Error" titulo="Esta página no existe" />

        <p className="sec-intro aparecer d1">
          <span className="accent">$</span> cd: no existe el directorio. Puede que el enlace esté mal
          escrito o que la página se haya movido.
        </p>

        <Button as={Link} to="/" variant="" className="hero-cta aparecer d2">
          Volver al inicio <span aria-hidden="true">›</span>
        </Button>
      </Container>
    </section>
  )
}

export default NoEncontrada
