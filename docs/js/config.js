// Configuración y catálogos — SismoLima v0.7

// Distritos de Lima Metropolitana y Callao
// [clave, nombre OSM, provincia, prefijo, etiqueta opcional si difiere del nombre OSM]
const DISTRITOS=[
  ['ancon','Ancón','Lima','ANC'],
  ['ate','Ate','Lima','ATE'],
  ['barranco','Barranco','Lima','BAR'],
  ['brena','Breña','Lima','BRE'],
  ['carabayllo','Carabayllo','Lima','CBY'],
  ['chaclacayo','Chaclacayo','Lima','CHA'],
  ['chorrillos','Chorrillos','Lima','CHO'],
  ['cieneguilla','Cieneguilla','Lima','CIE'],
  ['comas','Comas','Lima','COM'],
  ['el_agustino','El Agustino','Lima','AGU'],
  ['independencia','Independencia','Lima','IND'],
  ['jesus_maria','Jesús María','Lima','JM'],
  ['la_molina','La Molina','Lima','MOL'],
  ['la_victoria','La Victoria','Lima','VIC'],
  ['lima_cercado','Lima','Lima','LIM','Cercado de Lima'],
  ['lince','Lince','Lima','LIN'],
  ['los_olivos','Los Olivos','Lima','OLI'],
  ['lurigancho','Lurigancho','Lima','LCH','Lurigancho-Chosica'],
  ['lurin','Lurín','Lima','LRN'],
  ['magdalena','Magdalena del Mar','Lima','MAG'],
  ['miraflores','Miraflores','Lima','MIR'],
  ['pachacamac','Pachacámac','Lima','PAC'],
  ['pucusana','Pucusana','Lima','PUC'],
  ['pueblo_libre','Pueblo Libre','Lima','PLI'],
  ['puente_piedra','Puente Piedra','Lima','PPI'],
  ['punta_hermosa','Punta Hermosa','Lima','PHE'],
  ['punta_negra','Punta Negra','Lima','PNE'],
  ['rimac','Rímac','Lima','RIM'],
  ['san_bartolo','San Bartolo','Lima','SBA'],
  ['san_borja','San Borja','Lima','SBO'],
  ['san_isidro','San Isidro','Lima','SIS'],
  ['sjl','San Juan de Lurigancho','Lima','SJL'],
  ['sjm','San Juan de Miraflores','Lima','SJM'],
  ['san_luis','San Luis','Lima','SLU'],
  ['smp','San Martín de Porres','Lima','SMP'],
  ['san_miguel','San Miguel','Lima','SMI'],
  ['santa_anita','Santa Anita','Lima','SAN'],
  ['santa_maria_mar','Santa María del Mar','Lima','SMM'],
  ['santa_rosa','Santa Rosa','Lima','SRO'],
  ['surco','Santiago de Surco','Lima','SUR'],
  ['surquillo','Surquillo','Lima','SQU'],
  ['ves','Villa El Salvador','Lima','VES'],
  ['vmt','Villa María del Triunfo','Lima','VMT'],
  ['bellavista','Bellavista','Callao','BEL'],
  ['callao','Callao','Callao','CAL'],
  ['carmen_legua','Carmen de La Legua-Reynoso','Callao','CLR','Carmen de la Legua Reynoso'],
  ['la_perla','La Perla','Callao','PER'],
  ['la_punta','La Punta','Callao','LPU'],
  ['mi_peru','Mi Perú','Callao','MPE'],
  ['ventanilla','Ventanilla','Callao','VEN']
];
const D=Object.fromEntries(DISTRITOS.map(([k,osm,prov,prefix,label])=>[k,{name:label||osm,osm,prov,prefix}]));

const LIMA_CENTER=[-12.06,-77.05];
// bbox usado solo por la demo sin internet (zona Jesús María)
const DEFAULT_BBOX={s:-12.095,w:-77.0645,n:-12.063,e:-77.034};
// umbral de aviso para distritos con muchísimos edificios
const MAX_EDIFICIOS_SIN_AVISO=60000;

// Paleta
const C={
  none:'#8a8f94',cat:'#2e7d32',part:'#f9a825',man:'#00acc1',high:'#ef6c00',
  urg:'#c62828',crit:'#6a1b9a',blue:'#1a73e8',darkred:'#8e0000',
  hab_habitable:'#2e7d32',hab_uso_restringido:'#f9a825',hab_inseguro:'#c62828'
};

