# Portafolio — Luis Ernesto Corredor Jiménez

Sitio estático (HTML/CSS/JS) listo para publicar en GitHub Pages.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub llamado `portfolio` (público).
2. Sube el contenido de esta carpeta a la rama `main`:
   ```bash
   git init
   git add .
   git commit -m "feat: portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/lysusco/portfolio.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages** y selecciona la rama `main` con la carpeta raíz (`/`).
4. Tu sitio quedará disponible en `https://lysusco.github.io/portfolio/`.

## Personalizar

- Edita `index.html` para ajustar descripciones (por ejemplo, la del proyecto MiniMarketElAhorro).
- Agrega más tarjetas en la sección `#proyectos` cuando tengas nuevos proyectos.
- Reemplaza el enlace del portafolio en el `README.md` de tu perfil si cambias el nombre del repo.
