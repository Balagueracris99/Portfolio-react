# Portfolio Personal — Cristhian Guillermo Balaguera Barrios

Website de portfolio personal **moderno, responsive** y con estilo oscuro (base `#27272A` / Tailwind `zinc-800`), construido con **React + TypeScript + Tailwind CSS** sobre **Vite**.

## Stack

- **React + TypeScript**: UI por componentes
- **Vite**: bundler / dev server
- **Tailwind CSS v4**: estilos (utilities) con plugin de Vite
- **Netlify (opcional)**: despliegue

## Arquitectura (alto nivel)

Este proyecto sigue un enfoque **SPA (Single Page Application)**:

- **Capa de presentación (UI)**: componentes en `portfolio/src/components/` y composición en `portfolio/src/App.tsx`.
- **Capa de contenido/datos**: el “contenido” del portfolio vive en `portfolio/src/data/resume.ts`.
  - Ahí se edita: nombre, headline, textos “about”, experiencia, educación, cursos, habilidades (por grupos y %), y proyectos.
- **Assets estáticos**: en `portfolio/public/` (foto y CV en PDF).

La UI **consume** los datos de `resume.ts`, así que puedes actualizar el contenido sin tocar el layout.

## Estructura del proyecto

El repo tiene un wrapper en la raíz y el proyecto React dentro de `portfolio/`:

```
.
├── package.json               # Scripts que delegan a /portfolio
├── README.md
└── portfolio/
    ├── index.html
    ├── public/
    │   ├── profile.png        # Foto mostrada en el Hero y Header
    │   └── cv.pdf             # CV descargable desde el sitio
    ├── src/
    │   ├── App.tsx            # Página principal (secciones)
    │   ├── index.css          # Tailwind v4 + estilos base
    │   ├── components/        # Header, Footer, Section, Badge, etc.
    │   └── data/
    │       └── resume.ts      # Datos del portfolio (contenido)
    └── vite.config.ts
```

## Requisitos

- **Node.js** (recomendado LTS)
- **npm**

## Ejecutar en local

### Opción A (recomendada): desde la raíz

```bash
cd C:\projects\portfolio_3
npm run dev
```

Esto ejecuta el dev server del proyecto dentro de `portfolio/`.

### Opción B: directamente dentro de `portfolio/`

```bash
cd C:\projects\portfolio_3\portfolio
npm install
npm run dev
```

Luego abre el navegador en la URL que muestre la terminal (normalmente `http://localhost:5173/`).

## Build / Preview (producción)

Desde la raíz:

```bash
npm run build
npm run preview
```

O dentro de `portfolio/`:

```bash
npm run build
npm run preview
```

## Cómo editar el contenido

### 1) Información principal (nombre, perfil, secciones)

Edita:

- `portfolio/src/data/resume.ts`

Campos clave:

- **`aboutShort`**: perfil corto (se muestra en el **Hero**).
- **`aboutLong`**: texto largo (se muestra en la sección **“Sobre mí”**).
- **`projects`**: lista de proyectos (cards con links).
- **`skillGroups`**: habilidades por categorías con porcentaje.
- **`certifications`**: cursos/certificaciones (ordenados de más reciente a más antiguo).

### 2) Foto de perfil

Coloca tu foto en:

- `portfolio/public/profile.png`

La UI la carga desde:

- `"/profile.png"`

### 3) CV PDF (descarga)

Coloca tu CV en:

- `portfolio/public/cv.pdf`

El botón “Descargar CV” apunta a:

- `"/cv.pdf"`

## Secciones del sitio

La página incluye:

- Hero (presentación + foto)
- Sobre mí
- Experiencia
- Proyectos
- Habilidades & Experiencia (por categorías con barra de progreso)
- Educación
- Certificaciones y cursos
- Contacto

## Despliegue (Netlify)

Si vas a desplegar en Netlify:

- **Base directory**: `portfolio`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

> Alternativa: puedes desplegar el repo completo, pero asegúrate de que Netlify use `portfolio/` como base.

## Notas de Git

Si al hacer `git push` aparece `rejected (fetch first)`, significa que el remoto tiene commits que tu local no tiene. Normalmente se arregla con:

```bash
git pull origin main --rebase
git push -u origin main
```

## Licencia

Proyecto personal.

