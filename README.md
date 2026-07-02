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
- ⚠️ El formulario de contacto es provisional (ver arriba)

## Cómo publicarlo

1. Clonar o descargar este repo
2. Subir el contenido tal cual a la raíz del hosting que sirva `esbaflorida.edu.ar`
3. No requiere PHP, Node ni ningún runtime — solo servir archivos estáticos

Ver [`HANDOFF-AGENCIA.md`](HANDOFF-AGENCIA.md) para todos los detalles técnicos, estructura de carpetas y contacto institucional.
