// Ocho expedientes para alumnos, sin respuestas del instructor.
const TALLER_CASOS=[
  {
    "id": "T01",
    "tipo": "practica",
    "documental": true,
    "numero": 1,
    "titulo": "Vivienda de tierra · exterior e interior · Chupaca",
    "ubicacion": "Chupaca, Junín, Perú · dirección por confirmar",
    "eventoId": "PUCP-CHUPACA-24JUL",
    "evento": "Chupaca · sismo de julio, según el aportante",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 1 · archivo Equipo PUCP",
    "basal": "Vivienda de tierra según el aportante; muros de tierra aparentes, cubierta de madera y planchas metálicas. Conexiones y sistema resistente completo por verificar.",
    "lecturaVisual": "Observe exterior, vanos, muros interiores y apoyos de cubierta en las cuatro tomas.",
    "contexto": "Lectura de fotografías aportadas; no hubo inspección presencial. No se conocen planos, materiales ensayados, condición previa, capacidad residual ni dirección exacta. Las vistas parciales no certifican el estado de otras caras o niveles. La fecha de captura no equivale a la del sismo. Captura 24/07/2026 según nombre de archivo; fecha exacta del evento no confirmada.",
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
    "numero": 2,
    "titulo": "Edificio Tarqui · lectura de fachada",
    "ubicacion": "Localidad y dirección por confirmar",
    "eventoId": "PUCP-TARQUI",
    "evento": "Edificio Tarqui · evento por confirmar",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 2 · archivo Equipo PUCP",
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
    "nivel": "PRÁCTICA 3 · peligro de caída",
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
    "numero": 3
  },
  {
    "id": "T04",
    "titulo": "Torre de iglesia con fisuras reportadas · Valencia",
    "nivel": "PRÁCTICA 4 · elementos elevados",
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
    "numero": 4
  },
  {
    "id": "T05",
    "tipo": "practica",
    "documental": true,
    "numero": 5,
    "titulo": "Hospital IES · Ecuador 2016",
    "ubicacion": "Ecuador · ciudad y dirección por confirmar",
    "eventoId": "PUCP-LOTE2-hospital-ies",
    "evento": "Ecuador · sismo de 2016 (archivo del aportante)",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 5 · archivo Equipo PUCP",
    "basal": "Elementos de concreto armado aparentes y cerramientos de mampostería; función de cada elemento y configuración resistente completa por verificar.",
    "lecturaVisual": "Compare las vistas generales y los detalles; registre únicamente lo que cada fotografía permite observar.",
    "contexto": "Archivo aportado por el usuario y agrupado por inmueble. Sin inspección presencial, planos, escala de medición ni comprobación independiente de dirección, fecha de captura o sistema completo. No se atribuyen daños a niveles y elementos ocultos. 23/04/2016 · captura EXIF.",
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
      }
    ],
    "fuentes": [
      {
        "tipo": "Archivo aportado",
        "titulo": "Downloads2.rar · Hospital IES · Ecuador 2016",
        "autor": "Equipo PUCP · aportado por el usuario",
        "licencia": "Uso en el taller; licencia de redistribución no declarada"
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
    "numero": 6,
    "titulo": "Edificio Alto Arauco · Maule 2010",
    "ubicacion": "Chile · dirección exacta por confirmar",
    "eventoId": "PUCP-LOTE2-alto-arauco",
    "evento": "Maule, Chile · sismo de 2010 (archivo del aportante)",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 6 · archivo Equipo PUCP",
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
    "numero": 7,
    "titulo": "Edificio Patio Mayor · Maule 2010",
    "ubicacion": "Chile · dirección exacta por confirmar",
    "eventoId": "PUCP-LOTE2-patio-mayor",
    "evento": "Maule, Chile · sismo de 2010 (archivo del aportante)",
    "fechaEvento": "",
    "nivel": "PRÁCTICA 7 · archivo Equipo PUCP",
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
    "nivel": "PRÁCTICA 8 · lectura de fachada y límites de la evidencia",
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
    "numero": 8,
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
const TALLER_RESUELTOS=[];
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
    "nombre": "Chupaca · sismo de julio, según el aportante",
    "fecha": "",
    "referencia": "Captura 24/07/2026 según nombre de archivo; fecha exacta del evento no confirmada."
  },
  {
    "uuid": "PUCP-TARQUI",
    "nombre": "Edificio Tarqui · evento por confirmar",
    "fecha": "",
    "referencia": "Captura EXIF 24/04/2016; no se asume que sea la fecha del sismo."
  },
  {
    "uuid": "PUCP-LOTE2-hospital-ies",
    "nombre": "Ecuador · sismo de 2016 (archivo del aportante)",
    "fecha": "",
    "referencia": "Downloads2.rar · Hospital IES · Ecuador 2016"
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
  }
];
