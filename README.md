# Propuesta de rediseño para parlatia.com

Esta es una propuesta de página de inicio para Parlatia, hecha con su misma marca: colores, tipografías y logo. Es una maqueta que se puede abrir, probar y reutilizar.

**Ver la demo:** https://julianreves.github.io/parlatia-rediseno-demo/

## Qué incluye

- Un teléfono que recibe una llamada de ejemplo. Al contestar suena el audio real de la demo de Parlatia, el texto aparece palabra por palabra y la ficha del lead en el CRM se llena sola.
- Casos de uso por sector (aseguradoras y concesionarios).
- Los cuatro pasos de cada lead (llama, conversa, clasifica, transfiere y sincroniza), contados con un lead de ejemplo.
- Un panel de ejemplo con resumen, llamadas y reglas de negocio. Las reglas se pueden encender, apagar y agregar, y hay una caja para probar una situación.
- Una calculadora de leads que nadie llama a tiempo.
- Preguntas frecuentes y un formulario de contacto.

## Cómo usarlo

La demo funciona sin instalar nada. Tiene dos versiones:

| Carpeta | Para qué sirve |
| --- | --- |
| `index.html` | Un solo archivo con fuentes, logo y audios incluidos. Se abre con doble clic, también sin internet. |
| `src/` | La misma página con el código separado y legible: `index.html`, `styles.css`, `app.js` y los recursos en `assets/`. |

Para abrir `src/` en local, el navegador necesita un servidor (por el audio). Con Python basta con:

```bash
python3 -m http.server 8000
```

y luego abrir `http://localhost:8000/src/`.

## Qué cambiar

- Colores y tipografías: variables al inicio de `src/styles.css` (`:root`).
- Textos de las llamadas de ejemplo (`S`), casos de uso (`UC`) y reglas de negocio (`COND` y `ACT`): objetos en `src/app.js`.
- Contenido de cada sección: `src/index.html`.

## Qué es ilustrativo

- Los datos del panel, la ficha del CRM, los tiempos de cada paso y los valores iniciales de la calculadora son ejemplos.
- El formulario de contacto no envía nada.
- El texto que aparece con cada audio sigue la llamada. Los eventos que ocurren después de que termina el audio (por ejemplo, la renovación registrada en el CRM) son ilustrativos.
- Las afirmaciones legales y de privacidad de las preguntas frecuentes son las que ya tiene Parlatia en su sitio. Esta propuesta no las verificó.
- Los números de la web actual que no traen fuente (el 80 % y el 12 %) no se incluyeron.

## Licencia

El código se publica con licencia MIT (ver `LICENSE`). El nombre, el logo y los audios de demo son de Parlatia. Las fuentes Comfortaa y Manrope se publican con la licencia SIL Open Font.
