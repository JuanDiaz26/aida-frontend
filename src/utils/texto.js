// Quita tildes y pasa a minúsculas para que "trámite" y "tramite" coincidan igual.
// La usan la consola del asistente y el buscador de preguntas frecuentes
export function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// Numera con dos dígitos (1 → "01"), como los índices de las tarjetas, temas y preguntas
export function numerar(numero) {
  return String(numero).padStart(2, '0')
}
