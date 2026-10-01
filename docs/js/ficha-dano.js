// Ficha de daño v2: observación, interpretación y decisión trazables.
function evalsOf(key){return (S.evalsByBuilding[key]||[]).slice().sort((a,b)=>String(b.fecha||b.updatedAt).localeCompare(String(a.fecha||a.updatedAt)))}
function latestEval(key){let arr=evalsOf(key).filter(e=>e.estadoRegistro!=='anulada');if(S.eventoId)arr=arr.filter(e=>e.eventoId===S.eventoId);return arr[0]||null}
function coordPuede(){return typeof puedeCoordinar==='function'?puedeCoordinar():true}
function evalPuede(ev){return typeof puedeModificarEvaluacion==='function'?puedeModificarEvaluacion(ev):true}
function revisionISO(anterior=''){let previo=Date.parse(anterior)||0;return new Date(Math.max(Date.now(),previo+1)).toISOString()}
function newDraft(f){const p=f.properties;return normalizarDano({uuid:uuid(),buildingKey:p.key,local_id:p.local_id,direccion:first(p.match?.data?.direccion,p.osm.address,''),eventoId:S.eventoId||'',evaluador:globalThis.SISMO_TALLER?'':localStorage.getItem('sl6_evaluador')||'',cip:globalThis.SISMO_TALLER?'':localStorage.getItem('sl6_cip')||'',tipo:'rapida',fecha:nowLocal(),startedAt:nowISO(),habitabilidad:'',danos:{},pct_dano:'',barricada:false,eval_detallada:false,acciones_otras:'',observaciones:'',fotos:[],training:!!globalThis.SISMO_TALLER})}
function sevTitle(v){return DANO_LABELS[v]||v}
function danoButtonCode(v){return {ninguno:'0',leve:'L',moderado:'M',severo:'S',parcial:'P',total:'T',no:'No',si:'Sí',no_inspeccionado:'NI',no_aplica:'NA',no_determinado:'ND'}[v]||v}
function danoOptions(escala){
  const vistos=new Set();
  return [...escala,...DANO_EXTRA_ESTADOS].filter(([v])=>!vistos.has(v)&&vistos.add(v));
}
function danoLegendHTML(){
  const items=[['0','Sin daño observado'],['L','Leve'],['M','Moderado'],['S','Severo'],['P/T','Parcial / total, solo donde corresponda'],['ND','No determinado']];
  return `<aside class="dano-leyenda" aria-label="Leyenda de estados de daño"><b>Leyenda</b><div>${items.map(([c,t])=>`<span><strong>${c}</strong>${esc(t)}</span>`).join('')}</div></aside>`;
}
function danoInput(key,label,value,textarea=false){return `<label for="ev_${key}">${esc(label)}</label>${textarea?`<textarea id="ev_${key}">${esc(value)}</textarea>`:`<input id="ev_${key}" value="${attr(value)}">`}`}
const SISTEMAS_RESISTENTES_DANO=['Pórticos de concreto armado','Muros de concreto armado','Sistema dual de concreto armado (pórticos y muros)','Albañilería confinada','Albañilería armada','Albañilería no reforzada','Adobe','Tapial','Mampostería de piedra','Estructura de acero','Estructura de madera','Sistema mixto','Otro sistema','No determinado'];
function sistemaResistenteHTML(valor=''){
 const opciones=[['','Seleccionar sistema resistente'],...SISTEMAS_RESISTENTES_DANO.map(v=>[v,v])];
 if(valor&&!SISTEMAS_RESISTENTES_DANO.includes(valor))opciones.push([valor,valor]);
 return `<label for="ev_sistema_observado">Sistema resistente aparente *</label><select id="ev_sistema_observado">${opts(opciones,valor)}</select>`;
}
function opcionesDanoGlobalTaller(valor){
 const opciones=GRADOS_DANO_TALLER.map(x=>[...x]);
 if(valor&&!opciones.some(([k])=>k===valor))opciones.push([valor,(PCT_LABEL[valor]||valor)+' · valor anterior']);
 return opciones;
}
function danoFormHTML(f,datos=S.draft){
  const d=normalizarDano(datos);if(datos===S.draft)Object.assign(S.draft,d);const prev=evalsOf(f.properties.key);
  const modoTaller=!!globalThis.SISMO_TALLER;
  const prevHTML=prev.map(ev=>{let anulada=ev.estadoRegistro==='anulada',revisada=ev.revisionEstado==='revisada';return `<div class="evalitem ${anulada?'annulled':''}"><b>${esc(HAB_LABEL[ev.habitabilidad]||'Sin decisión')}</b> · ${esc(fmtFecha(ev.fecha))} <span class="record-state ${anulada?'off':revisada?'ok':'pending'}">${anulada?'ANULADA':revisada?'REVISADA':'PENDIENTE DE REVISIÓN'}</span><p>${esc(ev.evaluador||'Sin nombre')} · ${esc(S.eventos.find(e=>e.uuid===ev.eventoId)?.nombre||'Sin evento')}</p>${anulada?`<p><b>Motivo:</b> ${esc(ev.anulacionMotivo||'Sin motivo registrado')}</p>${coordPuede()?`<button data-restaurar="${attr(ev.uuid)}">Restaurar</button>`:''}`:`${evalPuede(ev)?`<button data-editar="${attr(ev.uuid)}">Editar evaluación</button><button data-anular="${attr(ev.uuid)}" class="danger">Anular</button>`:''}${!globalThis.SISMO_TALLER&&coordPuede()&&!revisada?`<button data-revisar="${attr(ev.uuid)}">Marcar revisada</button>`:''}`}</div>`}).join('');
  const grupos=DANO_GRUPOS.map(([titulo,items])=>`<fieldset class="dano-grupo"><legend>${esc(titulo)}</legend>${items.map(([k,label,escala])=>`<div class="dano-rubro"><span class="dano-rubro-label" id="label_${k}">${esc(label)}${k==='escaleras'?' (estructura y evacuación)':''}</span><div class="dano-botones" role="group" aria-labelledby="label_${k}">${danoOptions(escala).map(([v])=>`<button type="button" class="dano-estado ${d.danos[k]===v?'active':''}" data-rubro="${k}" data-v="${v}" aria-pressed="${d.danos[k]===v}" title="${attr(sevTitle(v))}"><span>${esc(danoButtonCode(v))}</span><small>${esc(sevTitle(v))}</small></button>`).join('')}</div></div>`).join('')}</fieldset>`).join('');
  return `<div class="ficha-v2">
  ${modoTaller?'':`<p class="ficha-intro">Observe, documente y fundamente una decisión preliminar de uso. Un rubro pendiente no significa ausencia de daño.</p>`}
  ${prev.length?`<details><summary>Evaluaciones previas (${prev.length})</summary><div id="prevEvals">${prevHTML}</div></details>`:`<div id="prevEvals" hidden></div>`}
  <div id="draftStatus" class="save-status${modoTaller?' sr-only':''}" role="status">${Storage.loadDraft(d.buildingKey)?'Borrador recuperado del dispositivo.':'Nueva evaluación. Los cambios se guardan en este dispositivo.'}</div>
  <h3>1 · Identificar</h3><p><b>${esc(d.local_id)}</b> · ${esc(d.direccion||'Dirección no disponible')}</p>
  ${danoInput('evaluador','Evaluador *',d.evaluador)}${danoInput('cip','CIP',d.cip)}
  <label for="ev_evento">Evento</label><select id="ev_evento">${opts([['','Sin evento'],...S.eventos.map(e=>[e.uuid,e.nombre])],d.eventoId)}</select>
  <div class="grid2"><div><label for="ev_tipo">Tipo</label><select id="ev_tipo">${opts(TIPO_EVAL,d.tipo)}</select></div><div><label for="ev_fecha">Fecha y hora</label><input id="ev_fecha" type="datetime-local" value="${attr(d.fecha?.includes('Z')?fechaLocalDano(d.fecha):d.fecha)}"></div></div>
  <h3>2 · Alcance y edificio</h3>
  <label for="ev_alcance">Áreas inspeccionadas *</label><select id="ev_alcance">${opts(ALCANCES,d.alcance)}</select>
  ${sistemaResistenteHTML(d.sistema_observado)}
  ${danoInput('limitaciones','Zonas no inspeccionadas, peligros de acceso e información faltante',d.limitaciones,true)}
  <h3>3 · Observar los daños</h3><p class="mini">Pulse un estado por rubro. En la ficha rápida puede usar las siglas; la leyenda permanece visible para evitar ambigüedades.</p>${danoLegendHTML()}<div id="danoGrupos">${grupos}</div>
  <h3>4 · Documentar e interpretar</h3><p class="mini">Añada al menos un registro por rubro con daño o peligro. El ancho de una grieta, por sí solo, no determina la severidad.</p>
  <div id="registrosDano"></div><button id="btnAddRegistro" type="button">+ Añadir daño por elemento</button>
  ${danoInput('metodo_detallado','Método y comprobaciones (obligatorio en evaluación detallada)',d.metodo_detallado,true)}
  <label for="fotoInput">Fotografías</label><input id="fotoInput" type="file" accept="image/*" capture="environment" multiple><div id="photoStatus" role="status"></div><div class="evidence-photos" id="fotoThumbs"></div>
  ${danoInput('obs','Observaciones adicionales',d.observaciones,true)}
  <h3>5 · Decisión preliminar de uso</h3><div class="habgrid" id="habGrid">${HABITABILIDAD.map(([v,t])=>`<button type="button" aria-pressed="${d.habitabilidad===v}" class="habbtn ${d.habitabilidad===v?'active':''}" data-v="${v}"><span class="dot"></span>${esc(v==='habitable'?'Uso permitido':t)}</button>`).join('')}</div>
  ${danoInput('fundamento','Fundamento de la decisión *',d.fundamento,true)}
  ${danoInput('restricciones','Áreas, accesos y usos restringidos',d.restricciones,true)}
  <label for="ev_pct">Daño global estimado (opcional)</label><select id="ev_pct">${opts(modoTaller?opcionesDanoGlobalTaller(d.pct_dano):PCT_DANO,d.pct_dano)}</select><p class="mini">No representa la capacidad resistente remanente ni decide automáticamente el uso.</p>
  <h3>6 · Medidas y revisión</h3>
  <label class="chkrow"><input type="checkbox" id="ev_barricada" ${d.barricada?'checked':''}>Requiere barricada / restricción de acceso</label>
  <label class="chkrow"><input type="checkbox" id="ev_detallada" ${d.eval_detallada?'checked':''}>Requiere evaluación detallada</label>
  ${danoInput('acciones','Otras medidas y seguimiento',d.acciones_otras,true)}
  ${danoInput('justificacion_alertas','Justificación tras revisar alertas de coherencia (si aparecen)',d.justificacion_alertas,true)}
  <div id="validationDano" class="validation-dano" role="alert" tabindex="-1"></div>
  <div class="grid2"><button id="btnSaveEval" class="primary">Finalizar evaluación</button><button id="btnCancelEval">Descartar borrador</button></div>
  <p class="mini">Puede dejar un borrador incompleto. Finalizar exige revisar los rubros y justificar la decisión. La ficha no asigna una categoría automáticamente.</p></div>`;
}
function fechaLocalDano(fecha){const d=new Date(fecha);if(Number.isNaN(d.getTime()))return '';d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)}
function avisoBorrador(msg,error=false){const box=id('draftStatus');if(box){box.textContent=msg;box.classList.toggle('save-error',error)}}
// Cada cambio captura su propio borrador: cambiar de edificio no reasigna una escritura pendiente.
function saveDraftDebounced(){
  if(!S.draft)return Promise.resolve();const d=S.draft,token=d.uuid;
  avisoBorrador('Guardando borrador…');
  return Storage.saveDraft(d.buildingKey,d).then(()=>{if(S.draft?.uuid===token)avisoBorrador('Borrador guardado en este dispositivo.');return true}).catch(err=>{if(S.draft?.uuid===token)avisoBorrador('No se pudo guardar el borrador: '+err.message+'. Mantenga esta pestaña abierta y libere espacio.',true);return false});
}
function renderRegistrosDano(){
  const box=id('registrosDano');if(!box)return;const draft=S.draft;
  box.innerHTML=registrosDanoHTML(draft);
  box.oninput=box.onchange=e=>{if(S.draft!==draft||!e.target.isConnected)return;const prop=e.target.dataset.prop,row=e.target.closest('[data-registro]');if(prop&&row){S.draft.registros[Number(row.dataset.registro)][prop]=e.target.value;saveDraftDebounced()}};
  box.onclick=e=>{const b=e.target.closest('[data-remove]');if(b&&confirm('¿Quitar este registro de daño del borrador?')){S.draft.registros.splice(Number(b.dataset.remove),1);renderRegistrosDano();saveDraftDebounced()}};
}
function wireDanoForm(f){
  const activeDraft=S.draft;
  const bind=(key,prop=key)=>{const el=id('ev_'+key);el.oninput=el.onchange=()=>{if(S.draft!==activeDraft||!el.isConnected)return;S.draft[prop]=el.type==='checkbox'?el.checked:el.value;saveDraftDebounced()}};
  for(const key of ['evaluador','cip','tipo','fecha','alcance','sistema_observado','limitaciones','fundamento','restricciones','metodo_detallado','justificacion_alertas','barricada'])bind(key);
  for(const [key,prop] of [['evento','eventoId'],['pct','pct_dano'],['detallada','eval_detallada'],['acciones','acciones_otras'],['obs','observaciones']])bind(key,prop);
  id('habGrid').onclick=e=>{const b=e.target.closest('.habbtn');if(!b)return;S.draft.habitabilidad=b.dataset.v;for(const x of id('habGrid').children){x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))}saveDraftDebounced()};
  id('danoGrupos').onclick=e=>{const b=e.target.closest('.dano-estado');if(!b)return;S.draft.danos[b.dataset.rubro]=b.dataset.v;for(const x of b.parentElement.children){const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))}saveDraftDebounced()};
  id('btnAddRegistro').onclick=()=>{S.draft.registros.push(nuevoRegistroDano());renderRegistrosDano();saveDraftDebounced()};
  renderRegistrosDano();renderFotoThumbs();
  id('fotoInput').onchange=async e=>{
    const d=S.draft,files=[...e.target.files];d._photosLoading=(d._photosLoading||0)+files.length;
    for(const file of files){try{const dataUrl=await compressPhoto(file);d.fotos.push({uuid:uuid(),codigo:'F-'+uuid().slice(0,8),descripcion:file.name,dataUrl});await Storage.saveDraft(d.buildingKey,d)}catch(err){if(S.draft===d){id('photoStatus').textContent='No se pudo procesar o guardar '+file.name+': '+err.message;avisoBorrador('Hay fotografías pendientes de guardar. Mantenga esta pestaña abierta.',true)}}finally{d._photosLoading--}}
    if(S.draft===d){e.target.value='';renderFotoThumbs();await saveDraftDebounced()}
  };
  id('prevEvals').onclick=async e=>{
    const ed=e.target.closest('[data-editar]'),ann=e.target.closest('[data-anular]'),restore=e.target.closest('[data-restaurar]'),review=e.target.closest('[data-revisar]');
    if(ed&&S.draft._photosLoading){alert('Espere a que terminen las fotografías.');return}
    if(ed){const ev=evalsOf(f.properties.key).find(x=>x.uuid===ed.dataset.editar);if(ev){S.draft=normalizarDano({...ev,fecha:fechaLocalDano(ev.fecha),fotos:await fotosDe(ev)});await saveDraftDebounced();showSelected()}}
    if(ann){try{await anularEval(f.properties.key,ann.dataset.anular);showSelected();refresh()}catch(err){alert('No se pudo anular: '+err.message)}}
    if(restore){try{await restaurarEval(f.properties.key,restore.dataset.restaurar);showSelected();refresh()}catch(err){alert('No se pudo restaurar: '+err.message)}}
    if(review){try{await revisarEval(f.properties.key,review.dataset.revisar);showSelected()}catch(err){alert('No se pudo registrar la revisión: '+err.message)}}
  };
  id('btnSaveEval').onclick=()=>saveEval(f);
  id('btnCancelEval').onclick=async()=>{if(S.draft._photosLoading){alert('Espere a que terminen las fotografías.');return}if(!confirm('¿Descartar el borrador actual?'))return;try{await Storage.clearDraft(f.properties.key);S.draft=newDraft(f);showSelected()}catch(err){avisoBorrador('No se pudo descartar: '+err.message,true)}};
}
function renderFotoThumbs(){
  const box=id('fotoThumbs');if(!box)return;
  box.innerHTML=S.draft.fotos.map((ph,i)=>`<figure class="evidence-photo"><img src="${attr(ph.dataUrl)}" alt="${attr(ph.descripcion||'Evidencia de inspección')}"><figcaption><b>${esc(ph.codigo||ph.uuid)}</b><label for="photo_${i}">Descripción y ubicación</label><input id="photo_${i}" data-caption="${i}" value="${attr(ph.descripcion||'')}"><button type="button" data-i="${i}">Quitar fotografía</button></figcaption></figure>`).join('');
  box.oninput=e=>{if(e.target.dataset.caption!==undefined){S.draft.fotos[Number(e.target.dataset.caption)].descripcion=e.target.value;saveDraftDebounced()}};
  box.onclick=e=>{const b=e.target.closest('[data-i]');if(b&&confirm('¿Quitar la fotografía? Revise las referencias en los registros.')){S.draft.fotos.splice(Number(b.dataset.i),1);renderFotoThumbs();saveDraftDebounced()}};
}
function compressPhoto(file){return new Promise((res,rej)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{try{let w=img.width,h=img.height,max=1600;if(w>h&&w>max){h=Math.round(h*max/w);w=max}else if(h>max){w=Math.round(w*max/h);h=max}const cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(img,0,0,w,h);res(cv.toDataURL('image/jpeg',.85))}catch(e){rej(e)}finally{URL.revokeObjectURL(url)}};img.onerror=()=>{URL.revokeObjectURL(url);rej(new Error('Imagen no válida'))};img.src=url})}
async function fotosDe(ev){const out=[];for(const fu of ev.fotos||[]){const rec=await Storage.get('fotos',fu);if(rec)out.push({...rec,...(ev.fotoMetadatos||{})[fu]})}return out}
async function saveEval(f){
  const d=S.draft;if(d._photosLoading){alert('Espere a que terminen de guardarse las fotografías.');return}
  const anterior=evalsOf(d.buildingKey).find(e=>e.uuid===d.uuid),eraEdicion=!!anterior;
  if(eraEdicion&&!evalPuede(anterior)){alert('Esta evaluación pertenece a otro usuario. Solicite la modificación al coordinador.');return}
  const {errores,avisos}=validarDano(d),box=id('validationDano');
  box.innerHTML=[...errores,...avisos].map(t=>`<p>${esc(t)}</p>`).join('');if(errores.length){box.focus();return}
  if(!d.eventoId&&!confirm('No hay evento asociado. ¿Finalizar de todos modos?'))return;
  const button=id('btnSaveEval');if(button.disabled)return;button.disabled=true;const form=button.closest('.ficha-v2');form.inert=true;
  try{
    await Storage._draftQueue.catch(()=>{});
    const snapshot=JSON.parse(JSON.stringify(d));delete snapshot._photosLoading;
    const actor=typeof actorActual==='function'?actorActual(d.evaluador):{id:Storage.deviceId(),email:'',nombre:d.evaluador||'',rol:'local'};
    const inicio=Date.parse(snapshot.startedAt),duracion=anterior?.duracionMin??(inicio?Math.max(1,Math.min(1440,Math.round((Date.now()-inicio)/60000))):null);
    const rec={...snapshot,fecha:new Date(d.fecha).toISOString(),fotos:d.fotos.map(ph=>ph.uuid),fotoMetadatos:Object.fromEntries(d.fotos.map(ph=>[ph.uuid,{codigo:ph.codigo||ph.uuid,descripcion:ph.descripcion||''}])),duracionMin:duracion,updatedAt:revisionISO(anterior?.updatedAt),deviceId:Storage.deviceId(),training:!!globalThis.SISMO_TALLER,estadoRegistro:'vigente',revisionEstado:'pendiente',createdBy:anterior?.createdBy||actor.id,createdByEmail:anterior?.createdByEmail||actor.email,lastEditedBy:actor.id,lastEditedByRole:actor.rol};
    await Storage.saveInspection(rec,snapshot.fotos);
    if(!globalThis.SISMO_TALLER){try{localStorage.setItem('sl6_evaluador',d.evaluador);localStorage.setItem('sl6_cip',d.cip||'')}catch{}}
    const arr=S.evalsByBuilding[rec.buildingKey]||(S.evalsByBuilding[rec.buildingKey]=[]),i=arr.findIndex(x=>x.uuid===rec.uuid);if(i>=0)arr[i]=rec;else arr.push(rec);
    if(typeof pushEval==='function'&&!rec.training)pushEval(rec);
    if(typeof pushFoto==='function'&&!rec.training)for(const ph of snapshot.fotos)pushFoto(ph.uuid,ph.dataUrl,{buildingKey:rec.buildingKey,evalUuid:rec.uuid});
    if(!rec.training)await registrarActividad(eraEdicion?'evaluacion_actualizada':'evaluacion_creada','evaluacion',rec.uuid,`${rec.local_id||rec.buildingKey} · ${HAB_LABEL[rec.habitabilidad]||'Sin decisión'}`,{buildingKey:rec.buildingKey,evaluador:rec.evaluador||''});
    if(S.draft===d){S.draft=newDraft(f);showSelected()}
    refresh();if(typeof renderSectoresPanel==='function')renderSectoresPanel();status('Evaluación guardada: '+HAB_LABEL[rec.habitabilidad]+'.');
  }catch(err){box.textContent='No se pudo finalizar. Se conserva el borrador: '+err.message;box.focus()}finally{button.disabled=false;form.inert=false}
}
async function anularEval(buildingKey,evUuid,motivo){
  let arr=S.evalsByBuilding[buildingKey]||[],ev=arr.find(x=>x.uuid===evUuid);if(!ev||ev.estadoRegistro==='anulada')return false;
  if(!evalPuede(ev))throw new Error('la evaluación pertenece a otro usuario');
  if(motivo===undefined)motivo=prompt('Indique el motivo de la anulación. La ficha se conservará en el historial:','');
  motivo=String(motivo||'').trim();if(motivo.length<8){if(motivo)alert('El motivo debe explicar brevemente la anulación.');return false}
  let actor=typeof actorActual==='function'?actorActual(ev.evaluador):{id:Storage.deviceId()},ts=revisionISO(ev.updatedAt),rec={...ev,estadoRegistro:'anulada',anulacionMotivo:motivo,anuladaAt:ts,anuladaBy:actor.id,updatedAt:ts,deviceId:Storage.deviceId()};await Storage.put('evaluaciones',rec);arr[arr.findIndex(x=>x.uuid===evUuid)]=rec;if(typeof pushEval==='function'&&!rec.training)pushEval(rec);if(!rec.training&&typeof registrarActividad==='function')await registrarActividad('evaluacion_anulada','evaluacion',evUuid,`${rec.local_id||buildingKey}: ${motivo}`,{buildingKey,evaluador:rec.evaluador||''});status('Evaluación anulada y conservada en el historial.');return true
}
async function restaurarEval(buildingKey,evUuid){
  if(!coordPuede())throw new Error('solo el coordinador puede restaurar una evaluación');
  let arr=S.evalsByBuilding[buildingKey]||[],ev=arr.find(x=>x.uuid===evUuid);if(!ev||ev.estadoRegistro!=='anulada')return false;let actor=typeof actorActual==='function'?actorActual(ev.evaluador):{id:Storage.deviceId()},ts=revisionISO(ev.updatedAt),rec={...ev,estadoRegistro:'vigente',revisionEstado:'pendiente',restauradaAt:ts,restauradaBy:actor.id,updatedAt:ts,deviceId:Storage.deviceId()};await Storage.put('evaluaciones',rec);arr[arr.findIndex(x=>x.uuid===evUuid)]=rec;if(typeof pushEval==='function'&&!rec.training)pushEval(rec);if(!rec.training&&typeof registrarActividad==='function')await registrarActividad('evaluacion_restaurada','evaluacion',evUuid,`${rec.local_id||buildingKey}`,{buildingKey,evaluador:rec.evaluador||''});status('Evaluación restaurada y pendiente de revisión.');return true
}
async function revisarEval(buildingKey,evUuid,comentario){
  if(!coordPuede())throw new Error('solo el coordinador puede registrar la revisión');
  let arr=S.evalsByBuilding[buildingKey]||[],ev=arr.find(x=>x.uuid===evUuid);if(!ev||ev.estadoRegistro==='anulada')return false;if(comentario===undefined)comentario=prompt('Observación de revisión (puede dejarla vacía):','Revisión de coherencia completada.');if(comentario===null)return false;let actor=typeof actorActual==='function'?actorActual():{id:Storage.deviceId(),nombre:'Coordinador'},ts=revisionISO(ev.updatedAt),rec={...ev,revisionEstado:'revisada',revisionComentario:String(comentario||'').trim(),revisadaAt:ts,revisadaBy:actor.id,revisadaPor:actor.nombre||actor.email||'Coordinador',updatedAt:ts,deviceId:Storage.deviceId()};await Storage.put('evaluaciones',rec);arr[arr.findIndex(x=>x.uuid===evUuid)]=rec;if(typeof pushEval==='function'&&!rec.training)pushEval(rec);if(!rec.training&&typeof registrarActividad==='function')await registrarActividad('evaluacion_revisada','evaluacion',evUuid,`${rec.local_id||buildingKey}`,{buildingKey,evaluador:rec.evaluador||''});status('Evaluación marcada como revisada.');return true
}

