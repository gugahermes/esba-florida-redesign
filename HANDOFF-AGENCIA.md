# Handoff técnico — Sitio web ESBA Florida (rediseño)

Documento para la agencia que toma el proyecto para publicarlo en el servidor de producción. Última actualización: 2026-06-24.

## 1. Qué es esto

Rediseño completo del sitio de ESBA Florida (bachillerato acelerado para adultos, tecnicaturas, carreras UCASAL a distancia, cursos presenciales en sede Olivos). Reemplaza el diseño visual del sitio actual en WordPress (`esbaflorida.edu.ar`).

**No es WordPress.** Es un sitio estático: HTML + CSS + JavaScript plano, sin build, sin dependencias de Node/npm, sin backend ni base de datos. Se publica subiendo los archivos tal cual a donde sea que vaya a vivir el dominio final.

## 2. Dónde está el código

- Repo: `https://github.com/gugahermes/esba-florida-redesign` (rama `main`)
- Preview actual (GitHub Pages, **no es el destino final**): `https://gugahermes.github.io/esba-florida-redesign/`
- Todas las URLs canónicas, `og:url` y datos estructurados (JSON-LD) dentro del HTML ya están escritos para `https://esbaflorida.edu.ar/` — están listos para el dominio real, no para el preview.

## 3. Cómo publicarlo

1. Clonar o descargar el repo.
2. Subir el contenido de la carpeta tal cual (estructura plana: `index.html`, `bachillerato.html`, etc. en la raíz, más la carpeta `assets/`) al hosting/servidor que vaya a servir `esbaflorida.edu.ar`.
3. `index.html` es la home. No hace falta configurar rutas especiales — cada página es un archivo `.html` independiente con su propio nombre (sin rutas amigables tipo `/bachillerato/`, son `bachillerato.html` directo).
4. No requiere PHP, Node, ni ningún runtime del servidor — solo servir archivos estáticos.

### Si el plan es reemplazar el WordPress actual
Definir con João cómo se hace el corte (DNS, mantener o no el WordPress como backup, redirects de URLs viejas si cambiaron rutas). Esto no está resuelto en el código — es una decisión de infraestructura que le corresponde a la agencia + João, no algo que el sitio estático resuelva solo.

## 4. Estructura del repo

```
index.html                              → Home
bachillerato.html                       → Bachillerato Acelerado
institucional.html                      → Institucional (historia, autoridades, convenios)
sedes.html                               → Sedes (sede Olivos + red de subsedes)
cursos.html + curso-*.html (5)           → Cursos presenciales de oficios
tecnicaturas.html + tecnicatura-*.html (5) → Tecnicaturas de nivel superior
carreras-ucasal.html                    → Carreras UCASAL a distancia
blog.html + blog-*.html (4)             → Blog
assets/                                 → CSS compartido (styles.css), logos, fotos
```

Todas las páginas comparten un único `assets/styles.css` — no hay CSS por página. Si se cambia un color o un estilo, se cambia ahí y afecta a las 22 páginas.

## 5. ⚠️ Pendientes antes de salir a producción

### a) Datos reales de la red de subsedes (`sedes.html`)
Las 8 tarjetas de "Red de subsedes" (San Isidro, Pilar, Morón, La Matanza, Lanús, Quilmes, Barrio Norte, Mar del Plata) tienen **datos placeholder sin completar**: direcciones (`<!-- dirección real -->`), teléfonos (`11 XXXX-XXXX`) y links de WhatsApp (`wa.me/549XXXXXXXXXX`). Esto no es un bug — es contenido que falta porque nunca se recibieron los datos reales. **João tiene que proveer dirección, teléfono y WhatsApp real de cada subsede antes de publicar**, o esas tarjetas van a mostrar/linkear a números inválidos.

### b) Imágenes de blog hotlinkeadas a Unsplash
Las 4 páginas de blog y la página de listado usan fotos de `images.unsplash.com` por URL directa (no están descargadas al repo). Funciona, pero depende de que Unsplash siga disponible y no es ideal para performance/SEO de imágenes en un dominio de producción. Recomendado: descargar esas imágenes y servirlas desde `assets/` antes o poco después del lanzamiento. Lista de imágenes usadas:
- `blog.html` y los 4 `blog-*.html`: buscar `images.unsplash.com` en el código de cada uno para ver la URL exacta de cada foto.

### c) Bug en la herramienta de IA de blogs de la propia agencia
Si la agencia sigue usando su herramienta de generación de blogs con IA (la que generó los 4 posts originales en `esbaflorida.edu.ar/landings/blog/`), tiene un bug conocido: genera una sección de "Preguntas frecuentes" **duplicada**, donde la segunda versión tiene contenido genérico de marketing digital que no tiene nada que ver con el artículo real. Ya se descartó esa sección duplicada al migrar el contenido a este sitio, pero vale la pena que la agencia lo revise en su herramienta de origen.

## 6. Contacto / datos institucionales (fuente de verdad)

- **Teléfono fijo:** (11) 4799-2331
- **WhatsApp:** (11) 5740-0965 — usado en casi todos los botones de contacto vía `https://wa.me/5491157400965`
- **Email:** info@esbaflorida.edu.ar
- **Dirección sede Olivos:** Avellaneda 2542, Olivos, Vicente López, Buenos Aires
- **DIEGEP:** N° 6278 (Res. 6794/00)

Si alguno de estos datos cambia, hay que actualizarlo en cada página donde aparece (no hay un solo archivo de configuración central para esto todavía).

## 7. Cosas a tener en cuenta del código

- **Menú mobile:** hamburguesa con panel deslizante (`#menuToggle` / `<nav>`), CSS en `assets/styles.css`. Si se nota algo raro en el menú mobile, revisar primero la altura del `<nav>` (`height:calc(100vh - 70px)`) — ya hubo un bug ahí relacionado a cómo los navegadores calculan altura en contenedores flex con `position:fixed`.
- **Botón flotante de WhatsApp:** posicionado en `bottom:90px` (no en la esquina exacta) a propósito, para no tapar las flechas de navegación del slider de la home.
- **Fuentes:** Google Fonts vía CDN (`Playfair Display` + `Montserrat`), no están self-hosted.
- **Sin analytics ni pixels todavía** — si la agencia va a agregar Google Analytics/Meta Pixel, no hay nada instalado actualmente para entrar en conflicto.

## 8. Qué NO está hecho todavía

- No hay una página `contacto.html` dedicada — el contacto es una sección dentro de `index.html` (`#contacto`) y se repite en algunas páginas de curso.
- Hay un 5° borrador de post de blog sin publicar (sobre terminalidad educativa en Argentina) — no está en el sitio, existe solo como documento de trabajo aparte.

---
¿Dudas sobre alguna decisión de diseño o por qué algo está armado así? Preguntarle a João — la mayoría de las decisiones de arquitectura de este rediseño están documentadas con su razonamiento en notas internas, pero no forman parte de este repo.
