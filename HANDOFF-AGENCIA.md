# Handoff técnico — Sitio web ESBA Florida (rediseño)

Documento para la agencia que toma el proyecto para publicarlo en el servidor de producción. Última actualización: 2026-07-02.

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
pago-*.html (6)                         → Páginas de pago de inscripción (ocultas, ver sección 10)
assets/                                 → CSS compartido (styles.css), logos, fotos
```

Todas las páginas comparten un único `assets/styles.css` — no hay CSS por página. Si se cambia un color o un estilo, se cambia ahí y afecta a todas las páginas.

## 5. ⚠️ Pendientes antes de salir a producción

### a) Formulario de contacto (CRÍTICO)
El formulario de `contacto.html` está completamente maquetado y validado en el frontend, pero **no envía datos a ningún lado**. Hay un bloque JS marcado con el comentario `// Form provisional (reemplazar con HubSpot embed)` que simula el envío con un `setTimeout`. La agencia debe reemplazar ese bloque con la integración real (HubSpot, Formspree, Brevo, Make/Zapier webhook, o lo que corresponda). El HTML del form no necesita toques — solo el handler de submit.

### b) Bug en la herramienta de IA de blogs de la propia agencia
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
- **Datos de cursos vía Google Sheets** — ver sección 8 para el detalle completo. No tocar `assets/curso-datos.js` sin leer esa sección primero.

## 8. Datos variables de cursos presenciales (Google Sheets)

Las 5 páginas `curso-*.html` (Electricidad, Aires Acondicionados, Energía Solar, Cámaras de Seguridad, Plomería) **no tienen hardcodeados** la fecha de inicio, los días/horario de cursada, ni los valores de inscripción y cuotas. Esos datos se leen en vivo desde una Google Sheet cada vez que alguien carga la página.

**Cómo funciona:**
- `assets/curso-datos.js` (nuevo, compartido por las 5 páginas) hace un `fetch` a la API pública de exportación CSV de Google (`/gviz/tq?tqx=out:csv&gid=0`) sobre la Sheet **"Datos Cursos ESBA Florida — Web"**, que vive en el Drive de `agente.ia@esbaflorida.edu.ar`.
- Cada `curso-*.html` tiene un atributo `data-curso-id="..."` en el `<body>` (ej. `data-curso-id="electricidad-domiciliaria"`) que el script usa para buscar la fila correspondiente en la Sheet.
- Columnas de la Sheet: `curso_id | nombre_curso | fecha_inicio | dias_horario | inscripcion | cuota | num_cuotas`.
- El script inyecta los valores en tres elementos por página: `#txt-horario` (chip del hero), `#val-inscripcion` y `#val-cuotas` (sección "Inversión").
- **La Sheet tiene que seguir siendo pública ("Cualquier usuario con el enlace / Lector")** para que el `fetch` funcione desde el navegador de cualquier visitante — no requiere API key ni autenticación, pero si alguien cambia el permiso a privado, el fetch falla silenciosamente.
- **Fallback:** si el fetch falla por cualquier motivo (Sheet privada, sin red, ID cambiado, CSP del hosting nuevo bloqueando el dominio `docs.google.com`), el script no rompe nada — simplemente no actualiza, y la página se queda con los valores estáticos que ya están escritos en el HTML (los últimos que se hayan commiteado).

**Punto de atención al migrar al servidor de producción:** si el hosting final tiene una política CSP (`Content-Security-Policy`) restrictiva, hay que agregar `docs.google.com` a `connect-src` (o el header equivalente), o el fetch va a fallar silenciosamente y el sitio quedará mostrando siempre los últimos valores estáticos en vez de los actualizados en la Sheet.

**Quién administra la Sheet:** João, desde `agente.ia@esbaflorida.edu.ar`. Cualquier cambio de precio, fecha o horario de estos 5 cursos se hace ahí, sin tocar código ni redeployar.

## 9. Estado técnico al momento de la entrega (julio 2026)

- ✅ OG tags (og:title, og:description, og:image, og:url) y Twitter cards en las 25 páginas
- ✅ `sitemap.xml` con las 25 URLs en la raíz del repo
- ✅ `robots.txt` apuntando al sitemap
- ✅ JSON-LD Schema en home (Organization), bachillerato (EducationalOccupationalProgram), sedes (LocalBusiness) y los 4 posts del blog (Article)
- ✅ Sin dependencias de imágenes externas — todas las fotos están en `assets/blog/` y `assets/heroes/`
- ✅ `loading="lazy"` en imágenes de artículos de blog
- ✅ `contacto.html` como página independiente (además de la sección `#contacto` en la home)
- ⚠️ El formulario de contacto es provisional (ver sección 5)
- ⚠️ Sin Google Analytics, Meta Pixel ni ningún pixel de tracking instalado — la agencia debe agregarlos
- ✅ Datos variables de los 5 cursos presenciales (fecha, horario, precios) vía Google Sheets — ver sección 8. Revisar CSP del hosting nuevo antes de publicar.
- ℹ️ Hay un 5° borrador de post de blog sin publicar (sobre terminalidad educativa en Argentina) — existe como documento de trabajo aparte, João decide cuándo publicarlo
- ✅ 6 páginas de pago de inscripción (`pago-*.html`) — ver sección 10. **No borrar pensando que son huérfanas**, contienen datos bancarios reales y se envían por WhatsApp durante el proceso de inscripción.

## 10. Páginas de pago de inscripción (ocultas, no indexadas)

Hay 6 páginas (`pago-camaras-seguridad.html`, `pago-electricidad-domiciliaria.html`, `pago-energia-solar.html`, `pago-plomeria.html`, `pago-aires-acondicionados.html`, `pago-bachillerato.html`) que **no están linkeadas desde ningún menú, footer ni sitemap** — se accede a ellas solo con el link directo, que el equipo de ESBA envía por WhatsApp a cada alumno durante el proceso de inscripción, como reemplazo con la nueva estética de las páginas de pago que existían en `esbaflorida.edu.ar/landings/inscripcion*` del sitio viejo.

**Contenido de cada página:** botón de Mercado Pago (con el mismo `pref_id` que ya estaba configurado en el sitio viejo — no se generaron preferencias de pago nuevas) y/o datos de transferencia bancaria (CBU, Nº de cuenta, CUIT, titular). `pago-bachillerato.html` es la única sin botón de Mercado Pago (el sitio viejo tampoco lo tenía ahí, solo transferencia).

**Por qué están "ocultas":** tienen `<meta name="robots" content="noindex, nofollow">` para que no aparezcan en resultados de Google (contienen datos bancarios reales, no tiene sentido que sean indexables), y no están en `sitemap.xml`. Sí tienen `og:title`/`og:description` para que se vea una preview decente cuando se comparte el link por WhatsApp.

**Al migrar al servidor de producción:** subir estos 6 archivos igual que el resto — no requieren nada especial del servidor, son HTML estático como todo lo demás. Si en algún momento se reemplaza el `pref_id` de Mercado Pago de algún curso (por ejemplo si cambia el precio), avisarle a João para que lo actualice — el link de Mercado Pago está hardcodeado en el HTML de cada página, no viene de la Google Sheet de la sección 8.

---
¿Dudas sobre alguna decisión de diseño o por qué algo está armado así? Preguntarle a João — la mayoría de las decisiones de arquitectura de este rediseño están documentadas con su razonamiento en notas internas, pero no forman parte de este repo.
