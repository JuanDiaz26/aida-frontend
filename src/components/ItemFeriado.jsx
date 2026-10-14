import { convertirFecha, describirDistancia, diasHasta } from '../utils/fechas.js'
import { numerar } from '../utils/texto.js'

function ItemFeriado({ fecha, nombre, tipo, hoy }) {
  const dia = convertirFecha(fecha)
  const dias = diasHasta(dia, hoy)

  return (
    <li className={dias < 0 ? 'feriado feriado-pasado' : 'feriado'}>
      <time className="feriado-dia" dateTime={fecha}>
        {numerar(dia.getDate())}
      </time>
      <div>
        <p className="feriado-nombre">{nombre}</p>
        <p className="feriado-meta">
          {tipo} · {describirDistancia(dias)}
        </p>
      </div>
    </li>
  )
}

export default ItemFeriado