function registrosDanoHTML(draft){
  const campos=[['elemento','Elemento / código'],['ubicacion','Piso, eje o ambiente'],['patron','Patrón y extensión del daño'],['medicion','Medición, unidad e instrumento (o no medida)'],['mecanismo','Mecanismo probable o incertidumbre'],['evidencia','Evidencia: código de foto/croquis o descripción de observación']];
  return draft.registros.map((r,i)=>`<fieldset class="registro-dano" data-registro="${i}"><legend>Daño ${i+1}</legend><label for="reg_${i}_rubro">Rubro</label><select id="reg_${i}_rubro" data-prop="rubro">${opts([['','Seleccione'],...DANO_GRUPOS.flatMap(([,a])=>a.map(([k,t])=>[k,t]))],r.rubro)}</select>${campos.map(([k,t])=>`<label for="reg_${i}_${k}">${t}</label><textarea rows="2" id="reg_${i}_${k}" data-prop="${k}">${esc(r[k])}</textarea>`).join('')}<label for="reg_${i}_severidad">Severidad del daño</label><select id="reg_${i}_severidad" data-prop="severidad">${opts([['','Seleccionar'],['leve','Leve'],['moderado','Moderado'],['severo','Severo']],r.severidad)}</select><button type="button" data-remove="${i}" class="danger">Quitar registro ${i+1}</button></fieldset>`).join('');
}
