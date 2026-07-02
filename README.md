# Sitio web ESBA Florida — Rediseño

Código fuente del nuevo sitio estático de [esbaflorida.edu.ar](https://esbaflorida.edu.ar).  
Preview: **https://gugahermes.github.io/esba-florida-redesign/**

> **Documentación técnica completa para la agencia → [`HANDOFF-AGENCIA.md`](HANDOFF-AGENCIA.md)**

---

## ⚠️ Pendiente de la agencia antes de salir a producción

Estas tareas **no están en el código** — requieren acceso al servidor, cuentas externas o decisiones de infraestructura:

| # | Tarea | Detalle |
|---|-------|---------|
| 🔴 | **Formulario de contacto** | El form de `contacto.html` está maquetado pero no envía nada. Reemplazar el bloque JS marcado con `// Form provisional (reemplazar con HubSpot embed)` por la integración real (HubSpot, Formspree, Brevo, etc.). |
| 🔴 | **DNS cutover** | Pasar `esbaflorida.edu.ar` de WordPress al hosting nuevo. Coordinar con João el momento del corte. |
| 🟡 | **Google Analytics 4** | Instalar snippet GA4 en `<head>` de todas las páginas. No hay ningún pixel instalado actualmente. |
| 🟡 | **Meta Pixel** | Ídem si se va a hacer pauta en Meta Ads. |
| 🟡 | **Google Search Console** | Verificar dominio y subir `sitemap.xml` (ya existe en el repo en la raíz). |
| 🟡 | **Redirects 301** | Si alguna URL del WordPress viejo cambia de formato, configurar redirects en el servidor para no perder posicionamiento SEO. |
| 🟡 | **HTTPS forzado** | Configurar SSL y redirect HTTP→HTTPS en el servidor (no es código del sitio). |
| 🟡 | **CSP y Google Sheets** | Si el hosting nuevo aplica una `Content-Security-Policy`, agregar `docs.google.com` a `connect-src` — si no, los 5 `curso-*.html` dejan de poder leer los datos en vivo (fecha, horario, precios) y quedan solo con los valores estáticos del último commit. Ver `HANDOFF-AGENCIA.md` sección 8. |
| 🟢 | **Google My Business** | Confirmar/actualizar datos desde la cuenta de Google Business de ESBA Florida. |

🔴 Crítico antes del lanzamiento · 🟡 Importante · 🟢 Recomendado

---

## Estado del sitio (al momento de la entrega)

- ✅ 25 páginas HTML estáticas — sin framework, sin build, sin backend
- ✅ OG tags y Twitter cards en todas las páginas
- ✅ `sitemap.xml` y `robots.txt` en la raíz
- ✅ JSON-LD Schema en páginas clave (home, bachillerato, sedes, blog posts)
- ✅ Sin dependencias externas de imágenes (Unsplash u otros CDN externos)
- ✅ Fuentes vía Google Fonts CDN (Playfair Display + Montserrat)
- ✅ Datos de los 5 cursos presenciales (fecha, horario, precios) se leen en vivo desde Google Sheets — ver `HANDOFF-AGENCIA.md` sección 8, revisar CSP del hosting antes de publicar
- ✅ 6 páginas de pago de inscripción (botón Mercado Pago + transferencia bancaria) — ver tabla más abajo
- ⚠️ El formulario de contacto es provisional (ver arriba)

## Páginas de pago de inscripción (botón Mercado Pago + transferencia)

6 páginas nuevas, con la estética del rediseño, que reemplazan a las viejas de `esbaflorida.edu.ar/landings/inscripcion*`. **No están linkeadas desde ningún menú ni el sitemap a propósito** (llevan `noindex`) — se comparten por link directo durante el proceso de inscripción, igual que antes. Mismo botón de Mercado Pago y mismos datos bancarios que ya estaban configurados, no se generó nada nuevo.

| Curso | Archivo | Preview |
|---|---|---|
| Cámaras y Alarmas | `pago-camaras-seguridad.html` | [ver](https://gugahermes.github.io/esba-florida-redesign/pago-camaras-seguridad.html) |
| Electricidad Domiciliaria | `pago-electricidad-domiciliaria.html` | [ver](https://gugahermes.github.io/esba-florida-redesign/pago-electricidad-domiciliaria.html) |
| Energía Solar Fotovoltaica | `pago-energia-solar.html` | [ver](https://gugahermes.github.io/esba-florida-redesign/pago-energia-solar.html) |
| Plomería Domiciliaria | `pago-plomeria.html` | [ver](https://gugahermes.github.io/esba-florida-redesign/pago-plomeria.html) |
| Aires Acondicionados | `pago-aires-acondicionados.html` | [ver](https://gugahermes.github.io/esba-florida-redesign/pago-aires-acondicionados.html) |
| Bachillerato (matrícula, sin Mercado Pago) | `pago-bachillerato.html` | [ver](https://gugahermes.github.io/esba-florida-redesign/pago-bachillerato.html) |

Al pasar al dominio final, la URL de cada una pasa a ser `esbaflorida.edu.ar/pago-<curso>.html`. Detalle técnico completo en `HANDOFF-AGENCIA.md` sección 10.

## Cómo publicarlo

1. Clonar o descargar este repo
2. Subir el contenido tal cual a la raíz del hosting que sirva `esbaflorida.edu.ar`
3. No requiere PHP, Node ni ningún runtime — solo servir archivos estáticos

Ver [`HANDOFF-AGENCIA.md`](HANDOFF-AGENCIA.md) para todos los detalles técnicos, estructura de carpetas y contacto institucional.
