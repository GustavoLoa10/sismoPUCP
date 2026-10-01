// Doce expedientes para alumnos. Los casos guiados no contienen fichas resueltas.
const TALLER_CASOS=[
  {
    "id": "T09",
    "tipo": "practica",
    "documental": true,
    "numero": 1,
    "titulo": "Muros de tierra y cubierta dañados · Chupaca",
    "ubicacion": "Chupaca, Junín, Perú · dirección por confirmar",
    "eventoId": "PUCP-CHUPACA-24JUL",
    "evento": "Chupaca · 18/07/2026 · M 5.4",
    "fechaEvento": "2026-07-18T21:24:00-05:00",
    "nivel": "PRÁCTICA 1 · discusión guiada en el taller",
    "basal": "Edificaciones bajas de muros de tierra aparente y cubierta de madera con tejas. Configuración y amarres no verificados.",
    "contexto": "Lectura documental de imágenes aportadas, no inspección presencial del evaluador. Fecha de captura según DNG: 23/07/2026; no equivale a la fecha del sismo. Sin escala, planos, ensayos ni comprobación de cimentación, conexiones o capacidad residual. Las dos lentes no están cosidas: el visor usa una proyección aproximada y no permite medir grietas ni inclinaciones. Dirección y límites prediales por confirmar. No se ha confirmado que todos los volúmenes de las dos tomas correspondan al mismo predio.",
    "lecturaVisual": "Examine las fotografías y registre su propia evaluación. Complete la ficha durante la discusión del taller.",
    "recursos": [
      {
        "id": "T09:foto:0",
        "caseId": "T09",
        "tipo": "incluida",
        "origen": "aportada",
        "media": "panorama",
        "projection": "dual-fisheye",
        "src": "data/taller/practicas-guiadas/T09-0-src.jpg",
        "poster": "data/taller/practicas-guiadas/T09-0-poster.jpg",
        "titulo": "Vista 360° · 046 · Muros y cubierta con pérdidas de material",
        "descripcion": "DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Muros y cubierta con pérdidas de material",
        "autor": "Archivo aportado para Equipo PUCP",
        "fecha": "23/07/2026",
        "licencia": "Uso en el taller; no se ha declarado licencia de redistribución",
        "orden": 0
      },
      {
        "id": "T09:foto:1",
        "caseId": "T09",
        "tipo": "incluida",
        "origen": "aportada",
        "media": "panorama",
        "projection": "dual-fisheye",
        "src": "data/taller/practicas-guiadas/T09-1-src.jpg",
        "poster": "data/taller/practicas-guiadas/T09-1-poster.jpg",
        "titulo": "Vista 360° · 045 · Vista exterior del entorno y muro agrietado",
        "descripcion": "DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Vista exterior del entorno y muro agrietado",
        "autor": "Archivo aportado para Equipo PUCP",
        "fecha": "23/07/2026",
        "licencia": "Uso en el taller; no se ha declarado licencia de redistribución",
        "orden": 1
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo del aportante",
        "titulo": "Ocho archivos DNG de Insta360 X4 Air · captura 23/07/2026",
        "autor": "Aportados por el usuario para Equipo PUCP",
        "licencia": "Sin licencia de redistribución declarada"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Vista 360° · 046 · Muros y cubierta con pérdidas de material · DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Muros y cubierta con pérdidas de material"
      ],
      [
        "F2",
        "Vista 360° · 045 · Vista exterior del entorno y muro agrietado · DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Vista exterior del entorno y muro agrietado"
      ]
    ],
    "preguntas": [
      "¿Qué sistema resistente e irregularidades se pueden reconocer en estas vistas?",
      "¿Qué daños están documentados y qué partes no pueden evaluarse?",
      "¿Qué grado de daño asignaría y cómo fundamentaría la pancarta propuesta?"
    ]
  },
  {
    "id": "T10",
    "tipo": "practica",
    "documental": true,
    "numero": 2,
    "titulo": "Albañilería · daños exteriores e interiores · Chupaca",
    "ubicacion": "Chupaca, Junín, Perú · dirección por confirmar",
    "eventoId": "PUCP-CHUPACA-24JUL",
    "evento": "Chupaca · 18/07/2026 · M 5.4",
    "fechaEvento": "2026-07-18T21:24:00-05:00",
    "nivel": "PRÁCTICA 2 · discusión guiada en el taller",
    "basal": "Albañilería indicada por el aportante; ladrillo y elementos de concreto aparentes en algunas vistas. Función portante de paños, confinamiento y continuidad no verificados.",
    "contexto": "Lectura documental de imágenes aportadas, no inspección presencial del evaluador. Fecha de captura según DNG: 23/07/2026; no equivale a la fecha del sismo. Sin escala, planos, ensayos ni comprobación de cimentación, conexiones o capacidad residual. Las dos lentes no están cosidas: el visor usa una proyección aproximada y no permite medir grietas ni inclinaciones. Dirección y límites prediales por confirmar. La serie incluye vistas de sectores A y B. No se ha confirmado su pertenencia a un único inmueble; no se trasladan daños de un sector a otro. Las losas y columnas no se califican solo por sombras o distorsión óptica.",
    "lecturaVisual": "Examine las fotografías y registre su propia evaluación. Complete la ficha durante la discusión del taller.",
    "recursos": [
      {
        "id": "T10:foto:0",
        "caseId": "T10",
        "tipo": "incluida",
        "origen": "aportada",
        "media": "panorama",
        "projection": "dual-fisheye",
        "src": "data/taller/practicas-guiadas/T10-0-src.jpg",
        "poster": "data/taller/practicas-guiadas/T10-0-poster.jpg",
        "titulo": "Vista 360° · 070 · Exterior y entorno",
        "descripcion": "DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Exterior y entorno",
        "autor": "Archivo aportado para Equipo PUCP",
        "fecha": "23/07/2026",
        "licencia": "Uso en el taller; no se ha declarado licencia de redistribución",
        "orden": 0
      },
      {
        "id": "T10:foto:1",
        "caseId": "T10",
        "tipo": "incluida",
        "origen": "aportada",
        "media": "panorama",
        "projection": "dual-fisheye",
        "src": "data/taller/practicas-guiadas/T10-1-src.jpg",
        "poster": "data/taller/practicas-guiadas/T10-1-poster.jpg",
        "titulo": "Vista 360° · 073 · Interior A · paños agrietados",
        "descripcion": "DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Interior A · paños agrietados",
        "autor": "Archivo aportado para Equipo PUCP",
        "fecha": "23/07/2026",
        "licencia": "Uso en el taller; no se ha declarado licencia de redistribución",
        "orden": 1
      },
      {
        "id": "T10:foto:3",
        "caseId": "T10",
        "tipo": "incluida",
        "origen": "aportada",
        "media": "panorama",
        "projection": "dual-fisheye",
        "src": "data/taller/practicas-guiadas/T10-3-src.jpg",
        "poster": "data/taller/practicas-guiadas/T10-3-poster.jpg",
        "titulo": "Vista 360° · 075 · Interior A · detalle de paños",
        "descripcion": "DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Interior A · detalle de paños",
        "autor": "Archivo aportado para Equipo PUCP",
        "fecha": "23/07/2026",
        "licencia": "Uso en el taller; no se ha declarado licencia de redistribución",
        "orden": 3
      },
      {
        "id": "T10:foto:4",
        "caseId": "T10",
        "tipo": "incluida",
        "origen": "aportada",
        "media": "panorama",
        "projection": "dual-fisheye",
        "src": "data/taller/practicas-guiadas/T10-4-src.jpg",
        "poster": "data/taller/practicas-guiadas/T10-4-poster.jpg",
        "titulo": "Vista 360° · 078 · Exterior B · edificio y escombros",
        "descripcion": "DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Exterior B · edificio y escombros",
        "autor": "Archivo aportado para Equipo PUCP",
        "fecha": "23/07/2026",
        "licencia": "Uso en el taller; no se ha declarado licencia de redistribución",
        "orden": 4
      },
      {
        "id": "T10:foto:5",
        "caseId": "T10",
        "tipo": "incluida",
        "origen": "aportada",
        "media": "panorama",
        "projection": "dual-fisheye",
        "src": "data/taller/practicas-guiadas/T10-5-src.jpg",
        "poster": "data/taller/practicas-guiadas/T10-5-poster.jpg",
        "titulo": "Vista 360° · 080 · Interior B · materiales desprendidos",
        "descripcion": "DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Interior B · materiales desprendidos",
        "autor": "Archivo aportado para Equipo PUCP",
        "fecha": "23/07/2026",
        "licencia": "Uso en el taller; no se ha declarado licencia de redistribución",
        "orden": 5
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo del aportante",
        "titulo": "Ocho archivos DNG de Insta360 X4 Air · captura 23/07/2026",
        "autor": "Aportados por el usuario para Equipo PUCP",
        "licencia": "Sin licencia de redistribución declarada"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Vista 360° · 070 · Exterior y entorno · DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Exterior y entorno"
      ],
      [
        "F2",
        "Vista 360° · 073 · Interior A · paños agrietados · DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Interior A · paños agrietados"
      ],
      [
        "F3",
        "Vista 360° · 075 · Interior A · detalle de paños · DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Interior A · detalle de paños"
      ],
      [
        "F4",
        "Vista 360° · 078 · Exterior B · edificio y escombros · DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Exterior B · edificio y escombros"
      ],
      [
        "F5",
        "Vista 360° · 080 · Interior B · materiales desprendidos · DNG de Insta360 X4 Air revelado a JPEG. Dos lentes ojo de pez; exploración aproximada, sin cosido calibrado. Interior B · materiales desprendidos"
      ]
    ],
    "preguntas": [
      "¿Qué sistema resistente e irregularidades se pueden reconocer en estas vistas?",
      "¿Qué daños están documentados y qué partes no pueden evaluarse?",
      "¿Qué grado de daño asignaría y cómo fundamentaría la pancarta propuesta?"
    ]
  },
  {
    "id": "T11",
    "tipo": "practica",
    "documental": true,
    "numero": 3,
    "titulo": "Fisuras de cortante en muro · Erciş, Turquía",
    "ubicacion": "Erciş, Turquía",
    "eventoId": "DOC-C2",
    "evento": "Sismo 2011",
    "fechaEvento": "2026-09-26T09:00",
    "nivel": "PRÁCTICA 3 · discusión guiada en el taller",
    "basal": "Erciş, Turquía. Pórticos y muros de concreto. Fuente: EERI, figuras 2 y 3.",
    "contexto": "Se incluyen vistas documentales interiores y exteriores, parciales y limitadas a los sectores fotografiados; no equivalen a un recorrido completo. Análisis documental; no hubo visita presencial. Otras caras, niveles, cimentación, instalaciones y condición actual no verificados. La fecha de la ficha corresponde a su preparación didáctica, no al sismo ni a una inspección.",
    "lecturaVisual": "Examine las fotografías y registre su propia evaluación. Complete la ficha durante la discusión del taller.",
    "recursos": [
      {
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/practicas-guiadas/T11-0-src.jpg",
        "titulo": "Interior · muro original fisurado · EERI, figura 2",
        "descripcion": "La escuela reforzada tenía pórticos y muros. El informe describe grietas en muros originales de tres pisos, cerca de 1 mm en la base, y daño no estructural moderado.",
        "autor": "EERI, figuras 2 y 3",
        "licencia": "Crédito y condiciones de reproducción: consultar la fuente original",
        "licenciaUrl": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "fuente": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "fecha": "Sismo 2011",
        "orden": 0,
        "id": "T11:foto:0",
        "caseId": "T11"
      },
      {
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/practicas-guiadas/T11-1-src.jpg",
        "titulo": "Exterior · unión del muro añadido con el pórtico · EERI, figura 3",
        "descripcion": "Detalle de separación en la interfaz entre el muro de refuerzo y el pórtico existente, identificado por EERI; no se clasifica automáticamente como daño de tabique.",
        "autor": "EERI, figuras 2 y 3",
        "licencia": "Crédito y condiciones de reproducción: consultar la fuente original",
        "licenciaUrl": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "fuente": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "fecha": "Sismo 2011",
        "orden": 1,
        "id": "T11:foto:1",
        "caseId": "T11"
      },
      {
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/practicas-guiadas/T11-2-src.jpg",
        "titulo": "Vista general de la escuela · EERI, figura 1",
        "descripcion": "Vista exterior completa de la escuela Kazım Karabekir de Erciş; complementa la fotografía interior del muro y el detalle exterior de la unión del refuerzo.",
        "autor": "EERI, figura 1",
        "licencia": "Crédito y condiciones de reproducción: consultar la fuente original",
        "licenciaUrl": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "fuente": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "fecha": "Sismo 2011",
        "orden": 2,
        "id": "T11:foto:2",
        "caseId": "T11"
      }
    ],
    "fuentes": [
      {
        "tipo": "Recurso documental",
        "titulo": "Interior · muro original fisurado · EERI, figura 2",
        "autor": "EERI, figuras 2 y 3",
        "licencia": "Crédito y condiciones de reproducción: consultar la fuente original",
        "licenciaUrl": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "url": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/"
      },
      {
        "tipo": "Recurso documental",
        "titulo": "Exterior · unión del muro añadido con el pórtico · EERI, figura 3",
        "autor": "EERI, figuras 2 y 3",
        "licencia": "Crédito y condiciones de reproducción: consultar la fuente original",
        "licenciaUrl": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "url": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/"
      },
      {
        "tipo": "Recurso documental",
        "titulo": "Vista general de la escuela · EERI, figura 1",
        "autor": "EERI, figura 1",
        "licencia": "Crédito y condiciones de reproducción: consultar la fuente original",
        "licenciaUrl": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/",
        "url": "https://learningfromearthquakes.org/resources/performance-of-a-strengthened-school-building/"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Interior · muro original fisurado · EERI, figura 2 · La escuela reforzada tenía pórticos y muros. El informe describe grietas en muros originales de tres pisos, cerca de 1 mm en la base, y daño no estructural moderado."
      ],
      [
        "F2",
        "Exterior · unión del muro añadido con el pórtico · EERI, figura 3 · Detalle de separación en la interfaz entre el muro de refuerzo y el pórtico existente, identificado por EERI; no se clasifica automáticamente como daño de tabique."
      ],
      [
        "F3",
        "Vista general de la escuela · EERI, figura 1 · Vista exterior completa de la escuela Kazım Karabekir de Erciş; complementa la fotografía interior del muro y el detalle exterior de la unión del refuerzo."
      ]
    ],
    "preguntas": [
      "¿Qué sistema resistente e irregularidades se pueden reconocer en estas vistas?",
      "¿Qué daños están documentados y qué partes no pueden evaluarse?",
      "¿Qué grado de daño asignaría y cómo fundamentaría la pancarta propuesta?"
    ]
  },
  {
    "id": "T12",
    "tipo": "practica",
    "documental": true,
    "numero": 4,
    "titulo": "Casa histórica con colapso severo · Puebla",
    "ubicacion": "Centro histórico de Puebla, México",
    "eventoId": "MX2017",
    "evento": "México · sismo de Puebla · 19/09/2017",
    "fechaEvento": "2017-09-19T13:14",
    "nivel": "PRÁCTICA 4 · discusión guiada en el taller",
    "basal": "Centro histórico de Puebla, México. Mampostería histórica aparente; diafragmas, muros laterales y cubierta no inspeccionados. La identidad y fecha proceden de la ficha pública de la fotografía; los datos no visibles se conservan como no determinados.",
    "contexto": "Ejercicio limitado a las evidencias documentales E01A–E01B. Lectura documental de las fotografías y sus fichas de procedencia. No hubo inspección presencial; no se verificaron interior, cimentación, deformación residual, materiales, instalaciones ni condición previa salvo que la fuente lo indique. Las imágenes de comparación se muestran por separado: no acreditan una segunda vista del mismo inmueble ni se usan para trasladar daños al caso principal.",
    "lecturaVisual": "Examine las fotografías y registre su propia evaluación. Complete la ficha durante la discusión del taller.",
    "recursos": [
      {
        "id": "T12:foto:0",
        "caseId": "T12",
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/practicas-guiadas/T12-0-src.jpg",
        "titulo": "Imagen 1 · vista principal · Casa destruida · centro histórico de Puebla",
        "descripcion": "La fachada presenta pérdida extensa de muros y grandes cantidades de escombros en el frente.",
        "autor": "Isaacvp",
        "licencia": "CC BY-SA 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "fuente": "https://commons.wikimedia.org/wiki/File:Casa%20destruida%20en%20Centro%20Hist%C3%B3rico%20de%20Puebla.jpg",
        "fecha": "2017",
        "orden": 0
      }
    ],
    "fuentes": [
      {
        "tipo": "Fotografía principal",
        "titulo": "Casa destruida · centro histórico de Puebla",
        "autor": "Isaacvp",
        "licencia": "CC BY-SA 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "url": "https://commons.wikimedia.org/wiki/File:Casa%20destruida%20en%20Centro%20Hist%C3%B3rico%20de%20Puebla.jpg"
      },
      {
        "tipo": "Fuente documental (ver relación de cada figura)",
        "titulo": "Vivienda histórica apuntalada · centro de Puebla",
        "autor": "Luis Alvaz",
        "licencia": "CC BY-SA 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "url": "https://commons.wikimedia.org/wiki/File:Casa%20del%20centro%20de%20Puebla%20da%C3%B1ada%20por%20el%20terremoto%2006.jpg"
      },
      {
        "tipo": "Referencia del evento/metodología",
        "titulo": "Informe de reconocimiento EERI · Puebla 2017",
        "url": "https://www.eeri.org/component/content/article/3931-m7-1-puebla-mexico-earthquake-on-september-19-2017-final-report-now-available?Itemid=101&catid=1937&highlight=WzNd"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Imagen 1 · vista principal · Casa destruida · centro histórico de Puebla · La fachada presenta pérdida extensa de muros y grandes cantidades de escombros en el frente."
      ]
    ],
    "preguntas": [
      "¿Qué sistema resistente e irregularidades se pueden reconocer en estas vistas?",
      "¿Qué daños están documentados y qué partes no pueden evaluarse?",
      "¿Qué grado de daño asignaría y cómo fundamentaría la pancarta propuesta?"
    ]
  },
  {
    "id": "T01",
    "tipo": "practica",
    "documental": true,
    "numero": 5,
    "titulo": "Vivienda de tierra · exterior e interior · Chupaca",
    "ubicacion": "Chupaca, Junín, Perú · dirección por confirmar",
    "eventoId": "PUCP-CHUPACA-24JUL",
    "evento": "Chupaca · 18/07/2026 · M 5.4",
    "fechaEvento": "2026-07-18T21:24:00-05:00",
    "nivel": "PRÁCTICA 5 · archivo Equipo PUCP",
    "basal": "Vivienda de tierra según el aportante; muros de tierra aparentes, cubierta de madera y planchas metálicas. Conexiones y sistema resistente completo por verificar.",
    "lecturaVisual": "Observe exterior, vanos, muros interiores y apoyos de cubierta en las cuatro tomas.",
    "contexto": "Lectura de fotografías aportadas; no hubo inspección presencial. No se conocen planos, materiales ensayados, condición previa, capacidad residual ni dirección exacta. Las vistas parciales no certifican el estado de otras caras o niveles. La fecha de captura no equivale a la del sismo. Captura 24/07/2026 según nombre de archivo; sismo del 18/07/2026, identificado para este taller. Contexto sísmico: el IGP reporta M 5.4, a las 21:24 hora local (UTC−5), epicentro a 14 km al sur-suroeste de Chupaca y profundidad de 9.5 km, asociado a la reactivación de la falla Altos del Mantaro. Estos parámetros corresponden al evento regional; la ubicación exacta de esta vivienda sigue sin documentarse.",
    "recursos": [
      {
        "id": "T01:aporte:IMG_20260724_134055_00_275.jpg",
        "caseId": "T01",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes-20260928/IMG_20260724_134055_00_275.jpg",
        "titulo": "Exterior · fachada y acceso",
        "descripcion": "Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen.",
        "autor": "Equipo PUCP · archivo aportado",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 0,
        "media": "panorama",
        "projection": "single-fisheye",
        "poster": "data/taller/aportes-20260928/IMG_20260724_134055_00_275-preview.jpg",
        "fecha": "24/07/2026 · nombre de archivo",
        "initialLight": 1
      },
      {
        "id": "T01:aporte:IMG_20260724_134140_00_277.jpg",
        "caseId": "T01",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes-20260928/IMG_20260724_134140_00_277.jpg",
        "titulo": "Interior · encuentro de muro y cubierta",
        "descripcion": "Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen.",
        "autor": "Equipo PUCP · archivo aportado",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 1,
        "media": "panorama",
        "projection": "single-fisheye",
        "poster": "data/taller/aportes-20260928/IMG_20260724_134140_00_277-preview.jpg",
        "fecha": "24/07/2026 · nombre de archivo",
        "initialLight": 1
      },
      {
        "id": "T01:aporte:IMG_20260724_134327_00_281.jpg",
        "caseId": "T01",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes-20260928/IMG_20260724_134327_00_281.jpg",
        "titulo": "Interior · ambiente y paños",
        "descripcion": "Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen.",
        "autor": "Equipo PUCP · archivo aportado",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 2,
        "media": "panorama",
        "projection": "single-fisheye",
        "poster": "data/taller/aportes-20260928/IMG_20260724_134327_00_281-preview.jpg",
        "fecha": "24/07/2026 · nombre de archivo",
        "initialLight": 2
      },
      {
        "id": "T01:aporte:IMG_20260724_134407_00_282.jpg",
        "caseId": "T01",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes-20260928/IMG_20260724_134407_00_282.jpg",
        "titulo": "Exterior · detalle junto al vano",
        "descripcion": "Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen.",
        "autor": "Equipo PUCP · archivo aportado",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 3,
        "media": "panorama",
        "projection": "single-fisheye",
        "poster": "data/taller/aportes-20260928/IMG_20260724_134407_00_282-preview.jpg",
        "fecha": "24/07/2026 · nombre de archivo",
        "initialLight": 1
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo aportado",
        "titulo": "Downloads.rar · Vivienda de tierra · exterior e interior · Chupaca",
        "autor": "Equipo PUCP · aportado por el usuario",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada"
      },
      {
        "tipo": "Contexto sísmico · fuente oficial",
        "titulo": "IGP · Informe Técnico N.º 021-2026: sismo de Chupaca",
        "url": "https://sigrid.cenepred.gob.pe/sigridv3/documento/22458",
        "autor": "Instituto Geofísico del Perú"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Exterior · fachada y acceso · Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen."
      ],
      [
        "F2",
        "Interior · encuentro de muro y cubierta · Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen."
      ],
      [
        "F3",
        "Interior · ambiente y paños · Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen."
      ],
      [
        "F4",
        "Exterior · detalle junto al vano · Toma de una lente ojo de pez. Vista navegable parcial; proyección aproximada, sin medidas obtenibles de la imagen."
      ]
    ],
    "preguntas": [
      "Identifique el sistema aparente y los elementos que puede observar.",
      "Registre cada daño con su fotografía; diferencie observación de hipótesis.",
      "Complete los rubros con evidencia suficiente y marque No determinado en los demás.",
      "Fundamente una decisión preliminar de uso y las comprobaciones pendientes."
    ]
  },
  {
    "id": "T02",
    "tipo": "practica",
    "documental": true,
    "numero": 6,
    "titulo": "Edificio Tarqui · lectura de fachada",
    "ubicacion": "Localidad y dirección por confirmar",
    "eventoId": "PUCP-TARQUI",
    "evento": "Edificio Tarqui · evento por confirmar",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 6 · archivo Equipo PUCP",
    "basal": "Edificio de varios niveles con elementos de concreto aparentes y paños de cerramiento; no se confirma el sistema resistente por la fachada.",
    "lecturaVisual": "Compare la vista general con el encuadre de los niveles superiores.",
    "contexto": "Lectura de fotografías aportadas; no hubo inspección presencial. No se conocen planos, materiales ensayados, condición previa, capacidad residual ni dirección exacta. Las vistas parciales no certifican el estado de otras caras o niveles. La fecha de captura no equivale a la del sismo. Captura EXIF 24/04/2016; no se asume que sea la fecha del sismo.",
    "recursos": [
      {
        "id": "T02:aporte:DSC04171.JPG",
        "caseId": "T02",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes-20260928/DSC04171.JPG",
        "titulo": "Vista general · edificio y colindantes",
        "descripcion": "Fachada completa desde la calle, con planta baja y edificios contiguos.",
        "autor": "Equipo PUCP · archivo aportado",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 0,
        "fecha": "24/04/2016 · EXIF"
      },
      {
        "id": "T02:aporte:DSC04170.JPG",
        "caseId": "T02",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes-20260928/DSC04170.JPG",
        "titulo": "Vista cercana · niveles superiores",
        "descripcion": "Misma fachada en encuadre cercano; permite revisar bordes y encuentros visibles.",
        "autor": "Equipo PUCP · archivo aportado",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 1,
        "fecha": "24/04/2016 · EXIF"
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo aportado",
        "titulo": "Downloads.rar · Edificio Tarqui · lectura de fachada",
        "autor": "Equipo PUCP · aportado por el usuario",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Vista general · edificio y colindantes · Fachada completa desde la calle, con planta baja y edificios contiguos."
      ],
      [
        "F2",
        "Vista cercana · niveles superiores · Misma fachada en encuadre cercano; permite revisar bordes y encuentros visibles."
      ]
    ],
    "preguntas": [
      "Identifique el sistema aparente y los elementos que puede observar.",
      "Registre cada daño con su fotografía; diferencie observación de hipótesis.",
      "Complete los rubros con evidencia suficiente y marque No determinado en los demás.",
      "Fundamente una decisión preliminar de uso y las comprobaciones pendientes."
    ]
  },
  {
    "id": "T03",
    "titulo": "Pérdida de cerramientos en edificio residencial · Maracay",
    "nivel": "PRÁCTICA 7 · peligro de caída",
    "lecturaVisual": "Varios paños de fachada presentan pérdida de material y huecos; se observan fragmentos y un control provisional del frente.",
    "basal": "Maracay, Aragua, Venezuela. Edificio residencial de concreto aparente con cerramientos de mampostería; estructura principal no evaluable desde la imagen. La identidad y fecha proceden de la ficha pública de la fotografía; los datos no visibles se conservan como no determinados.",
    "contexto": "Ejercicio limitado a las evidencias documentales E01A–E01B. Lectura documental de las fotografías y sus fichas de procedencia. No hubo inspección presencial; no se verificaron interior, cimentación, deformación residual, materiales, instalaciones ni condición previa salvo que la fuente lo indique.",
    "evidencias": [
      [
        "E01A",
        "Residencias Los Mangos · Maracay. Fotografía documental de Sauri b, 25/06/2026."
      ],
      [
        "E01B",
        "Residencias Los Mangos · vista complementaria. Segunda fotografía de Residencias Los Mangos, Maracay, tomada desde otro encuadre después del sismo. Autoría: Sauri b, 25/06/2026."
      ],
      [
        "E02",
        "Varios paños de fachada presentan pérdida de material y huecos; se observan fragmentos y un control provisional del frente."
      ],
      [
        "E03",
        "Lectura documental de las fotografías y sus fichas de procedencia. No hubo inspección presencial; no se verificaron interior, cimentación, deformación residual, materiales, instalaciones ni condición previa salvo que la fuente lo indique."
      ]
    ],
    "preguntas": [
      "¿Qué paños de relleno perdieron material y qué elementos portantes siguen sin evaluar?",
      "¿Cómo cambia la zona de exclusión por la altura y las réplicas?",
      "Propón grado del daño visible y restricciones diferenciadas para fachada, balcones y ambientes."
    ],
    "tipo": "practica",
    "asset": "VE01",
    "base": 7,
    "eventoId": "VE2026",
    "ubicacion": "Maracay, Aragua, Venezuela",
    "lectura": "Varios paños de fachada presentan pérdida de material y huecos; se observan fragmentos y un control provisional del frente.",
    "sistema": "Edificio residencial de concreto aparente con cerramientos de mampostería; estructura principal no evaluable desde la imagen.",
    "decision": "uso_restringido",
    "restricciones": "Cerrar balcones, ambientes contiguos y la franja exterior bajo la fachada hasta estabilizar elementos sueltos.",
    "danos": {
      "muros": "moderado",
      "caida_objetos": "si"
    },
    "registros": [
      {
        "rubro": "muros",
        "elemento": "Cerramientos de fachada",
        "ubicacion": "Varios niveles del frente",
        "patron": "Pérdida de paños y exposición de bordes en cerramientos.",
        "medicion": "No medida; la fuente fotográfica no aporta escala ni levantamiento.",
        "mecanismo": "Compatible con respuesta fuera del plano de la mampostería; anclajes por verificar.",
        "severidad": "moderado",
        "evidencia": "E01 · fotografía documental incluida."
      },
      {
        "rubro": "caida_objetos",
        "elemento": "Mampostería y acabados",
        "ubicacion": "Fachada y planta baja",
        "patron": "Fragmentos desprendidos y bordes remanentes expuestos.",
        "medicion": "No medida; la fuente fotográfica no aporta escala ni levantamiento.",
        "mecanismo": "Peligro de nuevas caídas durante réplicas.",
        "severidad": "severo",
        "evidencia": "E01 · fotografía documental incluida."
      }
    ],
    "fundamento": "E01 muestra pérdida de cerramientos en altura y exposición del área inferior; no muestra el estado de columnas, vigas ni otras fachadas.",
    "accion": "Estabilizar o retirar piezas sueltas, revisar todos los cerramientos y evaluar la estructura desde rutas seguras.",
    "documental": true,
    "fechaEvento": "2026-06-24T23:00",
    "evento": "Venezuela · secuencia sísmica · 24/06/2026",
    "fuentes": [
      {
        "tipo": "Fotografía principal",
        "titulo": "Residencias Los Mangos · Maracay",
        "autor": "Sauri b",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "url": "https://commons.wikimedia.org/wiki/File:HB-25-JUN-2026%20-%20Res%20LosMangos%20Maracay%2006.jpg"
      },
      {
        "tipo": "Fotografía complementaria independiente",
        "titulo": "Residencias Los Mangos · vista complementaria",
        "autor": "Sauri b",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "url": "https://commons.wikimedia.org/wiki/File:HB-25-JUN-2026%20-%20Res%20LosMangos%20Maracay%2005.jpg"
      },
      {
        "tipo": "Referencia del evento/metodología",
        "titulo": "USGS · terremotos significativos de 2026",
        "url": "https://earthquake.usgs.gov/earthquakes/browse/significant.php?year=2026"
      }
    ],
    "recursos": [
      {
        "id": "T03:VE01:01",
        "caseId": "T03",
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/reales/ve01.jpg",
        "titulo": "Imagen 1 · vista principal · Residencias Los Mangos · Maracay",
        "descripcion": "Varios paños de fachada presentan pérdida de material y huecos; se observan fragmentos y un control provisional del frente.",
        "autor": "Sauri b",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "fuente": "https://commons.wikimedia.org/wiki/File:HB-25-JUN-2026%20-%20Res%20LosMangos%20Maracay%2006.jpg",
        "fecha": "25/06/2026",
        "orden": 0
      },
      {
        "id": "T03:VE01:02",
        "caseId": "T03",
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/reales/ve01_02.jpg",
        "titulo": "Imagen 2 · vista complementaria · Residencias Los Mangos · vista complementaria",
        "descripcion": "Segunda fotografía de Residencias Los Mangos, Maracay, tomada desde otro encuadre después del sismo.",
        "autor": "Sauri b",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "fuente": "https://commons.wikimedia.org/wiki/File:HB-25-JUN-2026%20-%20Res%20LosMangos%20Maracay%2005.jpg",
        "fecha": "25/06/2026",
        "orden": 1
      }
    ],
    "numero": 7
  },
  {
    "id": "T04",
    "titulo": "Torre de iglesia con fisuras reportadas · Valencia",
    "nivel": "PRÁCTICA 8 · elementos elevados",
    "lecturaVisual": "La fotografía documenta una torre alta; las fisuras reportadas por la fuente no son cuantificables en la imagen general.",
    "basal": "Valencia, Carabobo, Venezuela. Torre histórica de mampostería aparente; interior, campanario, coronación y conexiones no inspeccionados. La identidad y fecha proceden de la ficha pública de la fotografía; los datos no visibles se conservan como no determinados.",
    "contexto": "Ejercicio limitado a las evidencias documentales E01A–E01B. Lectura documental de las fotografías y sus fichas de procedencia. No hubo inspección presencial; no se verificaron interior, cimentación, deformación residual, materiales, instalaciones ni condición previa salvo que la fuente lo indique.",
    "evidencias": [
      [
        "E01A",
        "Torre de la Catedral de Valencia. Fotografía documental de SunsetRetro, 07/2026."
      ],
      [
        "E01B",
        "Catedral de Valencia · vista este. Segunda fotografía de la Catedral de Valencia, tomada desde otro ángulo en la misma serie documental. Autoría: SunsetRetro, 01/07/2026."
      ],
      [
        "E02",
        "La fotografía documenta una torre alta; las fisuras reportadas por la fuente no son cuantificables en la imagen general."
      ],
      [
        "E03",
        "Lectura documental de las fotografías y sus fichas de procedencia. No hubo inspección presencial; no se verificaron interior, cimentación, deformación residual, materiales, instalaciones ni condición previa salvo que la fuente lo indique."
      ]
    ],
    "preguntas": [
      "¿Por qué importa la altura aunque la fisura no se mida?",
      "¿Qué equipo permitiría observar sin exponerse?",
      "¿Cómo se delimita la zona de caída?"
    ],
    "tipo": "practica",
    "asset": "VE04",
    "base": 8,
    "eventoId": "VE2026",
    "ubicacion": "Valencia, Carabobo, Venezuela",
    "lectura": "La fotografía documenta una torre alta; las fisuras reportadas por la fuente no son cuantificables en la imagen general.",
    "sistema": "Torre histórica de mampostería aparente; interior, campanario, coronación y conexiones no inspeccionados.",
    "decision": "uso_restringido",
    "restricciones": "Impedir acceso a la torre y permanencia en su zona de caída potencial hasta evaluación especializada.",
    "danos": {
      "parapetos": "moderado"
    },
    "registros": [
      {
        "rubro": "parapetos",
        "elemento": "Coronación y elementos altos de la torre",
        "ubicacion": "Torre de la catedral",
        "patron": "Fisuras reportadas por la fuente; geometría y abertura no medibles en esta toma.",
        "medicion": "No medida; la fuente fotográfica no aporta escala ni levantamiento.",
        "mecanismo": "Posible pérdida localizada de continuidad con peligro asociado a elementos elevados; por verificar.",
        "severidad": "moderado",
        "evidencia": "E01 · fotografía documental incluida."
      }
    ],
    "fundamento": "La altura aumenta la consecuencia de un desprendimiento y la vista general no descarta daño oculto; la restricción se limita a torre y perímetro.",
    "accion": "Inspección cercana con medios seguros, registro de fisuras y revisión de coronación, campanas y conexiones.",
    "documental": true,
    "fechaEvento": "2026-06-24T23:00",
    "evento": "Venezuela · secuencia sísmica · 24/06/2026",
    "fuentes": [
      {
        "tipo": "Fotografía principal",
        "titulo": "Torre de la Catedral de Valencia",
        "autor": "SunsetRetro",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "url": "https://commons.wikimedia.org/wiki/File:Catedral%20de%20Valencia%2C%20Venezuela%20(Jul%202026)%2004.jpg"
      },
      {
        "tipo": "Fotografía complementaria independiente",
        "titulo": "Catedral de Valencia · vista este",
        "autor": "SunsetRetro",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "url": "https://commons.wikimedia.org/wiki/File:Catedral%20de%20Valencia%2C%20Venezuela%20(Jul%202026)%2002.jpg"
      },
      {
        "tipo": "Referencia del evento/metodología",
        "titulo": "USGS · terremotos significativos de 2026",
        "url": "https://earthquake.usgs.gov/earthquakes/browse/significant.php?year=2026"
      }
    ],
    "recursos": [
      {
        "id": "T04:VE04:01",
        "caseId": "T04",
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/reales/ve04.jpg",
        "titulo": "Imagen 1 · vista principal · Torre de la Catedral de Valencia",
        "descripcion": "La fotografía documenta una torre alta; las fisuras reportadas por la fuente no son cuantificables en la imagen general.",
        "autor": "SunsetRetro",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "fuente": "https://commons.wikimedia.org/wiki/File:Catedral%20de%20Valencia%2C%20Venezuela%20(Jul%202026)%2004.jpg",
        "fecha": "07/2026",
        "orden": 0
      },
      {
        "id": "T04:VE04:02",
        "caseId": "T04",
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/reales/ve04_02.jpg",
        "titulo": "Imagen 2 · vista complementaria · Catedral de Valencia · vista este",
        "descripcion": "Segunda fotografía de la Catedral de Valencia, tomada desde otro ángulo en la misma serie documental.",
        "autor": "SunsetRetro",
        "licencia": "CC BY 4.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by/4.0/",
        "fuente": "https://commons.wikimedia.org/wiki/File:Catedral%20de%20Valencia%2C%20Venezuela%20(Jul%202026)%2002.jpg",
        "fecha": "01/07/2026",
        "orden": 1
      }
    ],
    "numero": 8
  },
  {
    "id": "T05",
    "tipo": "practica",
    "documental": true,
    "numero": 9,
    "titulo": "Hospital IES · Ecuador 2016",
    "ubicacion": "Ecuador · ciudad y dirección por confirmar",
    "eventoId": "PUCP-LOTE2-hospital-ies",
    "evento": "Ecuador · Pedernales · 16/04/2016 · Mw 7.8",
    "fechaEvento": "2016-04-16T18:58:00-05:00",
    "nivel": "PRÁCTICA 9 · archivo Equipo PUCP",
    "basal": "Elementos de concreto armado aparentes y cerramientos de mampostería; función de cada elemento y configuración resistente completa por verificar.",
    "lecturaVisual": "Compare las vistas generales y los detalles; registre únicamente lo que cada fotografía permite observar.",
    "contexto": "Archivo aportado por el usuario y agrupado por inmueble. Sin inspección presencial, planos, escala de medición ni comprobación independiente de dirección, fecha de captura o sistema completo. No se atribuyen daños a niveles y elementos ocultos. 23/04/2016 · captura EXIF. Contexto sísmico: el terremoto ocurrió el 16/04/2016 a las 18:58 hora local (UTC−5), con magnitud Mw 7.8 y epicentro frente a Pedernales, Manabí. El IG-EPN reportó inicialmente una profundidad de 20 km y lo atribuyó a la subducción de la placa de Nazca bajo la Sudamericana. El epicentro no indica la ubicación del hospital fotografiado; su ciudad y dirección aún no están documentadas.",
    "recursos": [
      {
        "id": "T05:lote2:1",
        "caseId": "T05",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/hospital-ies/DSC03757.JPG",
        "titulo": "Vista general del hospital",
        "descripcion": "Fachadas y varios niveles visibles desde el perímetro exterior.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "23/04/2016 · captura EXIF",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 0
      },
      {
        "id": "T05:lote2:2",
        "caseId": "T05",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/hospital-ies/DSC03765.JPG",
        "titulo": "Vista del costado y encuentros",
        "descripcion": "Otra fachada con paños abiertos y escombros al pie del edificio.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "23/04/2016 · captura EXIF",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 1
      },
      {
        "id": "T05:lote2:3",
        "caseId": "T05",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/hospital-ies/DSC03760.JPG",
        "titulo": "Detalle de cerramientos y elementos expuestos",
        "descripcion": "Vista cercana de paños de ladrillo, acabados y componentes interiores expuestos; no equivale a un recorrido interior.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "23/04/2016 · captura EXIF",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 2
      },
      {
        "id": "T05:lote2:4",
        "caseId": "T05",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/hospital-ies/DSC03762.JPG",
        "titulo": "Detalle de fachada abierta",
        "descripcion": "Encuentro de componentes de concreto, cerramientos y elementos suspendidos visibles.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "23/04/2016 · captura EXIF",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 3
      },
      {
        "id": "T05:gustavo-loa",
        "caseId": "T05",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/practicas-guiadas/ejercicio-09-gustavo-loa.jpg",
        "titulo": "Registro de inspección · Gustavo Loa Canales",
        "descripcion": "Fotografía aportada por Gustavo Loa Canales para este ejercicio. Vista del interior, columna, cerramientos e instalaciones; registre su evaluación a partir de lo observable.",
        "autor": "Ing. Gustavo Loa Canales, PhD",
        "licencia": "Fotografía aportada por el autor para uso académico en este taller",
        "fecha": "Fecha de captura no documentada",
        "orden": 4
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo aportado",
        "titulo": "Downloads2.rar · Hospital IES · Ecuador 2016",
        "autor": "Equipo PUCP · aportado por el usuario",
        "licencia": "Uso en el taller; licencia de redistribución no declarada"
      },
      {
        "tipo": "Contexto sísmico · fuente oficial",
        "titulo": "IG-EPN · Informe Sísmico Especial N.º 13-2016",
        "url": "https://www.igepn.edu.ec/servicios/noticias/1317-informe-sismico-especial-n-13-2016",
        "autor": "Instituto Geofísico · Escuela Politécnica Nacional"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Vista general del hospital · Fachadas y varios niveles visibles desde el perímetro exterior."
      ],
      [
        "F2",
        "Vista del costado y encuentros · Otra fachada con paños abiertos y escombros al pie del edificio."
      ],
      [
        "F3",
        "Detalle de cerramientos y elementos expuestos · Vista cercana de paños de ladrillo, acabados y componentes interiores expuestos; no equivale a un recorrido interior."
      ],
      [
        "F4",
        "Detalle de fachada abierta · Encuentro de componentes de concreto, cerramientos y elementos suspendidos visibles."
      ],
      [
        "F-G",
        "Registro adicional aportado: vista del interior, columna, cerramientos e instalaciones."
      ]
    ],
    "preguntas": [
      "Identifique el sistema aparente y los elementos que puede observar.",
      "Registre cada daño con su fotografía; diferencie observación de hipótesis.",
      "Complete los rubros con evidencia suficiente y marque No determinado en los demás.",
      "Fundamente una decisión preliminar de uso y las comprobaciones pendientes."
    ]
  },
  {
    "id": "T06",
    "tipo": "practica",
    "documental": true,
    "numero": 10,
    "titulo": "Edificio Alto Arauco · Maule 2010",
    "ubicacion": "Chile · dirección exacta por confirmar",
    "eventoId": "PUCP-LOTE2-alto-arauco",
    "evento": "Maule, Chile · sismo de 2010 (archivo del aportante)",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 10 · archivo Equipo PUCP",
    "basal": "Edificio en altura con elementos de concreto y revestimiento de ladrillo aparente; no se define el sistema resistente global a partir de la fachada.",
    "lecturaVisual": "Compare las vistas generales y los detalles; registre únicamente lo que cada fotografía permite observar.",
    "contexto": "Archivo aportado por el usuario y agrupado por inmueble. Sin inspección presencial, planos, escala de medición ni comprobación independiente de dirección, fecha de captura o sistema completo. No se atribuyen daños a niveles y elementos ocultos. Archivo identificado como Maule 2010 · captura no confirmada.",
    "recursos": [
      {
        "id": "T06:lote2:1",
        "caseId": "T06",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/alto-arauco/DSC_0317.jpg",
        "titulo": "Vista general del edificio",
        "descripcion": "Fachada principal y volumen completo desde la calle.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 0
      },
      {
        "id": "T06:lote2:2",
        "caseId": "T06",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/alto-arauco/DSC_0325.jpg",
        "titulo": "Otra vista general de fachada",
        "descripcion": "Segundo encuadre de la serie aportada, con acceso y niveles superiores.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 1
      },
      {
        "id": "T06:lote2:3",
        "caseId": "T06",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/alto-arauco/DSC_0324.jpg",
        "titulo": "Fachada y niveles inferiores",
        "descripcion": "Vista oblicua de los paños y encuentros de los niveles inferiores.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 2
      },
      {
        "id": "T06:lote2:4",
        "caseId": "T06",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/alto-arauco/DSC_0319.jpg",
        "titulo": "Detalle de encuentro en fachada",
        "descripcion": "Acercamiento a una zona con pérdida de material junto al encuentro del volumen bajo.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 3
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo aportado",
        "titulo": "Downloads2.rar · Edificio Alto Arauco · Maule 2010",
        "autor": "Equipo PUCP · aportado por el usuario",
        "licencia": "Uso en el taller; licencia de redistribución no declarada"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Vista general del edificio · Fachada principal y volumen completo desde la calle."
      ],
      [
        "F2",
        "Otra vista general de fachada · Segundo encuadre de la serie aportada, con acceso y niveles superiores."
      ],
      [
        "F3",
        "Fachada y niveles inferiores · Vista oblicua de los paños y encuentros de los niveles inferiores."
      ],
      [
        "F4",
        "Detalle de encuentro en fachada · Acercamiento a una zona con pérdida de material junto al encuentro del volumen bajo."
      ]
    ],
    "preguntas": [
      "Identifique el sistema aparente y los elementos que puede observar.",
      "Registre cada daño con su fotografía; diferencie observación de hipótesis.",
      "Complete los rubros con evidencia suficiente y marque No determinado en los demás.",
      "Fundamente una decisión preliminar de uso y las comprobaciones pendientes."
    ]
  },
  {
    "id": "T07",
    "tipo": "practica",
    "documental": true,
    "numero": 11,
    "titulo": "Edificio Patio Mayor · Maule 2010",
    "ubicacion": "Chile · dirección exacta por confirmar",
    "eventoId": "PUCP-LOTE2-patio-mayor",
    "evento": "Maule, Chile · sismo de 2010 (archivo del aportante)",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 11 · archivo Equipo PUCP",
    "basal": "Edificio con elementos de concreto aparentes y acabado de ladrillo. Configuración, continuidad y papel resistente de los elementos de fachada por verificar.",
    "lecturaVisual": "Compare las vistas generales y los detalles; registre únicamente lo que cada fotografía permite observar.",
    "contexto": "Archivo aportado por el usuario y agrupado por inmueble. Sin inspección presencial, planos, escala de medición ni comprobación independiente de dirección, fecha de captura o sistema completo. No se atribuyen daños a niveles y elementos ocultos. Archivo identificado como Maule 2010 · captura no confirmada.",
    "recursos": [
      {
        "id": "T07:lote2:1",
        "caseId": "T07",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/patio-mayor/Edificio%20Patio%20Mayor%20Maule%202010.jpg",
        "titulo": "Vista general del conjunto",
        "descripcion": "Fachada, volumen y entorno de acceso de la serie aportada.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 0
      },
      {
        "id": "T07:lote2:2",
        "caseId": "T07",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/patio-mayor/DSC_0177.jpg",
        "titulo": "Detalle junto a vano",
        "descripcion": "Zona con pérdida de acabado y material expuesto junto al encuentro horizontal.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 1
      },
      {
        "id": "T07:lote2:3",
        "caseId": "T07",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/patio-mayor/Edificio%20Patio%20Mayor%20Maule%202010%202.jpg",
        "titulo": "Segundo encuadre del detalle junto a vano",
        "descripcion": "Vista de la misma zona de fachada; permite comparar el encuadre, no añade una medida.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 2
      },
      {
        "id": "T07:lote2:4",
        "caseId": "T07",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/patio-mayor/DSC_0181.jpg",
        "titulo": "Detalle de borde lateral",
        "descripcion": "Piezas y acabados con discontinuidades junto a un borde de fachada.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 3
      },
      {
        "id": "T07:lote2:5",
        "caseId": "T07",
        "tipo": "incluida",
        "origen": "aportada",
        "src": "data/taller/aportes2-20260928/patio-mayor/DSC_0275.jpg",
        "titulo": "Detalle de encuentro horizontal",
        "descripcion": "Banda de material expuesto bajo el acabado de ladrillo; profundidad y continuidad interna no verificadas.",
        "autor": "Equipo PUCP · archivo aportado",
        "fecha": "Archivo identificado como Maule 2010 · captura no confirmada",
        "licencia": "Archivo aportado para uso en el taller; licencia de redistribución no declarada",
        "orden": 4
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo aportado",
        "titulo": "Downloads2.rar · Edificio Patio Mayor · Maule 2010",
        "autor": "Equipo PUCP · aportado por el usuario",
        "licencia": "Uso en el taller; licencia de redistribución no declarada"
      }
    ],
    "evidencias": [
      [
        "F1",
        "Vista general del conjunto · Fachada, volumen y entorno de acceso de la serie aportada."
      ],
      [
        "F2",
        "Detalle junto a vano · Zona con pérdida de acabado y material expuesto junto al encuentro horizontal."
      ],
      [
        "F3",
        "Segundo encuadre del detalle junto a vano · Vista de la misma zona de fachada; permite comparar el encuadre, no añade una medida."
      ],
      [
        "F4",
        "Detalle de borde lateral · Piezas y acabados con discontinuidades junto a un borde de fachada."
      ],
      [
        "F5",
        "Detalle de encuentro horizontal · Banda de material expuesto bajo el acabado de ladrillo; profundidad y continuidad interna no verificadas."
      ]
    ],
    "preguntas": [
      "Identifique el sistema aparente y los elementos que puede observar.",
      "Registre cada daño con su fotografía; diferencie observación de hipótesis.",
      "Complete los rubros con evidencia suficiente y marque No determinado en los demás.",
      "Fundamente una decisión preliminar de uso y las comprobaciones pendientes."
    ]
  },
  {
    "id": "T08",
    "titulo": "Fachada y acceso con desprendimientos · Ciudad de México",
    "nivel": "PRÁCTICA 12 · lectura de fachada y límites de la evidencia",
    "lecturaVisual": "Localice discontinuidades y pérdidas de acabado, distinga material expuesto de elementos resistentes y documente las restricciones existentes.",
    "basal": "Edificio de varios niveles con cerramientos de ladrillo visibles bajo el acabado desprendido. Sistema resistente, función portante de los paños y estado interior no confirmados. La referencia original sitúa la serie en Condesa; el letrero fotografiado indica Roma Sur.",
    "contexto": "Lectura exterior de una fotografía original de 3648 × 2736 píxeles, sin mediciones ni inspección presencial. La segunda foto de la serie muestra otra fachada y se separa como comparación. No se deduce daño de columnas o vigas a partir de revestimientos ni se considera la señal previa como evaluación propia.",
    "evidencias": [
      [
        "F1 · Vista principal",
        "Fachada turquesa con grietas, pérdidas de acabado y ladrillo expuesto en varios paños."
      ],
      [
        "Zona A · Paños y vanos",
        "Revise las franjas bajo las ventanas y los paños estrechos entre vanos. Indique lo visible y lo que requiere comprobar profundidad y función estructural."
      ],
      [
        "Zona B · Acceso y acera",
        "Localice material caído y piezas remanentes sobre las zonas de paso. Distinga la exposición al desprendimiento del estado global del edificio."
      ],
      [
        "Zona C · Control previo",
        "Se observan cinta y un aviso de restricción. Registre su existencia, pero fundamente su propuesta con sus propias observaciones."
      ],
      [
        "Límites",
        "Sin escala, otras fachadas, recorrido interior, planos ni comprobación de conexiones. La foto de comparación pertenece a otro edificio."
      ]
    ],
    "preguntas": [
      "¿Qué daño corresponde al acabado y cuál podría involucrar el paño? Indique el sector de F1 y la comprobación necesaria.",
      "¿Puede identificar el sistema resistente con esta toma? Use No determinado cuando no alcance la evidencia.",
      "¿Qué peligro existe en el acceso y la acera, y qué medida concreta propondría?",
      "¿Qué información aporta el aviso previo y qué parte de la evaluación debe fundamentar usted?",
      "Complete la ficha sin atribuir daños al edificio de comparación. No estime aberturas o porcentaje global sin una base suficiente."
    ],
    "tipo": "practica",
    "asset": "MX03",
    "base": 1,
    "eventoId": "MX2017",
    "ubicacion": "Ciudad de México · calle Toluca según el letrero visible; ubicación exacta por verificar",
    "lectura": "Se observan desprendimientos y daño en cerramientos de los niveles inferiores, con cinta de restricción en el entorno.",
    "sistema": "Edificio de varios niveles con estructura no confirmada y cerramientos aparentes; solo una fachada documentada.",
    "decision": "uso_restringido",
    "restricciones": "Cerrar la franja de fachada y el acceso afectado; no ocupar áreas adyacentes hasta verificar estructura y elementos sueltos.",
    "danos": {
      "muros": "moderado",
      "caida_objetos": "si"
    },
    "registros": [
      {
        "rubro": "muros",
        "elemento": "Cerramientos de fachada",
        "ubicacion": "Niveles inferiores",
        "patron": "Pérdida localizada de material y discontinuidades en paños de cerramiento.",
        "medicion": "No medida; la fuente fotográfica no aporta escala ni levantamiento.",
        "mecanismo": "Compatible con daño fuera del plano o interacción cerramiento-estructura; por confirmar.",
        "severidad": "moderado",
        "evidencia": "E01 · fotografía documental incluida."
      },
      {
        "rubro": "caida_objetos",
        "elemento": "Fragmentos de fachada",
        "ubicacion": "Acera y acceso",
        "patron": "Material caído y bordes remanentes potencialmente sueltos.",
        "medicion": "No medida; la fuente fotográfica no aporta escala ni levantamiento.",
        "mecanismo": "Desprendimiento desde cerramientos hacia zona de paso.",
        "severidad": "severo",
        "evidencia": "E01 · fotografía documental incluida."
      }
    ],
    "fundamento": "E01 evidencia material desprendido en la fachada y un control de acceso; la estructura interior no es visible.",
    "accion": "Retirar elementos sueltos bajo procedimiento seguro y evaluar estructura, fachadas restantes y circulación interior.",
    "documental": true,
    "fechaEvento": "2017-09-19T13:14",
    "evento": "México · sismo de Puebla · 19/09/2017",
    "fuentes": [
      {
        "tipo": "Fotografía principal · alta resolución",
        "titulo": "Edificio dañado · colonia Condesa, Ciudad de México",
        "autor": "Adam Jones",
        "licencia": "CC BY-SA 2.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
        "url": "https://commons.wikimedia.org/wiki/File:Damaged%20Building%20from%20September%202017%20Earthquake%20-%20Condesa%20District%20-%20Mexico%20City%20-%20Mexico%20-%2001%20(24942881218).jpg"
      },
      {
        "tipo": "Comparación de otro inmueble",
        "titulo": "Edificio dañado en la Condesa · otro encuadre",
        "autor": "Adam Jones",
        "licencia": "CC BY-SA 2.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
        "url": "https://commons.wikimedia.org/wiki/File:Damaged%20Building%20from%20September%202017%20Earthquake%20-%20Condesa%20District%20-%20Mexico%20City%20-%20Mexico%20-%2003%20(24942860098).jpg"
      },
      {
        "tipo": "Referencia del evento/metodología",
        "titulo": "Informe de reconocimiento EERI · Puebla 2017",
        "url": "https://www.eeri.org/component/content/article/3931-m7-1-puebla-mexico-earthquake-on-september-19-2017-final-report-now-available?Itemid=101&catid=1937&highlight=WzNd"
      }
    ],
    "recursos": [
      {
        "id": "T08:MX03:01",
        "caseId": "T08",
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/reales/mx03_original.jpg",
        "titulo": "Vista de fachada y acceso · fotografía original de alta resolución",
        "descripcion": "Observe los paños entre ventanas, la banda bajo los vanos, el lateral y los escombros junto al acceso. Abra la imagen en pantalla completa para revisar el material expuesto. Una única fotografía documental, sin escala.",
        "autor": "Adam Jones",
        "licencia": "CC BY-SA 2.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
        "fuente": "https://commons.wikimedia.org/wiki/File:Damaged%20Building%20from%20September%202017%20Earthquake%20-%20Condesa%20District%20-%20Mexico%20City%20-%20Mexico%20-%2001%20(24942881218).jpg",
        "fecha": "2017",
        "orden": 0
      }
    ],
    "numero": 12,
    "comparaciones": [
      {
        "id": "T08:MX03:02",
        "caseId": "T08",
        "tipo": "incluida",
        "origen": "real",
        "src": "data/taller/reales/mx03_02.jpg",
        "titulo": "Otro edificio de la serie · no usar para evaluar esta fachada",
        "descripcion": "La fachada roja de esta imagen no corresponde a la fachada turquesa de la fotografía principal. Se conserva únicamente como comparación; sus daños no se trasladan a esta práctica.",
        "autor": "Adam Jones",
        "licencia": "CC BY-SA 2.0",
        "licenciaUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
        "fuente": "https://commons.wikimedia.org/wiki/File:Damaged%20Building%20from%20September%202017%20Earthquake%20-%20Condesa%20District%20-%20Mexico%20City%20-%20Mexico%20-%2003%20(24942860098).jpg",
        "fecha": "02/12/2017",
        "orden": 1
      }
    ]
  }
];
const TALLER_PRACTICAS=TALLER_CASOS;
const TALLER_EVENTOS_DOCUMENTALES=[
  {
    "uuid": "MX2017",
    "nombre": "México · sismo de Puebla · 19/09/2017",
    "fecha": "2017-09-19T13:14",
    "referencia": "Informe de reconocimiento EERI · Puebla 2017",
    "url": "https://www.eeri.org/component/content/article/3931-m7-1-puebla-mexico-earthquake-on-september-19-2017-final-report-now-available?Itemid=101&catid=1937&highlight=WzNd"
  },
  {
    "uuid": "VE2026",
    "nombre": "Venezuela · secuencia sísmica · 24/06/2026",
    "fecha": "2026-06-24T23:00",
    "referencia": "USGS · terremotos significativos de 2026",
    "url": "https://earthquake.usgs.gov/earthquakes/browse/significant.php?year=2026"
  },
  {
    "uuid": "PUCP-CHUPACA-24JUL",
    "nombre": "Chupaca · 18/07/2026 · M 5.4",
    "fecha": "2026-07-18T21:24:00-05:00",
    "referencia": "https://sigrid.cenepred.gob.pe/sigridv3/documento/22458"
  },
  {
    "uuid": "PUCP-TARQUI",
    "nombre": "Edificio Tarqui · evento por confirmar",
    "fecha": "",
    "referencia": "Captura EXIF 24/04/2016; no se asume que sea la fecha del sismo."
  },
  {
    "uuid": "PUCP-LOTE2-hospital-ies",
    "nombre": "Ecuador · Pedernales · 16/04/2016 · Mw 7.8",
    "fecha": "2016-04-16T18:58:00-05:00",
    "referencia": "https://www.igepn.edu.ec/servicios/noticias/1317-informe-sismico-especial-n-13-2016"
  },
  {
    "uuid": "PUCP-LOTE2-alto-arauco",
    "nombre": "Maule, Chile · sismo de 2010 (archivo del aportante)",
    "fecha": "",
    "referencia": "Downloads2.rar · Edificio Alto Arauco · Maule 2010"
  },
  {
    "uuid": "PUCP-LOTE2-patio-mayor",
    "nombre": "Maule, Chile · sismo de 2010 (archivo del aportante)",
    "fecha": "",
    "referencia": "Downloads2.rar · Edificio Patio Mayor · Maule 2010"
  },
  {
    "uuid": "DOC-C2",
    "nombre": "Sismo 2011",
    "fecha": "2026-09-26T09:00",
    "referencia": "Fuentes documentales del expediente"
  }
];
