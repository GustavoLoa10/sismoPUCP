/* La ficha se obtiene de danoFormHTML y registrosDanoHTML: misma fuente que la UI. */
const EXPORT_TALLER_CSS=`
@page{size:A4;margin:14mm;@bottom-right{content:"Página " counter(page) " de " counter(pages);font:9px Arial;color:#536773}}body{max-width:185mm;font:11px/1.4 Arial,sans-serif;color:#20353f;margin:20px auto}h1{font-size:23px}h2{font-size:19px}h3{font-size:15px;border-bottom:1px solid #b6ced7;padding-bottom:5px;break-after:avoid}p{overflow-wrap:anywhere}a{color:#176f7b}label{break-after:avoid;display:block;font-weight:bold;margin-top:9px}fieldset{border:1px solid #c5d7de;margin:10px 0;padding:10px;min-width:0}legend{font-weight:bold}.pdf-value{break-inside:avoid;white-space:pre-wrap;overflow-wrap:anywhere;min-height:18px;padding:5px 7px;border:1px solid #d4dfe4;background:#f7fafb}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.dano-rubro{break-inside:avoid;border-bottom:1px solid #e0e7ea;padding:5px 0}.dano-rubro-label{display:block;font-weight:bold}.dano-botones,.habgrid{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}.dano-estado,.habbtn{display:inline-block;border:1px solid #d5dde1;background:white;padding:5px;color:#62717a;font:10px Arial;border-radius:4px}.dano-estado small{display:block;font-size:8px}.dano-estado.active,.habbtn.active{border:2px solid #133f51;background:#e2eff4;color:#102f3c;font-weight:bold}.dano-estado.active:before,.habbtn.active:before{content:'[X] '}.dano-leyenda{padding:8px;background:#eef4f7}.dano-leyenda span{display:inline-block;margin:4px 9px 4px 0}.dano-leyenda strong{margin-right:4px}.pdf-caso{break-before:page}.pdf-ficha{break-before:page}.pdf-galeria figure{margin:15px 0;break-inside:avoid}.pdf-galeria img{max-width:100%;max-height:80mm;display:block;margin:auto}.pdf-galeria figcaption{margin:5px 0;font-size:10px}.pdf-fotos img{max-width:100%;max-height:80mm}.pdf-fotos figure{break-inside:avoid}.pdf-metadata,.pdf-participante,.pdf-source{padding:9px;background:#eef4f7}.pdf-source{font-size:10px;border-left:3px solid #2c7a62}.mini{font-size:10px;color:#526773}.pdf-toolbar{position:sticky;top:0;background:white;padding:12px;border:1px solid #b6ced7}.pdf-toolbar button{padding:10px;font-weight:bold;cursor:pointer}table{border-collapse:collapse;width:100%}td,th{border:1px solid #d4dfe4;padding:5px;overflow-wrap:anywhere}tr{break-inside:avoid}.croquis{max-width:100%;max-height:35mm}@media print{.pdf-toolbar{display:none}body{margin:0}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`;
function fichaCompletaExportHTML(f,ev){
 const box=document.createElement('div');box.innerHTML=danoFormHTML(f,structuredClone(ev));
 box.querySelector('#registrosDano').innerHTML=registrosDanoHTML(normalizarDano(ev));
 box.querySelectorAll('details,#draftStatus,#validationDano,#photoStatus,#fotoInput,#fotoThumbs').forEach(n=>n.remove());
 box.querySelectorAll('button:not(.dano-estado):not(.habbtn)').forEach(n=>n.remove());
 box.querySelectorAll('input,textarea,select').forEach(el=>{
  const value=document.createElement('div');value.className='pdf-value';value.dataset.sourceField=el.id;
  value.textContent=el.type==='checkbox'?(el.checked?'Sí':'No'):el.tagName==='SELECT'?(el.value?el.selectedOptions[0]?.textContent||el.value:'Sin completar'):el.value||'Sin completar';
  el.replaceWith(value);
 });
 // IDs originales quedan como trazabilidad sin duplicar identificadores entre fichas.
 box.querySelectorAll('[id]').forEach(n=>{n.dataset.sourceId=n.id;n.removeAttribute('id')});
 box.querySelectorAll('[for],[aria-labelledby]').forEach(n=>{n.removeAttribute('for');n.removeAttribute('aria-labelledby')});
 box.querySelectorAll('button').forEach(n=>{const span=document.createElement('span');span.className=n.className;span.innerHTML=n.innerHTML;for(const k of ['rubro','v'])if(n.dataset[k])span.dataset[k]=n.dataset[k];n.replaceWith(span)});
 return box.innerHTML;
}
async function fotosExportTaller(ev){
 const out=[];
 for(const item of ev.fotos||[]){
  if(typeof item==='object'){out.push(structuredClone(item));continue;}
  const ph=await Storage.get('fotos',item);if(!ph)throw new Error('Falta la fotografía '+item+'. No se ha omitido silenciosamente.');
  out.push({...ph,...ev.fotoMetadatos?.[item]});
 }
 return out;
}
async function imagenAutonomaTaller(src,cache){
 if(!src)throw new Error('Hay una imagen sin contenido.');if(src.startsWith('data:'))return src;
 // En file:// el navegador permite mostrar imágenes locales, pero bloquea fetch.
 // La impresión incorpora esas imágenes al PDF sin cambiar el origen de los borradores.
 if(location.protocol==='file:'){const url=new URL(src,location.href);if(url.protocol==='file:')return url.href;}
 if(!cache.has(src))cache.set(src,(async()=>{const r=await fetch(src);if(!r.ok)throw new Error('No se pudo cargar '+src);const blob=await r.blob();return await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob)});})());
 return cache.get(src);
}
function capturarTallerExport({casos=TALLER_CASOS,contenido='todo',evaluacion,titulo}={}){
 if(S.draft?._photosLoading)throw new Error('Espere a que terminen de procesarse las fotografías.');
 return {titulo:titulo||'Taller completo - '+casos.length+' casos',contenido,participante:structuredClone(S.perfil||{}),casos:casos.map(c=>{
  const key='TALLER-'+c.id,entradas=[];
  if(evaluacion)entradas.push({tipo:titulo||'Evaluación',ev:structuredClone(evaluacion)});
  else{
   const incluirPractica=['todo','practicas'].includes(contenido)||(contenido==='banco'&&c.tipo==='practica');
   const incluirSolucion=false;
   if(incluirPractica){
    for(const ev of evalsOf(key))entradas.push({tipo:ev.estadoRegistro==='anulada'?'Evaluación anulada (historial)':'Evaluación del participante',ev:structuredClone(ev)});
    const saved=Storage.loadDraft(key),activo=S.draft?.buildingKey===key?S.draft:null;
    const d=activo&&(saved||activo.evaluador||activo.fundamento||activo.registros?.length||Object.keys(activo.danos||{}).length)?activo:saved;
    if(d)entradas.push({tipo:'BORRADOR - no finalizado',ev:structuredClone(d)});
    if(!entradas.length){const blank=newDraft(featureTaller(c));blank.fecha='';entradas.push({tipo:'Ficha sin completar',ev:blank});}
   }
  }
  return {c:structuredClone(c),entradas};
 })};
}
async function documentoTallerExport(snapshot){
 const cache=new Map();let html='';
 for(const {c,entradas} of snapshot.casos){
  let galeria='';
  for(const r of await recursosGaleriaTaller(c)){
   // Un video no puede decodificarse dentro de <img>; el PDF usa su póster como fotograma representativo.
   const src=r.media==='video'?r.poster:(r.poster||r.src||r.dataUrl);
   galeria+=src?`<figure><img src="${attr(await imagenAutonomaTaller(src,cache))}" alt="${attr(r.titulo||'Imagen del caso')}"><figcaption><b>${esc(r.titulo||'Imagen añadida')}</b> · ${esc(r.descripcion||'')}${r.origen==='real'?`<br>Foto: ${esc(r.autor||'Autor no indicado')} · ${esc(r.licencia||'Licencia no indicada')} · <a href="${attr(r.fuente)}">fuente</a>`:''}</figcaption></figure>`:`<figure><figcaption><b>${esc(r.titulo||'Recurso añadido')}</b> · ${esc(r.descripcion||'')} · Sin fotograma imprimible.</figcaption></figure>`;
  }
  const fuentes=(c.fuentes||[]).map(f=>`<li><b>${esc(f.tipo)}:</b> ${f.url?`<a href="${attr(f.url)}">${esc(f.titulo)}</a>`:esc(f.titulo)}${f.autor?` · ${esc(f.autor)}`:''}${f.licencia?` · ${esc(f.licencia)}`:''}</li>`).join('');
  html+=`<section class="pdf-caso" data-case="${attr(c.id)}"><h1>${esc(c.id)} · ${esc(c.titulo)}</h1><p>${esc(c.nivel)} · ${esc(c.evento||'')}</p><h2>Ficha basal suministrada</h2><p>${esc(c.basal)}</p><h2>Alcance documental</h2><p>${esc(c.contexto)}</p><div class="pdf-galeria">${galeria}</div>${fuentes?`<div class="pdf-source"><b>Fuentes y licencias</b><ul>${fuentes}</ul></div>`:''}${croquisOpcional(c).replace('<details','<details open')}<h2>Evidencias del expediente</h2>${c.evidencias.map(([k,t])=>`<p><b>${esc(k)}</b> ${esc(t)}</p>`).join('')}<h2>${c.tipo==='resuelto'?'Claves de lectura':'Preguntas del caso'}</h2>${c.preguntas.map(q=>`<p>${esc(q)}</p>`).join('')}`;
  for(const {tipo,ev,razonamiento} of entradas){
   const fotos=await fotosExportTaller(ev);let media='';
   for(const ph of fotos)media+=`<figure><img src="${attr(await imagenAutonomaTaller(ph.dataUrl,cache))}" alt="${attr(ph.descripcion||'Evidencia')}"><figcaption>${esc(ph.codigo||ph.uuid)} · ${esc(ph.descripcion||'Sin descripción')}</figcaption></figure>`;
   html+=`<article class="pdf-ficha" data-record="${attr(ev.uuid)}"><h2>${esc(c.id)} · ${esc(tipo)}</h2><p class="pdf-metadata">Registro: ${esc(ev.uuid)} · ${esc(ev.estadoRegistro||'Sin finalizar')} · Revisión: ${esc(ev.revisionEstado||'Sin revisión registrada')}</p>${ev.anulacionMotivo?`<p>Motivo de anulación: ${esc(ev.anulacionMotivo)}</p>`:''}${ev.revisadaPor?`<p>Revisada por: ${esc(ev.revisadaPor)} · ${esc(ev.revisadaAt||'')}</p>`:''}${ev.revisionComentario?`<p>${esc(ev.revisionComentario)}</p>`:''}${fichaCompletaExportHTML(featureTaller(c),ev)}<h3>Fotografías de esta ficha</h3><div class="pdf-fotos">${media||'<p>Sin fotografías registradas.</p>'}</div>${razonamiento?`<h3>Razonamiento del instructor</h3><p>${esc(razonamiento)}</p>`:''}</article>`;
  }
  html+='</section>';
 }
 const p=snapshot.participante||{},participante=p.nombre||p.institucion||p.equipo?`<p class="pdf-participante"><b>Participante:</b> ${esc(p.nombre||'Sin nombre')} · <b>Institución:</b> ${esc(p.institucion||'Sin indicar')} · <b>Equipo:</b> ${esc(p.equipo||'Sin indicar')}</p>`:'';
 return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(snapshot.titulo)}</title><style>${EXPORT_TALLER_CSS}</style></head><body><div class="pdf-toolbar"><button id="printExport" disabled onclick="window.print()">Imprimir / guardar PDF</button><span id="printReady" role="status"> Preparando imágenes…</span></div><h1>${esc(snapshot.titulo)}</h1><p>ENTRENAMIENTO · FOTOGRAFÍAS DOCUMENTALES CON ATRIBUCIÓN</p>${participante}<p>Ficha completa generada desde el mismo formulario de la aplicación. Las lecturas son didácticas y se limitan a la evidencia disponible; no equivalen a inspecciones presenciales. “No determinado” y “Sin estimar” son respuestas técnicas explícitas.</p><h2>Casos incluidos</h2><ol>${snapshot.casos.map(({c})=>`<li>${esc(c.id)} · ${esc(c.titulo)}</li>`).join('')}</ol>${html}<script>Promise.all(Array.from(document.images,im=>im.decode().catch(()=>{throw new Error('No se pudo mostrar una imagen')}))).then(()=>{document.getElementById('printExport').disabled=false;document.getElementById('printReady').textContent=' Listo. Elija Guardar como PDF en la impresión.'}).catch(e=>{document.getElementById('printReady').textContent=e.message;});<\/script></body></html>`;
}
async function exportarTallerPDF(opciones={}){
 const statusBox=id('exportPDFStatus');let w;
 try{
  const snapshot=capturarTallerExport(opciones);
  w=window.open('','_blank');if(w){w.document.write('<p>Preparando la ficha completa y sus imágenes…</p>');w.document.close();}
  if(statusBox)statusBox.textContent='Preparando exportación completa…';
  await Storage._draftQueue;
  const html=await documentoTallerExport(snapshot);
  if(w&&!w.closed){w.document.open();w.document.write(html);w.document.close();}
  else download('taller_fichas_completas.html',html,'text/html;charset=utf-8');
  if(statusBox)statusBox.textContent=w&&!w.closed?'Exportación preparada. En la nueva ventana pulse Imprimir / guardar PDF.':'Se descargó el documento completo. Ábralo y pulse Imprimir / guardar PDF.';
  if(statusBox&&location.protocol==='file:')statusBox.textContent+=' Las imágenes incluidas se leen de la carpeta del taller; manténgala en su ubicación hasta guardar el PDF.';
  return html;
 }catch(err){if(w&&!w.closed){w.document.body.textContent='No se completó la exportación: '+err.message;}if(statusBox)statusBox.textContent='No se completó la exportación: '+err.message;return null;}
}
