const TITULOS_ESTADISTICA=Object.fromEntries(CATALOGO_TALLER.map(c=>[c.id,c.titulo]));
// Estadísticas a partir de las entregas autorizadas; nunca consulta datos públicos.
function resumirEntregas(lista){
 const alumnos=new Map(),respuestas=new Map(),orden=[...lista].sort((a,b)=>String(b.recibida_en).localeCompare(String(a.recibida_en))||String(b.id).localeCompare(String(a.id)));
 for(const entrega of orden){const p=entrega.participante||{},identidad=p.codigoPUCP?String(p.codigoPUCP).trim().toUpperCase():[p.nombre,p.institucion,p.equipo].map(x=>String(x||'').trim().toLowerCase()).join('|'),alumno=entrega.sesion_id+':'+identidad;
  if(!alumnos.has(alumno))alumnos.set(alumno,{nombre:p.nombre,codigoPUCP:p.codigoPUCP,casos:new Set()});
  for(const r of entrega.respuestas||[]){if(!CATALOGO_TALLER.some(c=>c.id===r.caso))continue;alumnos.get(alumno).casos.add(r.caso);const key=alumno+':'+r.caso;if(!respuestas.has(key))respuestas.set(key,{alumno,caso:r.caso,evaluacion:r.evaluacion||{}})}
 }
 const casos=CATALOGO_TALLER.map(({id:caso})=>{const filas=[...respuestas.values()].filter(r=>r.caso===caso),decisiones={habitable:0,uso_restringido:0,inseguro:0};for(const r of filas)if(r.evaluacion.habitabilidad in decisiones)decisiones[r.evaluacion.habitabilidad]++;return {caso,total:filas.length,decisiones,filas}});
 return {alumnos:alumnos.size,completos:[...alumnos.values()].filter(a=>a.casos.size===CATALOGO_TALLER.length).length,totalRespuestas:respuestas.size,entregas:lista.length,casos};
}
function estadisticasHTML(lista){const r=resumirEntregas(lista),celda=(n,total)=>total?n+' ('+(100*n/total).toFixed(1)+'%)':'—';
 q('statsSummary').innerHTML='<div><strong>'+r.alumnos+'</strong><span>Participantes con entregas</span></div><div><strong>'+r.completos+'</strong><span>Participantes con las 12 fichas</span></div><div><strong>'+r.totalRespuestas+'</strong><span>Respuestas únicas · '+r.entregas+' envíos en el historial</span></div>';
 q('statsCases').innerHTML=r.casos.map(c=>'<tr><td>'+safe(etiquetaCasoTaller(c.caso))+'</td><td>'+c.total+'</td>'+['habitable','uso_restringido','inseguro'].map(k=>'<td>'+celda(c.decisiones[k],c.total)+'<div class="stat-bar"><i style="width:'+(c.total?100*c.decisiones[k]/c.total:0)+'%"></i></div></td>').join('')+'</tr>').join('');
 const elegido=q('statsCaseFilter').value||CATALOGO_TALLER[0].id;q('statsCaseFilter').innerHTML=r.casos.map(c=>'<option value="'+c.caso+'">'+etiquetaCasoTaller(c.caso)+' · '+safe(TITULOS_ESTADISTICA[c.caso])+' · '+c.total+' respuestas</option>').join('');q('statsCaseFilter').value=elegido;
 q('statsCaseFilter').onchange=()=>pintarDanosEstadistica(r,q('statsCaseFilter').value);pintarDanosEstadistica(r,elegido);
 q('statsNote').textContent='Porcentajes calculados sobre las respuestas recibidas para cada ficha. Se agrupa por Código PUCP y sesión; las entregas antiguas sin código se agrupan por nombre, institución y equipo. No se asignan notas ni se determina una respuesta correcta automáticamente.';
}
function pintarDanosEstadistica(resumen,caso){const c=resumen.casos.find(x=>x.caso===caso);pintarCamposEstadistica(c);if(typeof pintarAnaliticaCaso==='function')pintarAnaliticaCaso(c);const rubros=new Map(),etiquetas={ninguno:'Sin daño observado',leve:'Leve',moderado:'Moderado',severo:'Severo',parcial:'Parcial',total:'Total',no:'No observado',si:'Sí observado',no_inspeccionado:'No inspeccionado',no_aplica:'No aplicable',no_determinado:'No determinado'};
 for(const r of c.filas)for(const [rubro,estado] of Object.entries(r.evaluacion.danos||{})){if(!rubros.has(rubro))rubros.set(rubro,new Map());const estados=rubros.get(rubro);estados.set(estado,(estados.get(estado)||0)+1)}
 const labels={colapso:'Colapso',inclinacion:'Inclinación del edificio',columnas:'Columnas',vigas:'Vigas',muros:'Muros portantes',losas:'Losas / techos',tabiques:'Tabiques',parapetos:'Parapetos / fachada',vidrios:'Vidrios',escaleras:'Escaleras',instalaciones:'Instalaciones',deslizamiento:'Deslizamiento',asentamiento:'Asentamiento del terreno',grietas_terreno:'Grietas en el terreno',licuefaccion:'Licuefacción',caida_objetos:'Caída de objetos',vecino_inestable:'Edificio vecino inestable'};
 q('statsDamage').innerHTML=Array.from(rubros).sort(([a],[b])=>a.localeCompare(b)).flatMap(([rubro,estados])=>Array.from(estados).map(([estado,n])=>'<tr><td>'+safe(labels[rubro]||rubro.replaceAll('_',' '))+'</td><td>'+safe(etiquetas[estado]||estado)+'</td><td>'+n+'</td><td>'+(100*n/c.total).toFixed(1)+'%</td></tr>')).join('')||'<tr><td colspan="4">Aún no hay respuestas para esta ficha.</td></tr>';
}

