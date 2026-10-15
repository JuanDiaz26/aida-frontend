import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import ActividadGitHub from '../components/ActividadGitHub.jsx'
import Pagina from '../components/Pagina.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import { integrantes } from '../data/integrantes.js'
import { useConsulta } from '../hooks/useConsulta.js'
import { obtenerPerfiles } from '../services/github.js'
import { numerar } from '../utils/texto.js'

// Fuera del componente para que sea siempre la misma función (ver useConsulta)
const pedirPerfiles = (signal) => obtenerPerfiles(integrantes.map((integrante) => integrante.github), signal)

function Equipo() {
  const { datos: perfiles, cargando, error } = useConsulta(pedirPerfiles, 'GitHub')

  // Busca, entre los perfiles que devolvió GitHub, el de cada integrante
  function buscarPerfil(usuario) {
    return perfiles?.find((perfil) => perfil.login.toLowerCase() === usuario.toLowerCase())
  }

  return (
    <Pagina
      seoTitulo="Equipo"
      descripcion="Integrantes del equipo que desarrolla AIda, trabajo final de la Tecnicatura Universitaria en Programación de la UTN FRT."
      numero="06"
      kicker="Equipo"
      titulo="Quiénes lo hacemos"
    >
      <p className="prosa small text-body-secondary mb-5 aparecer d1">
        Somos Exequiel y Juan, compañeros de la Tecnicatura Universitaria en Programación de la UTN
        FRT, y AIda es nuestro trabajo final. Exequiel creó el primer repositorio, en HTML, CSS y
        JavaScript, y Juan creó este, en React. Los dos trabajamos en ambos.
      </p>

      {error && <Alert variant="danger" className="small mb-4">{error}</Alert>}

      <Row xs={1} md={2} className="g-0 border-top border-start aparecer d2">
        {integrantes.map((integrante, indice) => {
          const perfil = buscarPerfil(integrante.github)
          // Primero la biografía de GitHub; si está vacía, la descripción guardada en integrantes.js
          const descripcion = perfil?.bio || integrante.descripcion

          return (
            <Col key={integrante.github} className="border-end border-bottom">
              <Tarjeta
                indice={numerar(indice + 1)}
                glifo={
                  perfil ? (
                    <img
                      src={perfil.avatar_url}
                      alt={`Foto de perfil de ${integrante.nombre}`}
                      width="56"
                      height="56"
                      className="rounded-circle border"
                    />
                  ) : (
                    '◉'
                  )
                }
                etiqueta="Integrante · TUP"
                titulo={`${integrante.nombre} ${integrante.apellido}`}
              >
                {cargando && (
                  <span className="d-flex align-items-center gap-2 mb-2">
                    <Spinner as="span" animation="border" size="sm" variant="primary" aria-hidden="true" />
                    Cargando perfil de GitHub…
                  </span>
                )}
                {descripcion && <span className="d-block mb-2">{descripcion}</span>}
                {perfil && <span className="d-block mb-2">{perfil.public_repos} repositorios públicos</span>}
                {perfil && <ActividadGitHub fechas={perfil.fechasCommits} />}
                GitHub:{' '}
                <a
                  href={`https://github.com/${integrante.github}`}
                  className="link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{integrante.github}
                </a>
              </Tarjeta>
            </Col>
          )
        })}
      </Row>
    </Pagina>
  )
}

export default Equipo
