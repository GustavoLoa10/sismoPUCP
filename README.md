# sismoPUCP

Taller para alumnos: ocho prácticas T01–T08, fotografías originales, fichas vacías, borradores locales y exportación. El sitio de publicación está en `docs/`. Los ejemplos resueltos y sus soluciones no están incluidos en esa carpeta.

## Activar la recepción de entregas

1. En Supabase, abre SQL Editor, crea una consulta y ejecuta todo `supabase/activar-entregas.sql`.
2. Guarda el código de sesión devuelto y compártelo con los alumnos. El código se genera en el servidor y no está en la web.
3. En Authentication > Users, crea un usuario docente con correo y contraseña y confirma el correo desde el panel si corresponde.
4. Sustituye `TU_CORREO` en `supabase/autorizar-docente.sql` y ejecútalo en SQL Editor. La consulta final debe devolver tu correo.
5. Publica GitHub Pages desde la rama `main`, carpeta `/docs`. El acceso docente es `docente.html`.

La contraseña del usuario docente es distinta de la contraseña de PostgreSQL. Nunca incluyas contraseñas ni claves secretas en el repositorio. `docs/js/entregas-config.js` solo contiene la URL y la clave publicable del proyecto.

## Uso

Los alumnos finalizan cada ficha y pulsan Enviar al instructor con el código de sesión. Se entregan entre una y ocho fichas finalizadas, sin fotografías añadidas ni borradores. Cada envío recibe un comprobante; un reintento idéntico usa el mismo ID. Las modificaciones requieren finalizar de nuevo y generan otra entrega, conservando el historial.

El panel docente requiere un usuario autorizado en `taller_docentes`, permite consultar entregas, descargar un CSV completo y abrir o cerrar la sesión de entregas. Las sesiones de acceso se mantienen en memoria. Las respuestas nunca se guardan en GitHub.

## Permisos

Las tablas tienen RLS. Los alumnos no pueden leer entregas, ni insertar o modificar directamente las tablas. La función `enviar_taller` comprueba el código de sesión, el tamaño, los casos permitidos y los campos básicos antes de insertar. Solo los docentes autorizados pueden consultar el conjunto de respuestas.

## Validación

Se verificaron en Edge las ocho prácticas, sus imágenes, formularios vacíos, navegación, persistencia de borradores, exportación y diseño móvil. Se verificaron con un servidor simulado la finalización, envío, reintentos, errores de red, acceso docente, escape del contenido y CSV compatible con Excel.

Pendiente: ejecutar los scripts SQL en el proyecto Supabase y comprobar de extremo a extremo la entrega y los permisos reales antes de compartir el enlace con alumnos.
