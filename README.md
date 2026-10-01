# sismoPUCP

Taller para alumnos: doce prácticas T01–T12, fotografías originales, fichas vacías, borradores locales y envío directo. El sitio de publicación está en `docs/`. Los ejemplos resueltos y sus soluciones no están incluidos en esa carpeta.

## Activar la recepción de entregas

1. En Supabase, abre SQL Editor, crea una consulta y ejecuta todo `supabase/activar-entregas.sql`.
2. El taller de destino está configurado automáticamente en la web. Los alumnos no escriben un código de sesión. El docente puede cerrar la recepción desde su panel.
3. En Authentication > Users, crea un usuario docente con correo y contraseña y confirma el correo desde el panel si corresponde.
4. Sustituye `TU_CORREO` en `supabase/autorizar-docente.sql` y ejecútalo en SQL Editor. La consulta final debe devolver tu correo.
5. Publica GitHub Pages desde la rama `main`, carpeta `/docs`. El acceso docente es `docente.html`.

La contraseña del usuario docente es distinta de la contraseña de PostgreSQL. Nunca incluyas contraseñas ni claves secretas en el repositorio. `docs/js/entregas-config.js` solo contiene la URL y la clave publicable del proyecto.

## Uso

Los alumnos introducen su nombre y Código PUCP en la cabecera fija, finalizan cada ficha y pulsan Enviar al instructor. La identidad de cada evaluación se toma de esa cabecera. Se entregan entre una y doce fichas finalizadas, sin fotografías añadidas ni borradores. Cada envío recibe un comprobante; un reintento idéntico usa el mismo ID. Las modificaciones deben finalizarse antes del único envío permitido por Código PUCP y sesión. Los reintentos idénticos conservan el mismo comprobante.

El panel docente requiere un usuario autorizado en `taller_docentes`, permite consultar entregas, descargar un CSV completo y abrir o cerrar la sesión de entregas. Las sesiones de acceso se mantienen en memoria. Las respuestas nunca se guardan en GitHub.

## Permisos

Las tablas tienen RLS. Los alumnos no pueden leer entregas, ni insertar o modificar directamente las tablas. La función `enviar_taller` comprueba el código de sesión, el tamaño, los casos permitidos y los campos básicos antes de insertar. Solo los docentes autorizados pueden consultar el conjunto de respuestas.

## Validación

Se verificaron en Edge las doce prácticas, sus imágenes, formularios vacíos, navegación, persistencia de borradores, exportación y diseño móvil. Se verificaron con un servidor simulado la finalización, envío, reintentos, errores de red, acceso docente, escape del contenido y CSV compatible con Excel.

Pendiente: ejecutar los scripts SQL en el proyecto Supabase y comprobar de extremo a extremo la entrega y los permisos reales antes de compartir el enlace con alumnos.

## Revisión de seguridad (01/10/2026)

Se retiraron criterios sugeridos residuales de tres casos del JavaScript público. Los contenidos ya publicados pueden persistir en copias y en el historial Git; retirar la versión actual no revoca esas copias. Toda fotografía, expediente y código servido por GitHub Pages se puede descargar.

Las entregas incluyen todos los campos de la evaluación finalizada excepto fotos y fotoMetadatos. La función limita cada entrega a 200000 bytes de respuestas y 4000 bytes de participante; 100 entregas suman como máximo aproximadamente 20.4 MB de JSON, más índices y metadatos. Los reenvíos modificados conservan historial y consumen espacio adicional.

El código de sesión es público y permite enviar: no autentica la identidad del alumno. Un visitante puede suplantar un Código PUCP o generar muchos envíos. Para identidad verificable y control de abuso hace falta autenticación de alumnos y límites de envío en servidor. Las estadísticas cargan todas las páginas y usan la última respuesta por alumno, sesión y caso; los textos completos quedan en detalle y CSV.

## Un envío por código

Ejecutar supabase/limitar-un-envio-por-codigo.sql en el SQL Editor para activar el límite de servidor. Se reserva atómicamente un envío por Código PUCP normalizado y sesión; también cuenta los códigos de entregas anteriores. Los reintentos con el mismo ID y contenido devuelven el mismo comprobante. Las respuestas existentes se conservan. El navegador advierte que no se podrán añadir ni modificar fichas después del envío y guarda el comprobante por código y sesión.

El panel incluye barras de decisiones y participación, mapa de grados por caso, coincidencia de decisiones, incertidumbre por rubro, distribuciones de sistemas e irregularidades y exploración anónima de fundamentos. La cobertura usa la cantidad editable de alumnos esperados (40 por defecto) × doce fichas. La cantidad se guarda por grupo en el navegador docente. No se agregan datos de demostración a la base ni al sitio.

## Pruebas docentes

Ejecutar supabase/activar-borrado-pruebas.sql para habilitar el borrado autenticado de una entrega de prueba y la comprobación del recibo. Borrar prueba elimina exclusivamente la entrega elegida por ID, pide confirmación y libera el código solo si no quedan otras entregas del mismo código y sesión. Ninguna entrega se borra al instalar la migración.

Las descripciones de daños son opcionales en el taller y solo se crean mediante el botón. Los espacios automáticos vacíos antiguos se retiran; el texto ya escrito se conserva.
