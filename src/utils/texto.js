// Quita tildes y pasa a minúsculas para que "trámite" y "tramite" coincidan igual.
// La usan la consola del asistente y el buscador de preguntas frecuentes
export function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}
