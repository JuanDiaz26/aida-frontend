function SwitchTema({ tema, onCambiar }) {
  return (
    <button
      className="tema-switch"
      type="button"
      role="switch"
      aria-checked={tema === 'dark'}
      aria-label="Cambiar entre modo claro y oscuro"
      onClick={onCambiar}
    >
      <span className="tema-pista" aria-hidden="true">
        <span className="tema-bola">
          <svg
            className="tema-icono tema-icono-sol"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
            <path d="M12 1.8v2.4M12 19.8v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M1.8 12h2.4M19.8 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
          </svg>
          <svg className="tema-icono tema-icono-luna" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.9A9.1 9.1 0 1 1 11.1 3a7.1 7.1 0 0 0 9.9 9.9z" />
          </svg>
        </span>
      </span>
    </button>
  )
}

export default SwitchTema
