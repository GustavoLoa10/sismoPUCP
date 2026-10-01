const PERFIL_TALLER_KEY='sismolima:taller:perfil:v1';
const S={eventos:TALLER_EVENTOS_DOCUMENTALES.map(e=>({...e})),eventoId:TALLER_EVENTOS_DOCUMENTALES[0].uuid,evalsByBuilding:{},features:[],selected:'',draft:null,perfil:{nombre:'',codigoPUCP:'',institucion:'',equipo:''}};
let BANCO_ACTIVO='practica';
function casosBanco(){return TALLER_PRACTICAS}
function featureTaller(c){return {properties:{key:'TALLER-'+c.id,local_id:c.id,osm:{name:c.titulo,address:c.ubicacion||'Ubicación documentada en la fuente'}}}}
function casoActivo(){return TALLER_CASOS.find(c=>'TALLER-'+c.id===S.selected)}
function imagenCasoTaller(c){return `data/taller/imagenes/${c.id}_antes_despues_${['T05','T06','T07','T09'].includes(c.id)?'coherente.png':'sintetico.jpg'}`}
function imagen3dCasoTaller(c){return `data/taller/imagenes/${c.id}_3d_coherente.png`}
function lecturaLaminaTaller(c){return ['T01','T08'].includes(c.id)?'Izquierda: antes; derecha: después. Arriba: exterior; abajo: detalle interior.':'Arriba: antes a la izquierda y después a la derecha. Abajo: detalles del daño, no una segunda comparación temporal.'}
const GALERIA_TALLER={activa:{}};
function recursosBaseTaller(c){
  if(c.recursos?.length)return c.recursos.map(r=>structuredClone(r));
  const recursos=[
    {id:`${c.id}:antes-despues`,caseId:c.id,tipo:'incluida',src:imagenCasoTaller(c),titulo:'Comparación antes y después',descripcion:`Imagen sintética. ${lecturaLaminaTaller(c)} ${c.lecturaVisual}`,orden:0},
    {id:`${c.id}:3d`,caseId:c.id,tipo:'incluida',src:imagen3dCasoTaller(c),titulo:'Vista 3D del patrón de daño',descripcion:['T01','T08'].includes(c.id)?'Ilustración sintética de la fachada con detalle interior separado del ambiente indicado en la ficha.':'Ilustración 3D sintética corregida a partir de la lámina del caso. Daños representados según las evidencias escritas.',orden:1}
  ];
  if(c.id==='T08')recursos.push(
    {id:'T08:foto-general',caseId:'T08',tipo:'incluida',src:'data/taller/T08%20Hospital%20da%C3%B1ado/DSC03767.JPG',titulo:'Hospital dañado · vista general',descripcion:'Fotografía de referencia aportada para T08. Muestra la fachada exterior y la distribución visible del daño; no aporta geometría ni mediciones completas.',orden:2},
    {id:'T08:foto-detalle',caseId:'T08',tipo:'incluida',src:'data/taller/T08%20Hospital%20da%C3%B1ado/DSC03770.JPG',titulo:'Hospital dañado · detalle',descripcion:'Fotografía de referencia aportada para T08. Detalle del pórtico de concreto, cerramientos de ladrillo y componentes expuestos.',orden:3},
    {id:'T08:reconstruccion-3d',caseId:'T08',tipo:'incluida',src:'data/taller/imagenes/T08_reconstruccion_3d_hospital.png',titulo:'Reconstrucción 3D ilustrativa',descripcion:'Interpretación visual generada a partir de las dos fotografías. La geometría oculta es inferida y no constituye levantamiento métrico ni evidencia adicional.',orden:4},
    {id:'T08:recorrido-2-5d',caseId:'T08',tipo:'incluida',media:'video',src:'data/taller/imagenes/T08_recorrido_exterior_2_5d.webm',poster:'data/taller/imagenes/T08_reconstruccion_3d_hospital.png',titulo:'Recorrido exterior 2.5D',descripcion:'Animación local de 10 segundos con desplazamiento y aproximación de cámara sobre la reconstrucción. No es una órbita fotogramétrica ni permite observar lados no documentados.',orden:5},
    {id:'T08:giro-frontal',caseId:'T08',tipo:'incluida',media:'spin',src:'data/taller/imagenes/T08_giro_03.jpg',poster:'data/taller/imagenes/T08_giro_03.jpg',frames:['01','02','03','04','05','06'].map(n=>`data/taller/imagenes/T08_giro_${n}.jpg`),titulo:'Giro frontal interactivo',descripcion:'Arrastre horizontalmente o use las flechas del teclado para recorrer seis ángulos del frente. Los extremos son reconstrucciones aproximadas por IA; no corresponden a una fotogrametría ni muestran la parte posterior.',orden:6}
  );
  return recursos;
}
async function estadoGaleriaTaller(c){return await Storage.get('recursos_taller',`estado:${c.id}`)||{id:`estado:${c.id}`,caseId:c.id,tipo:'estado',ocultas:[],orden:[],descripciones:{}}}
async function recursosGaleriaTaller(c,incluirOcultas=false){
  const todos=await Storage.all('recursos_taller'),estado=todos.find(x=>x.id===`estado:${c.id}`)||{ocultas:[],orden:[],descripciones:{}},personalizadas=todos.filter(x=>x.caseId===c.id&&x.tipo==='personalizada');
  let recursos=[...recursosBaseTaller(c),...personalizadas].map(x=>({...x,descripcion:estado.descripciones?.[x.id]||x.descripcion}));
  if(!incluirOcultas)recursos=recursos.filter(x=>!estado.ocultas?.includes(x.id));
  const pos=new Map((estado.orden||[]).map((x,i)=>[x,i]));
  return recursos.sort((a,b)=>(pos.has(a.id)?pos.get(a.id):10000+(a.orden||0))-(pos.has(b.id)?pos.get(b.id):10000+(b.orden||0)));
}
function evidenciaVisualTaller(c){
  return `<section class="caso-galeria" aria-label="Recursos visuales del caso"><span id="galeriaCuenta" class="sr-only">Preparando…</span><div id="caseGallery" aria-live="polite"></div><details class="galeria-edicion"><summary>Editar recursos visuales</summary><div class="galeria-acciones"><button type="button" id="btnAddGallery">＋ Añadir imágenes</button><button type="button" id="btnAdd360">＋ Añadir foto 360°</button><input id="gallery360Input" type="file" accept="image/jpeg,image/png,image/webp" multiple hidden><input id="galleryInput" type="file" accept="image/*" multiple hidden><button type="button" id="btnRemoveGallery">Quitar recurso</button><button type="button" id="btnGalleryLeft" aria-label="Mover recurso a la izquierda">← Mover</button><button type="button" id="btnGalleryRight" aria-label="Mover recurso a la derecha">Mover →</button><button type="button" id="btnRestoreGallery">Restaurar incluidos</button></div><p id="galleryStatus" class="mini" role="status">Los cambios se guardan solo en este dispositivo. Para 360°: JPG, PNG o WebP equirectangular completo (2:1). Exporte primero la panorámica unida desde la aplicación de su cámara.</p></details></section>`;
}
function creditoRecursoTaller(r){
 if(r?.origen==='aportada')return `<span class="foto-real-badge">ARCHIVO APORTADO · EQUIPO PUCP</span><span>${esc(r.fecha||'')} · ${esc(r.licencia||'')}</span>`;
 if(r?.origen!=='real')return '<span>Recurso añadido para la práctica. Verifique su procedencia antes de redistribuirlo.</span>';
 return `<span class="foto-real-badge">FOTOGRAFÍA REAL DOCUMENTADA</span><span class="foto-credito">${esc(r.autor||'Autor no indicado')} · ${esc(r.fecha||'Fecha no indicada')} · <a href="${attr(r.licenciaUrl||r.fuente)}" target="_blank" rel="noopener">${esc(r.licencia||'Ver licencia')}</a> · <a href="${attr(r.fuente)}" target="_blank" rel="noopener">fuente original</a></span>`;
}
async function renderGaleriaTaller(c){
  const box=id('caseGallery');if(!box||casoActivo()?.id!==c.id)return;
  const recursos=await recursosGaleriaTaller(c),estado=await estadoGaleriaTaller(c);if(casoActivo()?.id!==c.id)return;
  let activa=GALERIA_TALLER.activa[c.id];if(!recursos.some(x=>x.id===activa))activa=recursos[0]?.id||'';GALERIA_TALLER.activa[c.id]=activa;
  const actual=recursos.find(x=>x.id===activa);id('galeriaCuenta').textContent=`${recursos.length} ${recursos.length===1?'recurso':'recursos'}`;
  const medio=actual?.media==='panorama'?`<button type="button" class="caso-imagen-ampliable" data-gallery-360 aria-haspopup="dialog"><img src="${attr(actual.poster||actual.src||actual.dataUrl)}" alt="${attr(actual.titulo)}"><span>◎ ${actual.projection==='single-fisheye'?'Explorar imagen':'Explorar foto 360°'}</span></button>`:actual?.media==='video'?`<video src="${attr(actual.src)}" poster="${attr(actual.poster||'')}" controls muted loop playsinline preload="metadata" aria-label="${attr(actual.titulo||'Video del caso '+c.id)}"></video>`:actual?.media==='spin'?`<div class="spin-visor" tabindex="0" role="img" aria-label="Vista 3 de 6. Arrastre horizontalmente o use las flechas para girar"><img src="${attr(actual.frames[2])}" alt=""><span aria-hidden="true">↔ Arrastre para girar</span></div>`:`<button type="button" class="caso-imagen-ampliable" data-gallery-zoom aria-haspopup="dialog" aria-label="Ampliar ${attr(actual?.titulo||'imagen del caso '+c.id)}"><img src="${attr(actual?.src||actual?.dataUrl)}" alt="${attr(actual?.titulo||'Imagen del caso '+c.id)}"><span aria-hidden="true">⛶ Ampliar imagen</span></button>`;
  box.innerHTML=actual?`<figure class="caso-foto">${medio}<figcaption><b>${esc(actual.titulo||'Recurso añadido')}</b><span>${esc(actual.descripcion||'Sin descripción')}</span>${creditoRecursoTaller(actual)}</figcaption></figure><div class="galeria-miniaturas" aria-label="Seleccionar recurso visual">${recursos.map((x,i)=>`<button type="button" data-gallery-id="${attr(x.id)}" class="${x.id===activa?'active':''}" aria-label="Ver recurso ${i+1}: ${attr(x.titulo||x.descripcion||'sin título')}"><img src="${attr(x.poster||x.src||x.dataUrl)}" alt="">${x.media==='video'?'<i aria-hidden="true">▶</i>':x.media==='spin'?'<i aria-hidden="true">↔</i>':''}<span>${i+1}</span></button>`).join('')}</div><details class="galeria-descripcion"><summary>Editar descripción</summary><label for="galleryDescription">Descripción del recurso</label><input id="galleryDescription" value="${attr(actual.descripcion||'')}" maxlength="240"></details>`:`<div class="galeria-vacia"><b>No hay recursos visibles en este caso.</b><span>Añada una imagen propia o restaure los recursos incluidos.</span></div>`;
  box.onclick=e=>{if(e.target.closest('[data-gallery-360]')){abrirPanoramaTaller(actual);return}const zoom=e.target.closest('[data-gallery-zoom]');if(zoom){abrirVisorImagen(actual);return}const b=e.target.closest('[data-gallery-id]');if(b){GALERIA_TALLER.activa[c.id]=b.dataset.galleryId;renderGaleriaTaller(c)}};
  const spin=box.querySelector('.spin-visor');if(spin){const foto=spin.querySelector('img'),frames=actual.frames;let indice=2,inicioX=0,inicioIndice=indice,activo=false;const mostrar=n=>{indice=Math.max(0,Math.min(frames.length-1,n));foto.src=frames[indice];spin.setAttribute('aria-label',`Vista ${indice+1} de ${frames.length}. Arrastre horizontalmente o use las flechas para girar`)};spin.onpointerdown=e=>{activo=true;inicioX=e.clientX;inicioIndice=indice;spin.setPointerCapture(e.pointerId);spin.classList.add('dragging')};spin.onpointermove=e=>{if(activo)mostrar(inicioIndice+Math.round((inicioX-e.clientX)/34))};spin.onpointerup=spin.onpointercancel=e=>{activo=false;spin.classList.remove('dragging');if(spin.hasPointerCapture(e.pointerId))spin.releasePointerCapture(e.pointerId)};spin.onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();mostrar(indice+(e.key==='ArrowRight'?1:-1))}}}
  const desc=id('galleryDescription');if(desc)desc.onchange=async()=>{estado.descripciones={...(estado.descripciones||{}),[activa]:desc.value.trim()};await Storage.put('recursos_taller',estado);id('galleryStatus').textContent='Descripción guardada en este dispositivo.'};
  const i=recursos.findIndex(x=>x.id===activa);id('btnRemoveGallery').disabled=!actual;id('btnGalleryLeft').disabled=i<=0;id('btnGalleryRight').disabled=i<0||i>=recursos.length-1;id('btnRestoreGallery').disabled=!(estado.ocultas||[]).length;
}
function abrirVisorImagen(recurso){
 const visor=id('imageViewer'),imagen=id('imageViewerImg');if(!visor||!imagen||!recurso)return;
 imagen.src=recurso.src||recurso.dataUrl||'';imagen.alt=recurso.titulo||'Imagen ampliada del caso';id('imageViewerTitle').textContent=recurso.titulo||'Imagen del caso';id('imageViewerCaption').textContent=recurso.descripcion||'';
 if(!visor.open)visor.showModal();
}
async function cerrarVisorImagen(){
 const visor=id('imageViewer');if(document.fullscreenElement&&visor?.contains(document.fullscreenElement))try{await document.exitFullscreen()}catch{}if(visor?.open)visor.close();
}
function wireVisorImagen(){
 const visor=id('imageViewer'),btnPantalla=id('btnImageFullscreen');if(!visor)return;
 const pantalla=visor.querySelector('.image-viewer-shell');
 visor.addEventListener('cancel',e=>{e.preventDefault();cerrarVisorImagen()});
 id('btnImageViewerClose').onclick=cerrarVisorImagen;
 visor.onclick=e=>{if(e.target===visor)cerrarVisorImagen()};
 visor.addEventListener('close',()=>{id('imageViewerImg').removeAttribute('src')});
 if(!pantalla.requestFullscreen){btnPantalla.hidden=true;return}
 btnPantalla.onclick=async()=>{try{if(document.fullscreenElement===pantalla)await document.exitFullscreen();else await pantalla.requestFullscreen()}catch{btnPantalla.textContent='Pantalla completa no disponible'}};
 document.addEventListener('fullscreenchange',()=>{const activo=document.fullscreenElement===pantalla;btnPantalla.textContent=activo?'Salir de pantalla completa':'⛶ Pantalla completa';btnPantalla.setAttribute('aria-pressed',String(activo))});
}
async function moverGaleriaTaller(c,paso){const recursos=await recursosGaleriaTaller(c),idActiva=GALERIA_TALLER.activa[c.id],i=recursos.findIndex(x=>x.id===idActiva),j=i+paso;if(i<0||j<0||j>=recursos.length)return;[recursos[i],recursos[j]]=[recursos[j],recursos[i]];const estado=await estadoGaleriaTaller(c);estado.orden=recursos.map(x=>x.id);await Storage.put('recursos_taller',estado);await renderGaleriaTaller(c)}
async function quitarGaleriaTaller(c){const rid=GALERIA_TALLER.activa[c.id],recurso=(await recursosGaleriaTaller(c)).find(x=>x.id===rid);if(!recurso)return;if(recurso.tipo==='personalizada')await Storage.del('recursos_taller',rid);else{const estado=await estadoGaleriaTaller(c);estado.ocultas=[...new Set([...(estado.ocultas||[]),rid])];estado.orden=(estado.orden||[]).filter(x=>x!==rid);await Storage.put('recursos_taller',estado)}delete GALERIA_TALLER.activa[c.id];await renderGaleriaTaller(c);id('galleryStatus').textContent='Imagen quitada de este caso. Las imágenes incluidas pueden restaurarse.'}
async function restaurarGaleriaTaller(c){const estado=await estadoGaleriaTaller(c);estado.ocultas=[];await Storage.put('recursos_taller',estado);await renderGaleriaTaller(c);id('galleryStatus').textContent='Imágenes incluidas restauradas.'}
async function agregarGaleriaTaller(c,files){const lista=[...files].slice(0,12);if(!lista.length)return;id('galleryStatus').textContent=`Procesando ${lista.length} ${lista.length===1?'imagen':'imágenes'}…`;for(const file of lista){try{const dataUrl=await compressPhoto(file),rid=`personalizada:${c.id}:${uuid()}`;await Storage.put('recursos_taller',{id:rid,caseId:c.id,tipo:'personalizada',dataUrl,titulo:'Imagen añadida',descripcion:file.name,orden:Date.now(),createdAt:nowISO()});GALERIA_TALLER.activa[c.id]=rid}catch(err){id('galleryStatus').textContent=`No se pudo añadir ${file.name}: ${err.message}`}}await renderGaleriaTaller(c);id('galleryStatus').textContent=`${lista.length} ${lista.length===1?'imagen añadida':'imágenes añadidas'} y guardadas en este dispositivo.`}
function wireGaleriaTaller(c){const input360=id('gallery360Input');id('btnAdd360').onclick=()=>input360.click();input360.onchange=async()=>{await agregarPanoramasTaller(c,input360.files);input360.value=''};const input=id('galleryInput');id('btnAddGallery').onclick=()=>input.click();input.onchange=async()=>{await agregarGaleriaTaller(c,input.files);input.value=''};id('btnRemoveGallery').onclick=()=>quitarGaleriaTaller(c);id('btnGalleryLeft').onclick=()=>moverGaleriaTaller(c,-1);id('btnGalleryRight').onclick=()=>moverGaleriaTaller(c,1);id('btnRestoreGallery').onclick=()=>restaurarGaleriaTaller(c)}
function croquisTaller(c){
  if(c.id==='T01')return `<svg class="croquis" viewBox="0 0 440 245" role="img" aria-label="Croquis C01, segundo piso, tabique T1 en dormitorio B"><text x="18" y="25" font-size="14" fill="#365967">C01 · Segundo piso · sin escala</text><path d="M60 55H370V205H60Z M205 55V205" fill="none" stroke="#365967" stroke-width="8"/><path d="M205 130H365" stroke="#d3872b" stroke-width="5"/><path d="m275 130 8 -7 10 12 10 -9" stroke="#bd4430" fill="none" stroke-width="2"/><text x="80" y="100" font-size="14">Ambiente A</text><text x="225" y="93" font-size="14">Dormitorio B</text><text x="235" y="164" font-size="13">T1 · Evidencia E02</text><text x="20" y="230" font-size="11">Localización conceptual; la abertura se aporta en el enunciado.</text></svg>`;
  if(c.id==='T05')return `<svg class="croquis" viewBox="0 0 440 350" role="img" aria-label="Croquis C05, fachada de cinco pisos con C1 y C2 en primer piso abierto"><text x="18" y="25" font-size="14" fill="#365967">C05 · Fachada · sin escala</text><path d="M85 280V55H345V280" fill="none" stroke="#365967" stroke-width="9"/>${[100,145,190,235].map(y=>`<path d="M85 ${y}H345" stroke="#365967" stroke-width="8"/>`).join('')}${[65,110,155,200].map(y=>`<rect x="110" y="${y}" width="210" height="26" fill="#dce6eb"/>`).join('')}<path d="m76 250 18 8 -18 9 18 9 M336 250l18 8 -18 9 18 9" stroke="#bd4430" stroke-width="4" fill="none"/><text x="115" y="265" font-size="14">Primer piso abierto</text><text x="60" y="305" font-size="14">C1 · E02</text><text x="300" y="305" font-size="14">C2 · E03</text><text x="18" y="335" font-size="11">Marcas de localización; no representan medidas ni deformación real.</text></svg>`;
  return '';
}
function croquisOpcional(c){if(c.documental)return '';const croquis=croquisTaller(c);return croquis?`<details class="croquis-opcional"><summary>Ver croquis de ubicación (opcional)</summary>${croquis}</details>`:''}
function showSelected(){
 const c=casoActivo(),f=S.features.find(f=>f.properties.key===S.selected),panel=document.querySelector('.taller-form');
 panel?.classList.remove('readonly');
 if(!S.draft||S.draft.buildingKey!==S.selected){S.draft=Storage.loadDraft(S.selected)||newDraft(f);if(!S.draft.evaluador&&S.perfil.nombre)S.draft.evaluador=S.perfil.nombre;if(!S.draft.eventoId||S.draft.eventoId==='SIM-01')S.draft.eventoId=c.eventoId;}
 id('sel').innerHTML=danoFormHTML(f);wireDanoForm(f);
}
function indiceCaso(){return casosBanco().findIndex(c=>'TALLER-'+c.id===S.selected)}
function renderRuta(){
  const casos=casosBanco(),completados=BANCO_ACTIVO==='resuelto'?casos.length:casos.filter(c=>latestEval('TALLER-'+c.id)).length,i=indiceCaso();
  id('progressText').textContent=BANCO_ACTIVO==='resuelto'?`${casos.length} fichas resueltas disponibles`:`${completados} de ${casos.length} prácticas completadas`;
  id('caseChips').innerHTML=casos.map(c=>{const key='TALLER-'+c.id,completo=!!latestEval(key),borrador=!!Storage.loadDraft(key),resuelto=c.tipo==='resuelto';return `<button type="button" data-caso="${attr(c.id)}" aria-current="${key===S.selected?'true':'false'}" class="caso-chip ${key===S.selected?'active':''} ${resuelto?'resolved':completo?'complete':borrador?'draft':''}" aria-label="${attr(c.id+(resuelto?', ejemplo resuelto':completo?', completado':borrador?', en borrador':', pendiente'))}" title="${attr(c.titulo)}">${esc(c.id.slice(1))}<span>${resuelto?'✓':completo?'✓':borrador?'•':''}</span></button>`}).join('');
  id('caseChips').onclick=async e=>{const b=e.target.closest('[data-caso]');if(b){id('caseSelect').value=b.dataset.caso;await seleccionarCaso();document.querySelector('.paso-ficha').scrollIntoView({block:'start',behavior:'instant'})}};
  const chips=id('caseChips'),activo=chips.querySelector('.active');if(activo){const a=activo.getBoundingClientRect(),r=chips.getBoundingClientRect();if(a.left<r.left)chips.scrollLeft+=a.left-r.left-4;else if(a.right>r.right)chips.scrollLeft+=a.right-r.right+4;}
  id('btnPrev').disabled=i<=0;id('btnNext').disabled=i<0||i>=casos.length-1;
  id('btnResumen').disabled=BANCO_ACTIVO==='resuelto';
}
function navegarCaso(paso){const casos=casosBanco(),i=indiceCaso()+paso;if(i<0||i>=casos.length)return;id('caseSelect').value=casos[i].id;seleccionarCaso();scrollTo({top:0,behavior:'smooth'})}
function mostrarResumen(){
 const filas=TALLER_PRACTICAS.map(c=>({c,ev:evalsOf('TALLER-'+c.id).find(e=>e.estadoRegistro!=='anulada')}));
 id('resumenTaller').innerHTML='<h2>Mis ocho prácticas</h2><p>'+filas.filter(x=>x.ev).length+' de 8 finalizadas.</p><table><thead><tr><th>Caso</th><th>Estado</th><th>Decisión registrada</th></tr></thead><tbody>'+filas.map(x=>'<tr><td>'+esc(x.c.id+' · '+x.c.titulo)+'</td><td>'+(x.ev?'Finalizada':Storage.loadDraft('TALLER-'+x.c.id)?'Borrador':'Pendiente')+'</td><td>'+esc(x.ev?HAB_LABEL[x.ev.habitabilidad]:'—')+'</td></tr>').join('')+'</tbody></table>';
}
function refresh(){renderRuta();if(!id('resumenTaller').hidden)mostrarResumen()}
function fuentesCasoHTML(c){
 if(!c.fuentes?.length)return '';
 return `<section class="fuentes-caso"><h3>Procedencia y licencia</h3><ul>${c.fuentes.map(f=>`<li><b>${esc(f.tipo)}:</b> ${f.url?`<a href="${attr(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`:esc(f.titulo)}${f.autor?` · ${esc(f.autor)}`:''}${f.licencia?` · ${f.licenciaUrl?`<a href="${attr(f.licenciaUrl)}" target="_blank" rel="noopener">${esc(f.licencia)}</a>`:esc(f.licencia)}`:''}</li>`).join('')}</ul></section>`;
}
function detallesExpedienteTaller(c){
 const tituloPreguntas=c.tipo==='resuelto'?'Claves de lectura':'Preguntas para discutir';
 return `<div class="expediente-acordeon">${comparacionesCasoHTML(c)}<details><summary><span>Contexto y alcance</span><small>Fuente, sistema y límites</small></summary><div class="expediente-detalle"><h3>Ficha basal</h3><p>${esc(c.basal)}</p><h3>Alcance documental</h3><p>${esc(c.contexto)}</p>${croquisOpcional(c)}</div></details><details><summary><span>Evidencias</span><small>${c.evidencias.length} registros</small></summary><div class="expediente-detalle">${c.evidencias.map(([k,t])=>`<article class="evidencia"><b>${esc(k)}</b><p>${esc(t)}</p></article>`).join('')}</div></details><details><summary><span>${tituloPreguntas}</span><small>${c.preguntas.length} puntos</small></summary><div class="expediente-detalle"><ol>${c.preguntas.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></div></details><details><summary><span>Procedencia y uso</span><small>Fuentes, licencia y límites</small></summary><div class="expediente-detalle">${fuentesCasoHTML(c)}<p class="documental-note"><b>Uso responsable:</b> lectura didáctica limitada a estas evidencias; no equivale a un dictamen del edificio.</p></div></details></div>`;
}
function cargarPerfilTaller(){
 try{S.perfil={...S.perfil,...JSON.parse(localStorage.getItem(PERFIL_TALLER_KEY)||'{}')}}catch{}
 id('participantName').value=S.perfil.nombre||'';id('participantPUCP').value=S.perfil.codigoPUCP||'';id('participantInstitution').value=S.perfil.institucion||'';id('participantTeam').value=S.perfil.equipo||'';
}
function guardarPerfilTaller(){
 S.perfil={nombre:id('participantName').value.trim(),codigoPUCP:id('participantPUCP').value.trim(),institucion:id('participantInstitution').value.trim(),equipo:id('participantTeam').value.trim()};
 const boton=id('btnSaveProfile');
 try{localStorage.setItem(PERFIL_TALLER_KEY,JSON.stringify(S.perfil));id('profileStatus').textContent='Datos guardados en este dispositivo.';boton.textContent='Guardado ✓';clearTimeout(boton._feedbackTimer);boton._feedbackTimer=setTimeout(()=>boton.textContent='Guardar datos',1600)}catch(err){id('profileStatus').textContent='No se pudieron guardar: '+err.message;boton.textContent='Reintentar guardar'}
 if(S.draft){S.draft.evaluador=S.perfil.nombre;S.draft.codigoPUCP=S.perfil.codigoPUCP;} actualizarAvisoPerfil();
}
async function cambiarBanco(){
 BANCO_ACTIVO='practica';document.body.dataset.bank='practica';
 const casos=casosBanco();id('caseSelect').innerHTML=opts(casos.map(c=>[c.id,c.id+' · '+c.titulo]),casos[0].id);id('caseSelect').value=casos[0].id;
 id('resumenTaller').hidden=true;await seleccionarCaso();
}
async function seleccionarCaso(){
  pararRecorridoTaller();
  const c=TALLER_CASOS.find(c=>c.id===id('caseSelect').value);if(!c)return;S.selected='TALLER-'+c.id;S.eventoId=c.eventoId;
  id('expediente').innerHTML=`<header class="expediente-cabecera"><p class="eyebrow">${esc(c.id)} · ${esc(c.nivel)}</p><h2>${esc(c.titulo)}</h2><p class="expediente-meta"><b>${esc(c.evento)}</b><span>${esc(c.ubicacion)}</span></p></header>${evidenciaVisualTaller(c)}${recorridoHTMLTaller(c)}${detallesExpedienteTaller(c)}`;
  const resuelto=c.tipo==='resuelto';document.querySelector('.taller-solution')?.classList.toggle('resolved-mode',resuelto);
  wireGaleriaTaller(c);wireRecorridoTaller(c);await renderGaleriaTaller(c);showSelected();renderRuta();status(resuelto?`Ejemplo ${c.id} listo: ficha documental completa y exportable.`:`Práctica ${c.id} lista. El borrador se guarda automáticamente en este dispositivo.`);
}
function tablaFichaTaller(ev){
  return `<table>${repFila('Evaluador',ev.evaluador)}${repFila('CIP / referencia',ev.cip||'N/D')}${repFila('Evento',S.eventos.find(e=>e.uuid===ev.eventoId)?.nombre||ev.eventoId||'N/D')}${repFila('Fecha',fmtFecha(ev.fecha))}${repFila('Tipo',ev.tipo)}${repFila('Alcance',ev.alcance==='exterior'?'Solo exterior':'Exterior e interior')}${repFila('Sistema y fuente',ev.sistema_observado)}${repFila('Limitaciones',ev.limitaciones)}${repFila('Decisión',HAB_LABEL[ev.habitabilidad]||'Pendiente')}${repFila('Fundamento',ev.fundamento)}${repFila('Restricciones',ev.restricciones)}${repFila('Daño global',PCT_LABEL[ev.pct_dano]||'Sin estimar')}${repFila('Barricada',ev.barricada?'Sí':'No')}${repFila('Evaluación detallada',ev.eval_detallada?'Sí':'No')}${repFila('Método',ev.metodo_detallado)}${repFila('Medidas y seguimiento',ev.acciones_otras)}${repFila('Revisión de alertas',ev.justificacion_alertas)}${repFila('Observaciones',ev.observaciones)}</table><h3>Resumen por rubro</h3><table>${DANO_GRUPOS.flatMap(([,a])=>a).map(([k,t])=>repFila(t,sevTitle(ev.danos?.[k]||'Pendiente'))).join('')}</table>${reporteRegistrosDano(ev)}`;
}
async function iniciarTaller(){
 try{
  await Storage.open();await Storage.initDrafts();
  for(const ev of await Storage.all('evaluaciones'))(S.evalsByBuilding[ev.buildingKey]||(S.evalsByBuilding[ev.buildingKey]=[])).push(ev);
  S.features=TALLER_CASOS.map(featureTaller);cargarPerfilTaller();iniciarCabeceraFija();wireVisorImagen();
  id('caseSelect').disabled=false;id('caseSelect').onchange=seleccionarCaso;
  id('btnSaveProfile').onclick=guardarPerfilTaller;for(const k of ['participantName','participantPUCP','participantInstitution','participantTeam'])id(k).oninput=id(k).onchange=guardarPerfilTaller;
  id('btnPrev').onclick=()=>navegarCaso(-1);id('btnNext').onclick=()=>navegarCaso(1);
  id('btnResumen').onclick=()=>{const box=id('resumenTaller');box.hidden=!box.hidden;id('btnResumen').setAttribute('aria-expanded',String(!box.hidden));if(!box.hidden)mostrarResumen()};
  await cambiarBanco();
 }catch(err){status('No se pudo abrir el taller: '+err.message);id('status').classList.remove('sr-only')}
}
iniciarTaller();