// Campos del catastro importable
const F=[['codigo','Código predial/catastral'],['direccion','Dirección'],['manzana','Manzana'],['lote','Lote'],['uso','Uso'],['area_terreno','Área terreno'],['area_construida','Área construida'],['pisos','Pisos'],['anio','Año'],['lat','Latitud'],['lon','Longitud'],['wkt','WKT']];

// Ficha basal (pre-sismo) — v0.7 restaura los campos completos de la v0.4:
// uso, sótanos, altura, diafragma, golpeteo, elementos vulnerables y fuente.
const BASAL_EMPTY={
  use:'',floors:'',basements:'',height_m:'',year:'',
  structural_system:'',material:'',diaphragm:'',condition:'',
  irregular_plan:'',irregular_vertical:'',soft_story:'',pounding:'',
  vulnerable_elements:'',vulnerability:'',priority:'',
  inspector:'',inspection_date:'',source:'',notes:''
};

// ---- Ficha de daño post-sismo (ATC-20 adaptada) ----

const HABITABILIDAD=[
  ['habitable','HABITABLE'],
  ['uso_restringido','USO RESTRINGIDO'],
  ['inseguro','INSEGURO']
];
const HAB_LABEL={habitable:'Habitable',uso_restringido:'Uso restringido',inseguro:'Inseguro'};

// Severidad estándar para la mayoría de rubros
const SEVERIDAD=[['ninguno','N'],['leve','L'],['moderado','M'],['severo','S']];
const SEV_LABEL={ninguno:'Ninguno',leve:'Leve',moderado:'Moderado',severo:'Severo'};

// Rubros de daño (id, etiqueta, tipo de escala)
const DANO_ESTR=[
  ['colapso','Colapso',[['ninguno','N'],['parcial','P'],['total','T']]],
  ['inclinacion','Inclinación del edificio',SEVERIDAD],
  ['columnas','Columnas',SEVERIDAD],
  ['vigas','Vigas',SEVERIDAD],
  ['muros','Muros portantes',SEVERIDAD],
  ['losas','Losas / techos',SEVERIDAD]
];
const DANO_NOESTR=[
  ['tabiques','Tabiques',SEVERIDAD],
  ['parapetos','Parapetos / fachada',SEVERIDAD],
  ['vidrios','Vidrios',SEVERIDAD],
  ['escaleras','Escaleras',SEVERIDAD],
  ['instalaciones','Instalaciones',SEVERIDAD]
];
const PELIGRO_GEO=[
  ['asentamiento','Asentamiento del terreno',SEVERIDAD],
  ['grietas_terreno','Grietas en el terreno',SEVERIDAD],
  ['deslizamiento','Deslizamiento',SEVERIDAD],
  ['licuefaccion','Licuefacción',SEVERIDAD]
];
const PELIGRO_EXT=[
  ['vecino_inestable','Edificio vecino inestable',[['no','No'],['si','Sí']]],
  ['caida_objetos','Riesgo de caída de objetos',[['no','No'],['si','Sí']]]
];
const DANO_GRUPOS=[
  ['Daños estructurales',DANO_ESTR],
  ['Daños no estructurales',DANO_NOESTR],
  ['Peligros geotécnicos',PELIGRO_GEO],
  ['Peligros externos',PELIGRO_EXT]
];
// Todos los ids de rubros de daño
const DANO_IDS=DANO_GRUPOS.flatMap(([,items])=>items.map(([k])=>k));

// Rangos de % de daño global (ATC-20)
const PCT_DANO=[
  ['','Sin estimar'],
  ['0','0 %'],
  ['0_1','< 1 %'],
  ['1_10','1 – 10 %'],
  ['10_30','10 – 30 %'],
  ['30_60','30 – 60 %'],
  ['60_100','60 – 100 %'],
  ['100','100 % (colapso)']
];
const PCT_COLOR={'0':'#2e7d32','0_1':'#66bb6a','1_10':'#f9a825','10_30':'#ef6c00','30_60':'#e64a19','60_100':'#c62828','100':'#8e0000'};
const GRADOS_DANO_TALLER=[['','Sin estimar'],...Array.from({length:5},(_,i)=>['grado_'+(i+1),'Grado '+(i+1)])];
const PCT_LABEL=Object.fromEntries([...PCT_DANO,...GRADOS_DANO_TALLER].map(([k,v])=>[k,v]));

const TIPO_EVAL=[['rapida','Rápida'],['detallada','Detallada']];
