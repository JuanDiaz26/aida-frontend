# AIda – Frontend

**Trabajo Final – Tecnicatura Universitaria en Programación – UTN FRT**

Migración a **React + Vite** del sitio de AIda, el Asistente Institucional De Alumnos de la UTN Facultad Regional Tucumán.

AIda centraliza la información académica de la facultad (mesas de examen, inscripciones, correlativas, trámites, ingreso y calendario) y la pone a disposición de los estudiantes a través de un asistente conversacional que cita la fuente oficial y deriva la consulta a una persona cuando no tiene certeza.

🔗 **Demo en vivo:** [https://aida-utn.vercel.app](https://aida-utn.vercel.app)
📁 **Repositorio N.º 1** (HTML, CSS y JavaScript): [lazartej71/AIda](https://github.com/lazartej71/AIda)

## Integrantes
- Lazarte, Jorge Exequiel
- Díaz, Juan Gabriel

## Funcionalidades
- Navegación entre páginas con **React Router**, sin recargar el sitio.
- Navbar con menú hamburguesa que se cierra al elegir una sección y marca la página actual.
- Cambio de tema claro/oscuro que se recuerda entre visitas.
- Consola del asistente con respuestas por palabra clave, sugerencias rápidas y cita de la fuente.
- La conversación con el asistente se conserva al cambiar de página, con un botón para empezar una nueva.
- Preguntas frecuentes en un acordeón, con un buscador que filtra mientras se escribe.
- Página 404 para rutas que no existen.

## Tecnologías
- **React 19** + **Vite**
- **React Router** (`react-router-dom`)
- **React Bootstrap** y **Bootstrap 5**
- JavaScript (JSX)
- Git y GitHub, con deploy en **Vercel**

## Cómo correrlo
```bash
npm install
npm run dev
```
Abrir `http://localhost:5173`.

Otros scripts: `npm run build` genera la versión de producción, `npm run preview` la sirve localmente y `npm run lint` revisa el código.

## Estructura
```
public/              favicon, robots.txt y sitemap.xml
src/
├── assets/          imágenes que importan los componentes
├── components/      componentes reutilizables
│   ├── Layout.jsx
│   ├── Navegacion.jsx
│   ├── SwitchTema.jsx
│   ├── Pie.jsx
│   ├── Seo.jsx
│   ├── Logo.jsx
│   ├── Hero.jsx
│   ├── Metrica.jsx
│   ├── EncabezadoSeccion.jsx
│   ├── Tarjeta.jsx
│   ├── GrillaTarjetas.jsx
│   ├── ItemTema.jsx
│   ├── Consola.jsx
│   └── Mensaje.jsx
├── pages/           una página por ruta
│   ├── Inicio.jsx
│   ├── ComoFunciona.jsx
│   ├── Temas.jsx
│   ├── Asistente.jsx
│   ├── Panel.jsx
│   ├── Preguntas.jsx
│   ├── Equipo.jsx
│   └── NoEncontrada.jsx
├── data/            datos que alimentan a los componentes
├── utils/           funciones que usan varios componentes (normalizar texto)
├── styles/          variables del tema y estilos por sección
├── App.jsx          estado del tema y definición de las rutas
└── main.jsx
vercel.json          redirige todas las rutas a index.html
```

## Rutas (React Router)
`main.jsx` envuelve la app en `BrowserRouter` y `App.jsx` define las rutas con `Routes` y `Route`. Todas cuelgan de una ruta padre que usa `Layout`, así el navbar y el pie se escriben una sola vez y solo cambia lo del medio (`Outlet`).

| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/como-funciona` | Cómo funciona |
| `/temas` | Temas |
| `/asistente` | Asistente |
| `/panel` | Panel institucional |
| `/preguntas` | Preguntas frecuentes |
| `/equipo` | Equipo |
| `*` | Página no encontrada |

Los enlaces del navbar usan `NavLink`, que agrega la clase `active` a la página actual. El logo, el botón de la portada y los accesos de la página de inicio usan `Link`. Como Vercel no conoce las rutas de React, `vercel.json` hace que cualquier dirección devuelva `index.html` y React Router se encarga del resto.

## Componentes y props
- **`App`** guarda el tema actual en su estado y se lo pasa a `Layout`, que a su vez se lo pasa al navbar (`tema`, `onCambiarTema`).
- **`Layout`** arma la estructura común (navbar, `<main>` y pie) y vuelve el scroll arriba al cambiar de página.
- **`Navegacion`** arma el menú con `Navbar`, `Nav` y `Container` de React Bootstrap. Los enlaces se generan a partir de la lista de `data/secciones.js`.
- **`SwitchTema`** recibe el tema y la función para cambiarlo, y no guarda estado propio.
- **`Logo`** se reutiliza en el navbar, la portada y el pie; recibe `className` y `alt` por props.
- **`Metrica`** muestra un dato de la portada (`valor` y `etiqueta`).
- **`Seo`** recibe `titulo` y `descripcion` y actualiza los metadatos de la página (ver más abajo).
- **`EncabezadoSeccion`** es el encabezado de cada página: recibe `numero`, `kicker` y `titulo`.
- **`Tarjeta`** recibe `indice`, `glifo`, `etiqueta` y `titulo`, y el texto lo toma de `children`. Se usa en Cómo funciona, Panel y Equipo.
- **`GrillaTarjetas`** recibe una lista (`items`) y arma una `Tarjeta` por cada elemento. La misma grilla se usa en Cómo funciona y en Panel, cambiando solo los datos.
- **`ItemTema`** recibe `numero` y `texto`; si además recibe `ruta` se convierte en enlace. Así sirve tanto para la lista de temas como para los accesos de la portada.
- **`Consola`** maneja con `useState` los mensajes, lo que escribe el usuario y el estado "redactando", y guarda la conversación con `useEffect` (ver [Hooks](#hooks-usestate-y-useeffect)). Recibe `nombre` para la barra de la terminal.
- **`Mensaje`** recibe `tipo`, `texto`, `hora` y `fuente` y dibuja un mensaje de la conversación.
- **`Pie`** es el footer, compartido por todas las páginas.

## Uso de `map()`
Ninguna lista está escrita a mano en el JSX: los datos viven en `src/data/` y se recorren con `map()`.
- Links del navbar y accesos de la portada → `secciones.js`
- Reglas de Cómo funciona y herramientas del Panel → `reglas.js` y `panel.js` (dentro de `GrillaTarjetas`)
- Lista de temas → `temas.js`
- Preguntas del acordeón (ya filtradas por el buscador) y sus datos estructurados → `preguntas.js`
- Sugerencias rápidas y mensajes de la consola → `respuestas.js` y el estado de `Consola`
- Integrantes en la página Equipo y en el pie → `integrantes.js`
- Temas y métricas de la portada → constantes dentro de `Hero.jsx`

## Hooks: `useState` y `useEffect`

### Lo nuevo del TP 7
**Buscador de preguntas frecuentes (`useState`).** En `Preguntas.jsx`, el estado `busqueda` guarda lo que el estudiante escribe en el buscador y cambia con cada tecla (`onChange`). Cada vez que cambia, React vuelve a dibujar la página y la lista se filtra con `filter()` antes de recorrerla con `map()`. La lista filtrada no tiene estado propio porque se calcula a partir de `busqueda`. La búsqueda no distingue mayúsculas ni tildes: "tramite" encuentra "trámite". Si no hay resultados, se sugiere preguntarle al asistente.

**La conversación no se pierde al cambiar de página (`useEffect`).** Antes, al salir de Asistente y volver, el chat arrancaba de cero porque el estado de `Consola` se pierde cuando el componente se desmonta. Ahora:
- `useState(leerConversacionGuardada)` arranca con la conversación guardada en `sessionStorage` o, si no hay ninguna, con el saludo.
- Un `useEffect` con dependencias `[mensajes]` guarda la conversación cada vez que cambia. Se ejecuta al montar la consola y cada vez que llega un mensaje nuevo. Escribir en el input también vuelve a dibujar el componente, porque cambia `consulta`, pero no ejecuta el efecto, porque `mensajes` no cambió. Para eso sirven las dependencias: el efecto se ejecuta solo cuando cambia lo que se le indica.
- El botón **"Nueva conversación"** vuelve `mensajes` al saludo inicial, y el mismo efecto guarda esa conversación nueva.
- Se usa `sessionStorage` y no `localStorage` porque una consulta tiene sentido durante la visita: al cerrar la pestaña se borra. El tema, en cambio, es una preferencia y se recuerda siempre.

### Todos los hooks del proyecto
| Componente | `useState`: qué estado guarda | Cuándo cambia |
|---|---|---|
| `Preguntas` | `busqueda`: el texto del buscador | Con cada tecla |
| `Consola` | `mensajes`: la conversación | Al enviar una consulta, al llegar la respuesta y con "Nueva conversación" |
| `Consola` | `consulta`: el texto del input | Con cada tecla; se vacía al enviar |
| `Consola` | `redactando`: si AIda está por responder | Pasa a `true` al enviar y a `false` cuando llega la respuesta |
| `App` | `tema`: claro u oscuro | Al tocar el switch; arranca con el tema guardado |
| `Navegacion` | `abierto`: si el menú hamburguesa está desplegado | Al tocar el botón y al elegir una sección |

| Componente | `useEffect`: qué hace | Dependencias: cuándo se ejecuta |
|---|---|---|
| `Consola` | Guarda la conversación en `sessionStorage` | `[mensajes]`: al montar y cada vez que cambian los mensajes |
| `Consola` | Baja el scroll hasta el último mensaje | `[mensajes, redactando]`: al llegar un mensaje o aparecer "redactando" |
| `Consola` | Cancela la respuesta pendiente si se sale de la página | `[]`: se monta una vez y su limpieza se ejecuta al desmontar |
| `App` | Aplica el tema al `<html>`, lo guarda y cambia el color de la barra del navegador | `[tema]`: al cargar y cada vez que cambia el tema |
| `Layout` | Vuelve arriba de todo al cambiar de página | `[pathname]`: cada vez que cambia la ruta |
| `Seo` | Cambia el título y los metadatos de la página | `[titulo, descripcion, pathname]` |

## SEO
- **Título y descripción por página:** cada página usa `<Seo>`, que cambia el `<title>`, la `meta description`, las etiquetas Open Graph y el `canonical` según la ruta. Por ejemplo, `/temas` queda como *"Temas | AIda UTN FRT"*.
- **Metadatos base** en `index.html`: `lang="es"`, `description`, `keywords`, `author`, `robots`, Open Graph (`og:title`, `og:description`, `og:url`, `og:locale`) y `theme-color`.
- **Etiquetas semánticas:** `<header>` en la portada, `<nav>` en el menú, `<main>` para el contenido, `<section>` en cada página, `<article>` en las tarjetas, `<figure>`/`<figcaption>` en el logo y `<footer>` en el pie.
- **Jerarquía de títulos:** cada página tiene un solo `<h1>` (el del encabezado) y los subtítulos son `<h2>`.
- **Datos estructurados:** la página de preguntas incluye un bloque JSON-LD de tipo `FAQPage` (schema.org), generado a partir de la misma lista que el acordeón.
- **`robots.txt` y `sitemap.xml`** en `public/` para que los buscadores encuentren todas las rutas.
- **Accesibilidad:** textos `alt` descriptivos, `aria-label` en los controles sin texto y una región `aria-live` en la consola.

## Estado de la migración
- [x] Navbar con menú hamburguesa y cambio de tema claro/oscuro
- [x] Portada
- [x] Cómo funciona
- [x] Temas
- [x] Asistente
- [x] Panel institucional
- [x] Preguntas frecuentes
- [x] Equipo
- [x] Footer
