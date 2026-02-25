# Portfolio Personal — Cristhian Guillermo Balaguera Barrios

Portfolio personal **moderno y responsive** construido con **React + TypeScript + Tailwind CSS (v4)** sobre **Vite**. Incluye secciones de perfil, experiencia, proyectos, habilidades por categorías (con porcentajes), educación, certificaciones y contacto.

Además incluye un **chatbot con IA** (vía Netlify Functions) que responde preguntas sobre el perfil usando la información del archivo `resume.ts`.

## Stack

- **React + TypeScript**: UI por componentes
- **Vite**: dev server y build
- **Tailwind CSS v4**: estilos (utilities) con plugin de Vite
- **Netlify**: hosting + Functions (backend del chatbot)

## Arquitectura

Enfoque **SPA (Single Page Application)**:

- **Presentación (UI)**: `portfolio/src/App.tsx` + componentes en `portfolio/src/components/`
- **Contenido/Datos**: `portfolio/src/data/resume.ts` (tu información). La UI consume estos datos.
- **Estáticos**: `portfolio/public/` (foto y CV)
- **Backend ligero (chatbot)**: `portfolio/netlify/functions/chat.ts` (Netlify Function)

## Estructura

```
.
├── netlify.toml
├── package.json                 # scripts wrapper (ejecuta /portfolio)
├── README.md
└── portfolio/
    ├── public/
    │   ├── profile.png
    │   └── cv.pdf
    ├── src/
    │   ├── App.tsx
    │   ├── index.css
    │   ├── components/
    │   └── data/resume.ts
    └── netlify/functions/chat.ts
```

## Ejecutar en local

Desde la raíz:

```bash
cd C:\projects\portfolio_3
npm run dev
```

> Nota: el chatbot usa una Netlify Function. Para probar el chatbot localmente, usa `netlify dev` (ver sección Chatbot).

## Build / Preview

```bash
npm run build
npm run preview
```

## Editar contenido

### Perfil y secciones

Edita:

- `portfolio/src/data/resume.ts`

Campos clave:

- **`aboutShort`**: perfil corto (se muestra en el Hero)
- **`aboutLong`**: descripción larga (se muestra en “Sobre mí”)
- **`projects`**: cards de proyectos
- **`skillGroups`**: habilidades por categorías con porcentaje
- **`certifications`**: cursos/certificaciones (ordenados)

### Foto y CV

- **Foto**: `portfolio/public/profile.png`
- **CV**: `portfolio/public/cv.pdf`

## Despliegue en Netlify

El proyecto está configurado con `netlify.toml` para:

- **Base directory**: `portfolio`
- **Build command**: `npm run build`
- **Publish**: `dist`
- **Functions**: `portfolio/netlify/functions`

## Chatbot (IA) sobre tu perfil

El chatbot es un widget flotante en el sitio que llama a un endpoint seguro:

- **UI**: `portfolio/src/components/Chatbot.tsx`
- **Endpoint**: `/.netlify/functions/chat`
- **Función**: `portfolio/netlify/functions/chat.ts`

### Variables de entorno (Netlify)

En Netlify → **Site settings → Environment variables**:

- **`OPENAI_API_KEY`** (requerida)
- **`OPENAI_MODEL`** (opcional, default `gpt-4o-mini`)

### Probar el chatbot en local

Con `npm run dev` solamente, normalmente no tendrás funciones. Para probarlo:

```bash
npm i -g netlify-cli
netlify dev
```

## Git (nota rápida)

Si `git push` da `rejected (fetch first)`, primero integra lo del remoto:

```bash
git pull origin main --rebase
git push -u origin main
```