function pintarCamposEstadistica(c){
 const campos=[['pct_dano','Grado de daño'],['alcance','Alcance'],['tipo','Tipo de evaluación'],['sistema_observado','Sistema resistente'],['irregularidad_estructural','Irregularidad estructural'],['barricada','Barricada'],['eval_detallada','Evaluación detallada requerida']];
 const textos=[['fundamento','Fundamento'],['limitaciones','Limitaciones'],['restricciones','Restricciones'],['metodo_detallado','Método detallado'],['acciones_otras','Medidas y seguimiento'],['justificacion_alertas','Revisión de alertas'],['observaciones','Observaciones']];
 const grupos=campos.map(([key,label])=>[label,e=>e[key]===true?'Sí':e[key]===false?'No':String(e[key]??'').trim()||'Sin respuesta']);
 for(const [key,label] of textos)grupos.push([label,e=>String(e[key]??'').trim()?'Con texto':'Sin texto']);
 grupos.push(['Registros por elemento',e=>String((e.registros||[]).length)]);
 const etiquetas={grado_1:'Grado 1',grado_2:'Grado 2',grado_3:'Grado 3',grado_4:'Grado 4',grado_5:'Grado 5',exterior:'Solo exterior',interior_exterior:'Exterior e interior',rapida:'Rápida',detallada:'Detallada'};
 q('statsFields').innerHTML=grupos.flatMap(([label,valor])=>{const conteos=new Map();for(const r of c.filas){const v=valor(r.evaluacion);conteos.set(v,(conteos.get(v)||0)+1)}return [...conteos].sort(([a],[b])=>a.localeCompare(b)).map(([v,n])=>'<tr><td>'+safe(label)+'</td><td>'+safe(etiquetas[v]||v)+'</td><td>'+n+'</td><td>'+(100*n/c.total).toFixed(1)+'%</td></tr>')}).join('')||'<tr><td colspan="4">Aún no hay respuestas para esta ficha.</td></tr>';
}
