import { Container } from 'react-bootstrap'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import Seo from './Seo.jsx'

// Molde de las páginas de sección: cada página pasa sus datos por props
// y su contenido propio como children (lo que va entre <Pagina> y </Pagina>)
function Pagina({ seoTitulo, descripcion, numero, kicker, titulo, children }) {
  return (
    <section className="section-pad">
      <Seo titulo={seoTitulo} descripcion={descripcion} />
      <Container>
        <EncabezadoSeccion numero={numero} kicker={kicker} titulo={titulo} />
        {children}
      </Container>
    </section>
  )
}

export default Pagina