function comparacionesCasoHTML(c){
 if(!c.comparaciones?.length)return '';
 return `<details class="comparaciones-caso"><summary><span>Comparaciones de contexto</span><small>${c.comparaciones.length} imágenes · otros inmuebles o identidad sin confirmar</small></summary><div class="expediente-detalle"><p><b>Estas imágenes no acreditan otras vistas del inmueble evaluado.</b> No traslade sus daños a la ficha principal.</p>${c.comparaciones.map(r=>`<figure><img loading="lazy" src="${attr(r.src)}" alt="${attr(r.titulo)}" style="width:100%;height:auto"><figcaption><b>${esc(r.titulo)}</b><p>${esc(r.descripcion)}</p><a href="${attr(r.fuente)}" target="_blank" rel="noopener">Fuente original</a> · ${esc(r.autor||'')} · ${esc(r.licencia||'')}</figcaption></figure>`).join('')}</div></details>`;
}

function actualizarAvisoPerfil(){
 const completos=!!(id('participantName').value.trim()&&id('participantPUCP').value.trim());
 id('participantDock').classList.toggle('profile-incomplete',!completos);
 id('profileStatus').textContent=completos?'Datos guardados en este dispositivo.':'Completa tu nombre y Código PUCP antes de finalizar las fichas.';
}
function iniciarCabeceraFija(){
 const dock=id('participantDock');const medir=()=>document.documentElement.style.setProperty('--dock-height',Math.ceil(dock.getBoundingClientRect().height)+'px');
 new ResizeObserver(medir).observe(dock);medir();actualizarAvisoPerfil();
}
