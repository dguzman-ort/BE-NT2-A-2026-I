# Proyecto JavaScript (Vite)

Aplicación web con [Vite](https://vitejs.dev/) y JavaScript en modo módulo ES.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm (incluido con Node.js)

## Instalación

En la carpeta `Javascript`:

```bash
npm install
```

## Desarrollo

Levanta el servidor de desarrollo con recarga en caliente:

```bash
npm run dev
```

Vite mostrará la URL local (por defecto suele ser `http://localhost:5173`). Ábrela en el navegador.

## Producción

Generar la build optimizada:

```bash
npm run build
```

Los archivos quedan en la carpeta `dist/`.

Para previsualizar la build de producción en local:

```bash
npm run preview
```

## Estructura principal

- `index.html` — punto de entrada HTML
- `src/main.js` — arranque de la aplicación
- `src/js/` — módulos y ejercicios de JavaScript
