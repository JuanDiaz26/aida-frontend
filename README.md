# AIda – Frontend

**Trabajo Final – Tecnicatura Universitaria en Programación – UTN FRT**

Migración a **React + Vite** del sitio de AIda, el Asistente Institucional De Alumnos de la UTN Facultad Regional Tucumán.

🔗 **Demo en vivo:** [https://aida-utn.vercel.app](https://aida-utn.vercel.app)
📁 **Repositorio N.º 1** (HTML, CSS y JavaScript): [lazartej71/AIda](https://github.com/lazartej71/AIda)

## Integrantes
- Lazarte, Jorge Exequiel
- Díaz, Juan Gabriel

## Tecnologías
- **React 19** + **Vite**
- **React Bootstrap** y **Bootstrap 5**
- JavaScript (JSX)
- Git y GitHub, con deploy en **Vercel**

## Cómo correrlo
```bash
npm install
npm run dev
```
Abrir `http://localhost:5173`.

Otros scripts: `npm run build` genera la versión de producción y `npm run lint` revisa el código.

## Estructura
```
src/
├── assets/          imágenes que importan los componentes
├── components/      componentes reutilizables
│   ├── Navegacion.jsx
│   ├── SwitchTema.jsx
│   ├── Logo.jsx
│   ├── Hero.jsx
│   └── Metrica.jsx
├── data/            datos que alimentan a los componentes
├── styles/          variables del tema y estilos por sección
├── App.jsx
└── main.jsx
```

## Componentes y props
- **`App`** guarda el tema actual en su estado y se lo pasa al navbar por props (`tema`, `onCambiarTema`).
- **`Navegacion`** arma el menú con `Navbar`, `Nav` y `Container` de React Bootstrap. Los enlaces se generan a partir de la lista de `data/secciones.js`.
- **`SwitchTema`** recibe el tema y la función para cambiarlo, y no guarda estado propio.
- **`Logo`** se reutiliza en el navbar y en la portada; recibe `className` y `alt` por props.
- **`Metrica`** muestra un dato de la portada (`valor` y `etiqueta`); el mismo componente se usa tres veces con datos distintos.

## Estado de la migración
- [x] Navbar con menú hamburguesa y cambio de tema claro/oscuro
- [x] Portada
- [ ] Cómo funciona
- [ ] Temas
- [ ] Asistente
- [ ] Panel institucional
- [ ] Preguntas frecuentes
- [ ] Footer
