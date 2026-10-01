// Modelo compartido de ficha. Mantiene los valores históricos de v0.7.
const DANO_EXTRA_ESTADOS=[['no_determinado','No determinado']];
const ALCANCES=[['','Seleccionar alcance'],['exterior','Solo exterior'],['interior_exterior','Exterior e interior']];
const DANO_LABELS={ninguno:'Sin daño observado',leve:'Leve',moderado:'Moderado',severo:'Severo',parcial:'Parcial',total:'Total',no:'No observado',si:'Sí observado',no_inspeccionado:'No inspeccionado',no_aplica:'No aplicable',no_determinado:'No determinado'};
function normalizarDano(d){return {...d,schemaVersion:2,alcance:d.alcance||'',limitaciones:d.limitaciones||'',sistema_observado:d.sistema_observado||'',irregularidad_estructural:d.irregularidad_estructural||'',fundamento:d.fundamento||'',restricciones:d.restricciones||'',metodo_detallado:d.metodo_detallado||'',justificacion_alertas:d.justificacion_alertas||'',danos:{...(d.danos||{})},registros:(d.registros||[]).map(r=>({...r})),fotos:(d.fotos||[]).map(p=>typeof p==='object'?{...p}:p)};}
function nuevoRegistroDano(){return {id:uuid(),rubro:'',elemento:'',ubicacion:'',patron:'',medicion:'',mecanismo:'',severidad:'',evidencia:''};}
function validarDano(d){
  const errores=[],avisos=[], texto=v=>typeof v==='string'&&v.trim().length>0;
  if(!texto(d.evaluador))errores.push('Indica el nombre del evaluador.');
  if(!d.fecha||Number.isNaN(new Date(d.fecha).getTime()))errores.push('Indica una fecha válida.');
  if(!ALCANCES.some(([v])=>v&&v===d.alcance))errores.push('Indica el alcance de la inspección.');
  if(!texto(d.sistema_observado))errores.push('Describe el sistema aparente o indica que no se pudo determinar.');
  if(!['rapida','detallada'].includes(d.tipo))errores.push('Selecciona el tipo de evaluación.');
  if(!['habitable','uso_restringido','inseguro'].includes(d.habitabilidad))errores.push('Selecciona una decisión preliminar de uso.');
  if(!texto(d.fundamento))errores.push('Fundamenta la decisión con observaciones y limitaciones.');
  const items=DANO_GRUPOS.flatMap(([,items])=>items);
  const pendientes=items.filter(([k,,escala])=>![...escala,...DANO_EXTRA_ESTADOS].some(([v])=>v===(d.danos||{})[k]));
  if(pendientes.length)errores.push('Completa los '+pendientes.length+' rubros pendientes; usa No determinado cuando la información disponible no permita decidir.');
  if((d.alcance==='exterior'||Object.values(d.danos||{}).some(v=>['no_inspeccionado','no_determinado'].includes(v)))&&!texto(d.limitaciones))errores.push('Explica las zonas no inspeccionadas o la información que falta.');
  const positivos=['leve','moderado','severo','parcial','total','si'];
  for(const [k,label] of items)if(!globalThis.SISMO_TALLER&&positivos.includes((d.danos||{})[k])&&!(d.registros||[]).some(r=>r.rubro===k))errores.push('Añade un registro que documente: '+label+'.');
  for(const [i,r] of (d.registros||[]).entries()){
    if(globalThis.SISMO_TALLER)continue;
    if(!DANO_IDS.includes(r.rubro)||![r.elemento,r.ubicacion,r.patron,r.mecanismo,r.evidencia].every(texto)||!['leve','moderado','severo'].includes(r.severidad))errores.push('Completa el registro '+(i+1)+': rubro, elemento, ubicación, patrón, mecanismo o incertidumbre, severidad y evidencia.');
    if(['ninguno','no','no_aplica','no_inspeccionado'].includes((d.danos||{})[r.rubro]))errores.push('El registro '+(i+1)+' contradice el resumen de su rubro.');
    const orden={leve:1,moderado:2,severo:3};
    if(orden[(d.danos||{})[r.rubro]]<orden[r.severidad])errores.push('La severidad del registro '+(i+1)+' supera la indicada en el resumen.');
  }
  if(!globalThis.SISMO_TALLER&&['uso_restringido','inseguro'].includes(d.habitabilidad)&&!texto(d.restricciones))errores.push('Especifica las áreas, accesos o usos restringidos.');
  if(d.tipo==='detallada'&&(!texto(d.metodo_detallado)||!d.registros?.length))errores.push('La evaluación detallada requiere registros por elemento y descripción del método y comprobaciones.');
  if(d.habitabilidad==='habitable'&&((d.registros||[]).some(r=>r.severidad==='severo')||Object.values(d.danos||{}).some(v=>['moderado','severo','parcial','total','si'].includes(v))||['30_60','60_100','100','grado_3','grado_4','grado_5'].includes(d.pct_dano)))avisos.push('La decisión favorable requiere revisión: se han registrado daños o peligros relevantes.');
  if(d.habitabilidad==='habitable'&&(d.alcance==='exterior'||Object.values(d.danos||{}).some(v=>['no_inspeccionado','no_determinado'].includes(v))))avisos.push('La decisión favorable tiene limitaciones de inspección que deben justificarse.');
  if(avisos.length&&!texto(d.justificacion_alertas))errores.push('Revisa las alertas y documenta por qué mantienes la decisión.');
  return {errores,avisos};
}
