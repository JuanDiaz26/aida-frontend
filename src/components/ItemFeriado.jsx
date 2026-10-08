import { convertirFecha, describirDistancia, diasHasta } from '../utils/fechas.js'

function ItemFeriado({ fecha, nombre, tipo, hoy }) {
  const dia = convertirFecha(fecha)
  const dias = diasHasta(dia, hoy)

  return (
    <li className={dias < 0 ? 'feriado feriado-pasado' : 'feriado'}>
      <time className="feriado-dia" dateTime={fecha}>
        {String(dia.getDate()).padStart(2, '0')}
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
