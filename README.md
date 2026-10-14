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
- Calendario académico en el inicio con los feriados del año, traídos de una API pública y navegables mes por mes.
- Clima de hoy en San Miguel de Tucumán en el inicio, con la temperatura actual, la máxima y la mínima.
- Perfiles de GitHub de los integrantes en la página Equipo (foto, biografía y cantidad de repositorios), consultados en vivo.

## Tecnologías
- **React 19** + **Vite**
- **React Router** (`react-router-dom`)
- **React Bootstrap** y **Bootstrap 5**, con el tema armado sobre las variables de Bootstrap
- **Axios** para consumir tres APIs públicas: feriados, clima y GitHub
- **SweetAlert2** para los avisos al usuario
- JavaScript (JSX)
- Git y GitHub, con deploy en **Vercel**

## Cómo correrlo
```bash
npm install
cp .env.example .env
npm run dev
```
Abrir `http://localhost:5173`.

El archivo `.env` guarda las URLs de las APIs y **no se sube a GitHub** (figura en `.gitignore`). Por eso cada integrante lo crea a partir de `.env.example`, que sí está en el repositorio.

Otros scripts: `npm run build` genera la versión de producción, `npm run preview` la sirve localmente y `npm run lint` revisa el código.

## Estructura
```
public/              favicon, robots.txt y sitemap.xml
src/
├── assets/          imágenes que importan los componentes
├── components/      componentes reutilizables
│   ├── Layout.jsx
│   ├── Pagina.jsx
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
│   ├── Mensaje.jsx
│   ├── CalendarioFeriados.jsx
│   ├── ItemFeriado.jsx
│   └── ClimaHoy.jsx
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
├── hooks/           hook propio useConsulta, para pedir datos a las APIs
├── services/        pedidos a APIs externas (feriados, clima y GitHub)
├── utils/           funciones que usan varios componentes (texto, fechas, clima y avisos)
├── styles/          tema.css (colores y variables de Bootstrap) y componentes.css
├── App.jsx          estado del tema y definición de las rutas
└── main.jsx
vercel.json          redirige todas las rutas a index.html
.env.example         modelo del .env con las URLs de las tres APIs
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
- **`Pagina`** es el molde de las páginas de sección: recibe `seoTitulo`, `descripcion`, `numero`, `kicker` y `titulo`, y lo propio de cada página llega como `children`. Así el `<section>`, el `<Seo>`, el `Container` y el encabezado se escriben una sola vez. La usan todas las páginas menos Inicio.
- **`Navegacion`** arma el menú con `Navbar`, `Nav` y `Container` de React Bootstrap. Los enlaces se generan a partir de la lista de `data/secciones.js`.
- **`SwitchTema`** recibe el tema y la función para cambiarlo, y no guarda estado propio.
- **`Logo`** se reutiliza en el navbar, la portada y el pie; recibe `className` y `alt` por props.
- **`Metrica`** muestra un dato de la portada (`valor` y `etiqueta`).
- **`Seo`** recibe `titulo` y `descripcion` y actualiza los metadatos de la página (ver más abajo).
- **`EncabezadoSeccion`** es el encabezado de cada página: recibe `numero`, `kicker` y `titulo`.
- **`Tarjeta`** recibe `indice`, `glifo`, `etiqueta` y `titulo`, y el texto lo toma de `children`. El `glifo` puede ser un símbolo o una imagen, como la foto de GitHub en Equipo. Se usa en Cómo funciona, Panel y Equipo.
- **`GrillaTarjetas`** recibe una lista (`items`) y arma una `Tarjeta` por cada elemento. La misma grilla se usa en Cómo funciona y en Panel, cambiando solo los datos.
- **`ItemTema`** recibe `numero` y `texto`; si además recibe `ruta` se convierte en enlace. Así sirve tanto para la lista de temas como para los accesos de la portada.
- **`Consola`** maneja con `useState` los mensajes, lo que escribe el usuario y el estado "redactando", y guarda la conversación con `useEffect` (ver [Hooks](#hooks-usestate-y-useeffect)). Recibe `nombre` para la barra de la terminal.
- **`Mensaje`** recibe `tipo`, `texto`, `hora` y `fuente` y dibuja un mensaje de la conversación.
- **`Pie`** es el footer, compartido por todas las páginas.
- **`CalendarioFeriados`** consulta la API de feriados y los muestra mes por mes dentro de un `<aside>` (ver [Consumo de APIs](#consumo-de-apis-públicas-tp-8)).
- **`ItemFeriado`** recibe `fecha`, `nombre`, `tipo` y `hoy`, y dibuja un feriado con los días que faltan.
- **`ClimaHoy`** consulta la API del clima y muestra la temperatura de San Miguel de Tucumán en otro `<aside>`, arriba del calendario.

## Uso de `map()`
Ninguna lista está escrita a mano en el JSX: los datos viven en `src/data/` y se recorren con `map()`.
- Links del navbar y accesos de la portada → `secciones.js`
- Reglas de Cómo funciona y herramientas del Panel → `reglas.js` y `panel.js` (dentro de `GrillaTarjetas`)
- Lista de temas → `temas.js`
- Preguntas del acordeón (ya filtradas por el buscador) y sus datos estructurados → `preguntas.js`
- Sugerencias rápidas y mensajes de la consola → `respuestas.js` y el estado de `Consola`
- Integrantes en la página Equipo y en el pie → `integrantes.js`
- Temas y métricas de la portada → constantes dentro de `Hero.jsx`
- Feriados del mes en el calendario → datos que llegan de la API
- Pedidos a GitHub → `services/github.js` arma un pedido por cada integrante con `map()` y los lanza juntos con `Promise.all`

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
| `CalendarioFeriados` | `mes`: el mes que se está mirando | Con las flechas y con "Volver a hoy" |
| `CalendarioFeriados` | `hoy`: la fecha de hoy | Nunca: se toma una sola vez al montar |
| `useConsulta` | `datos`: lo que devuelve la API | Cuando llega la respuesta |
| `useConsulta` | `cargando`: si la consulta sigue en curso | Arranca en `true` y pasa a `false` al terminar, con éxito o con error |
| `useConsulta` | `error`: el mensaje si la consulta falla | Cuando la API responde con error o no hay conexión |

`useConsulta` es un hook propio: cada componente que lo usa (`CalendarioFeriados`, `ClimaHoy` y `Equipo`) tiene sus propios `datos`, `cargando` y `error`.

| Componente | `useEffect`: qué hace | Dependencias: cuándo se ejecuta |
|---|---|---|
| `Consola` | Guarda la conversación en `sessionStorage` | `[mensajes]`: al montar y cada vez que cambian los mensajes |
| `Consola` | Baja el scroll hasta el último mensaje | `[mensajes, redactando]`: al llegar un mensaje o aparecer "redactando" |
| `Consola` | Cancela la respuesta pendiente si se sale de la página | `[]`: se monta una vez y su limpieza se ejecuta al desmontar |
| `App` | Aplica el tema al `<html>`, lo guarda y cambia el color de la barra del navegador | `[tema]`: al cargar y cada vez que cambia el tema |
| `Layout` | Vuelve arriba de todo al cambiar de página | `[pathname]`: cada vez que cambia la ruta |
| `Seo` | Cambia el título y los metadatos de la página | `[titulo, descripcion, pathname]` |
| `useConsulta` | Pide los datos a la API; si el componente se desmonta antes, cancela el pedido | `[pedir, servicio]`: una vez al montar, porque las dos son fijas |

## Consumo de APIs públicas (TP 8)

### Las APIs elegidas
| API | Pedido | Dónde se ve |
|---|---|---|
| [ArgentinaDatos](https://api.argentinadatos.com) | `GET /v1/feriados/{año}` | Calendario académico, en el inicio |
| [Open-Meteo](https://open-meteo.com) | `GET /v1/forecast` con la ubicación como parámetros | "Hoy en San Miguel de Tucumán", en el inicio |
| [GitHub](https://docs.github.com/es/rest/users/users) | `GET /users/{usuario}`, uno por integrante | Página Equipo |

Las tres son públicas, no piden registro ni clave, y permiten consultas desde el navegador.

**Feriados.** Devuelve los feriados nacionales del año. Se eligió porque **"Calendario académico" es uno de los temas que cubre AIda**, y los feriados son lo que mueve las mesas de examen y las clases.

```json
{ "fecha": "2026-10-12", "tipo": "trasladable", "nombre": "Día del Respeto a la Diversidad Cultural" }
```

**Clima.** Devuelve la temperatura actual, el estado del cielo y la máxima y mínima del día. Las coordenadas, la zona horaria y los datos pedidos van en `params` y Axios arma la dirección (`?latitude=-26.8083&longitude=-65.2176&...`). El estado del cielo llega como un código numérico de la Organización Meteorológica Mundial, y `utils/clima.js` lo traduce a texto con `find()`. Respuesta resumida:

```json
{ "current": { "temperature_2m": 14.2, "weather_code": 51 }, "daily": { "temperature_2m_max": [18.1], "temperature_2m_min": [13.6] } }
```

**GitHub.** Devuelve el perfil público de cada integrante; se usan `avatar_url`, `bio` y `public_repos`. Sin clave permite 60 pedidos por hora, de sobra para la página.

```json
{ "login": "JuanDiaz26", "avatar_url": "https://avatars.githubusercontent.com/...", "bio": "...", "public_repos": 19 }
```

### Dónde se ve
- **Calendario:** en el inicio, al costado de "Explorá el sitio", como un `<aside>`. Muestra los feriados del mes, cuántos días faltan para cada uno, y se puede recorrer con las flechas de enero a diciembre del año actual. El año sale de la fecha real, así que desde enero el calendario pasa solo al año nuevo, sin tocar el código.
- **Clima:** arriba del calendario, con un ícono según el estado del cielo.
- **GitHub:** en cada tarjeta de Equipo, la foto de perfil, la biografía y la cantidad de repositorios públicos.

### Variables de entorno
| Variable | Archivo que la usa |
|---|---|
| `VITE_API_URL` | `services/feriados.js` |
| `VITE_CLIMA_API_URL` | `services/clima.js` |
| `VITE_GITHUB_API_URL` | `services/github.js` |

- Vite solo expone al navegador las variables que empiezan con `VITE_`. Cada servicio la lee con `import.meta.env` y ningún componente tiene una URL escrita.
- `.env` está en `.gitignore`, así que no se sube. `.env.example` sí se sube, como modelo para crear el propio.
- En **Vercel** las variables se cargan en *Settings → Environment Variables*, porque el `.env` no llega al servidor. Si faltara alguna, el servicio avisa, por ejemplo, *"Falta configurar VITE_CLIMA_API_URL"* en lugar de fallar de forma confusa.

### El hook `useConsulta`
El calendario, el clima y el equipo hacían lo mismo: un `useEffect` que pide los datos, tres estados (`datos`, `cargando` y `error`), el aviso de error y la cancelación del pedido. En lugar de repetirlo tres veces, está una sola vez en `hooks/useConsulta.js`, y cada componente lo usa en una línea:

```jsx
const { datos, cargando, error } = useConsulta(obtenerClima, 'clima')
```

Recibe la función que hace el pedido y el nombre del servicio, que se usa en los mensajes de error. La función se define **fuera del componente** (por ejemplo, `pedirFeriados` en `CalendarioFeriados.jsx`): si se creara adentro, sería una función nueva en cada render, cambiaría la dependencia del efecto y la API se consultaría sin parar.

### Cómo funciona
1. `useEffect`, dentro de `useConsulta`, ejecuta la consulta al montar el componente.
2. Mientras tanto `cargando` vale `true` y se ve el `Spinner` de React Bootstrap.
3. El servicio hace el pedido con **Axios**. En GitHub, `Promise.all` lanza los dos pedidos juntos y espera a que lleguen los dos.
4. Si sale bien, los datos se guardan con `setDatos`. Si sale mal, el mensaje va a `setError` y aparece el aviso de **SweetAlert2**.
5. En los dos casos, `cargando` pasa a `false` en el bloque `finally`.

Cada API se consulta **una sola vez** por visita a la página. Los feriados llegan con el año entero, y moverse entre meses solo filtra lo que ya llegó, sin nuevos pedidos.

### Manejo de errores
`utils/avisos.js` arma el mensaje con el nombre del servicio:
- **La API responde con un error** (por ejemplo, 404): *"El servicio de feriados respondió con un error (código 404)"*.
- **No hay conexión:** *"No pudimos conectarnos con el servicio de clima. Revisá tu conexión."*

El aviso de SweetAlert2 es un *toast*: aparece en una esquina y se cierra solo, para no tapar la página. El mensaje también queda escrito con un `Alert` de React Bootstrap en el lugar de los datos. Si falla GitHub, las tarjetas de Equipo igual muestran el nombre y el enlace de cada integrante.

**Para verlo funcionando:** cortar la conexión a internet y recargar el inicio.

### Decisiones y detalles
- **Fechas sin corrimiento:** `new Date('2026-10-12')` interpreta la fecha en UTC y en Argentina (UTC-3) daría el día 11. Por eso `utils/fechas.js` arma la fecha a mano con año, mes y día.
- **La fecha de hoy se toma una sola vez**, con `useState(() => new Date())`: llamar a `new Date()` en cada render daría un valor distinto cada vez.
- **Función actualizadora en las flechas:** `setMes((actual) => Math.min(actual + 1, 11))` parte siempre del valor más reciente. Con `setMes(mes + 1)`, dos clics seguidos leían el mismo `mes` y avanzaba uno solo.
- **Cancelación del pedido:** si el componente se desmonta antes de que llegue la respuesta, el `AbortController` cancela la consulta y no se actualiza un estado que ya no existe.
- **Un estado a la vez:** el calendario y el clima eligen qué mostrar (cargando, error, sin datos o la lista) con `return` tempranos, de arriba hacia abajo, en lugar de varias condiciones sueltas en el JSX.

## Estilos con React Bootstrap
La interfaz está hecha con componentes de React Bootstrap: `Navbar`, `Nav`, `Container`, `Row` y `Col`, `Card`, `ListGroup`, `Accordion`, `Form`, `InputGroup`, `Button`, `Alert` y `Spinner`. La ubicación, los espacios y los tamaños de letra salen de las clases utilitarias de Bootstrap (`d-flex`, `gap-*`, `border-*`, `fs-*`, `fw-*`, `text-body-secondary`, etc.).

- **El tema se arma con las variables de Bootstrap.** `tema.css` define los colores de AIda para el modo claro y el oscuro, y con ellos redefine las variables de Bootstrap (`--bs-body-bg`, `--bs-primary`, `--bs-border-color`…). Así las tarjetas, las listas, los avisos y el acordeón toman los colores del tema sin estilos propios. El modo oscuro usa el atributo `data-bs-theme` que Bootstrap ya trae.
- **Botones propios como variantes de Bootstrap:** `variant="aida"` y `variant="acento"` generan las clases `btn-aida` y `btn-acento`, que solo cambian las variables `--bs-btn-*`.
- **`componentes.css`** guarda solo lo que Bootstrap no tiene: el switch del tema, la animación del menú hamburguesa, el halo del logo, el cursor que titila y los números con contorno de cada sección.

## SEO
- **Título y descripción por página:** cada página usa `<Seo>`, que cambia el `<title>`, la `meta description`, las etiquetas Open Graph y el `canonical` según la ruta. Por ejemplo, `/temas` queda como *"Temas | AIda UTN FRT"*.
- **Metadatos base** en `index.html`: `lang="es"`, `description`, `keywords`, `author`, `robots`, Open Graph (`og:title`, `og:description`, `og:url`, `og:locale`) y `theme-color`.
- **Etiquetas semánticas:** `<header>` en la portada, `<nav>` en el menú, `<main>` para el contenido, `<section>` en cada página, `<article>` en las tarjetas, `<figure>`/`<figcaption>` en el logo, `<aside>` en el calendario y el clima, `<time>` en cada feriado y `<footer>` en el pie.
- **Jerarquía de títulos:** cada página tiene un solo `<h1>` (el del encabezado) y los subtítulos son `<h2>` y `<h3>`.
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
