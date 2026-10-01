// Reportes imprimibles (Fase 6) — SismoLima v0.7
// Genera HTML autónomo listo para imprimir/guardar como PDF con el navegador:
//   - Ficha del edificio (identificación + basal + modelo + evaluaciones + fotos)
//   - Reporte ejecutivo del distrito (para municipalidad / COE)

const REP_CSS=`
body{font-family:Arial,Helvetica,sans-serif;color:#202124;margin:24px auto;max-width:800px;font-size:13px;line-height:1.4}
h1{font-size:20px;margin:0 0 2px}
h2{font-size:15px;border-bottom:2px solid #1a73e8;padding-bottom:3px;margin:22px 0 8px}
.sub{color:#5f6368;font-size:12px;margin-bottom:14px}
table{width:100%;border-collapse:collapse;margin:6px 0}
td,th{border:1px solid #dadce0;padding:5px 7px;text-align:left;vertical-align:top}
th{background:#f1f3f4;font-size:12px}
td.k{color:#5f6368;width:34%}
.badge{display:inline-block;padding:2px 10px;border-radius:999px;color:#fff;font-weight:bold;font-size:12px}
.record{display:inline-block;padding:2px 8px;border-radius:999px;background:#fff0cf;color:#714c00;font-weight:bold;font-size:10px}.record.off{background:#eceff1;color:#59676c}
.fotos{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.fotos figure{margin:4px;max-width:230px;break-inside:avoid}.fotos figcaption{font-size:11px;overflow-wrap:anywhere} tr{break-inside:avoid} h2,h3{break-after:avoid}
.fotos img{width:170px;height:128px;object-fit:cover;border:1px solid #dadce0;border-radius:6px}
.mini{color:#5f6368;font-size:11px}
.stat{display:flex;justify-content:space-between;border-bottom:1px solid #eee;padding:4px 2px}
.noprint{position:fixed;top:12px;right:12px}
.noprint button{padding:10px 16px;font-size:14px;border-radius:8px;border:1px solid #1a73e8;background:#1a73e8;color:#fff;cursor:pointer}
@media print{.noprint{display:none}}
@page{margin:14mm}
`;

function repAbrir(html,nombre){
  let w=window.open('','_blank');
  if(w){w.document.write(html);w.document.close()}
  else download(nombre,html,'text/html;charset=utf-8'); // popup bloqueado: descargar
}

function repFila(k,v){return v!==undefined&&String(v).trim()!==''?`<tr><td class="k">${esc(k)}</td><td>${esc(v)}</td></tr>`:''}
function repHab(h){
  let c={habitable:'#2e7d32',uso_restringido:'#f9a825',inseguro:'#c62828'}[h]||'#8a8f94';
  return`<span class="badge" style="background:${c}">${esc(HAB_LABEL[h]||'Sin evaluar')}</span>`;
}

// ---------- Ficha del edificio ----------

async function reporteEdificio(){
  let f=S.features.find(x=>x.properties.key===S.selected);
  if(!f){alert('Selecciona un edificio primero.');return}
  let p=f.properties,c=p.match?.data||{},m=getBasal(p.key),v=p.vulnEst;
  let evals=evalsOf(p.key);

  let evalsHTML='';
  for(let ev of evals){
    let evento=S.eventos.find(x=>x.uuid===ev.eventoId);
    let danos=DANO_GRUPOS.map(([titulo,items])=>{
      let filas=items.filter(([k])=>(ev.danos||{})[k]).map(([k,label])=>`<tr><td class="k">${esc(label)}</td><td>${esc(sevTitle(ev.danos[k]))}</td></tr>`).join('');
      return filas?`<tr><th colspan="2">${esc(titulo)}</th></tr>${filas}`:'';
    }).join('');
    let fotosHTML='';
    for(let fu of ev.fotos||[]){
      let ph=await Storage.get('fotos',fu).catch(()=>null);
      if(ph){const meta=ev.fotoMetadatos?.[fu]||ph;fotosHTML+=`<figure><img src="${attr(ph.dataUrl)}" alt="${attr(meta.descripcion||'Evidencia')}"><figcaption>${esc(meta.codigo||fu)} · ${esc(meta.descripcion||'Sin descripción')}</figcaption></figure>`;}
    }
    evalsHTML+=`
    <h2>Evaluación de daño — ${esc(fmtFecha(ev.fecha))} ${repHab(ev.habitabilidad)} <span class="record ${ev.estadoRegistro==='anulada'?'off':''}">${ev.estadoRegistro==='anulada'?'ANULADA':ev.revisionEstado==='revisada'?'REVISADA':'PENDIENTE DE REVISIÓN'}</span></h2>
    <table>
      ${repFila('Estado del registro',ev.estadoRegistro==='anulada'?'Anulada':'Vigente')}
      ${repFila('Motivo de anulación',ev.anulacionMotivo)}
      ${repFila('Revisión',ev.revisionEstado==='revisada'?`Revisada por ${ev.revisadaPor||'coordinador'} · ${fmtFecha(ev.revisadaAt)}`:'Pendiente')}
      ${repFila('Comentario de revisión',ev.revisionComentario)}
      ${repFila('Evento sísmico',evento?evento.nombre+(evento.magnitud?` (M${evento.magnitud})`:''):'sin evento')}
      ${repFila('Evaluador',ev.evaluador+(ev.cip?` (CIP ${ev.cip})`:''))}
      ${repFila('Tipo de evaluación',ev.tipo==='detallada'?'Detallada':'Rápida')}
      ${repFila('Alcance de inspección',ev.alcance==='interior_exterior'?'Exterior e interior':ev.alcance==='exterior'?'Solo exterior':'No registrado (ficha anterior)')}
      ${repFila('Sistema aparente y fuente',ev.sistema_observado)}
      ${repFila('Limitaciones',ev.limitaciones)}
      ${repFila('Fundamento de la decisión',ev.fundamento)}
      ${repFila('Restricciones',ev.restricciones)}
      ${repFila('Método de evaluación detallada',ev.metodo_detallado)}
      ${repFila('Revisión de alertas',ev.justificacion_alertas)}
      ${repFila('Versión de ficha',ev.schemaVersion||1)}
      ${repFila('Daño global estimado',PCT_LABEL[ev.pct_dano])}
      ${danos}
      ${repFila('Requiere barricada',ev.barricada?'SÍ':'No')}
      ${repFila('Requiere evaluación detallada',ev.eval_detallada?'SÍ':'No')}
      ${repFila('Otras medidas',ev.acciones_otras)}
      ${repFila('Observaciones',ev.observaciones)}
    </table>
    ${reporteRegistrosDano(ev)}
    ${fotosHTML?`<div class="fotos">${fotosHTML}</div>`:''}`;
  }

  let html=`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
  <title>Ficha ${esc(p.local_id)} — SismoLima</title><style>${REP_CSS}</style></head><body>
  <div class="noprint"><button onclick="print()">🖨 Imprimir / guardar PDF</button></div>
  <h1>Ficha del edificio ${esc(p.local_id)}</h1>
  <div class="sub">${esc(p.district)} · generado ${new Date().toLocaleString('es-PE')} · SismoLima v0.7</div>

  <h2>Identificación</h2>
  <table>
    ${repFila('Dirección',first(c.direccion,p.osm.address,'s/d'))}
    ${repFila('Nombre',p.osm.name)}
    ${repFila('Código catastral',c.codigo)}
    ${repFila('Uso',first(m.use,c.uso,p.osm.use))}
    ${repFila('Pisos',first(m.floors,c.pisos,p.osm.levels))}
    ${repFila('Año de construcción',first(m.year,c.anio))}
    ${repFila('Área de huella',fmt(p.area_m2)+' m²')}
    ${repFila('Suelo (microzonificación)',p.suelo||'sin asignar')}
    ${repFila('Coordenadas',p.centroid[1].toFixed(6)+', '+p.centroid[0].toFixed(6))}
    ${repFila('Clave',p.key)}
  </table>

  ${hasBasal(m)?`<h2>Ficha basal (pre-sismo)</h2>
  <table>
    ${repFila('Sistema estructural',m.structural_system.replaceAll('_',' '))}
    ${repFila('Material',m.material)}
    ${repFila('Diafragma',m.diaphragm.replaceAll('_',' '))}
    ${repFila('Condición visible',m.condition)}
    ${repFila('Sótanos',m.basements)}
    ${repFila('Altura (m)',m.height_m)}
    ${repFila('Irregularidad en planta',m.irregular_plan)}
    ${repFila('Irregularidad vertical',m.irregular_vertical)}
    ${repFila('Piso blando',m.soft_story)}
    ${repFila('Riesgo de golpeteo',m.pounding)}
    ${repFila('Elementos vulnerables',m.vulnerable_elements)}
    ${repFila('Vulnerabilidad (ingeniero)',m.vulnerability.replaceAll('_',' '))}
    ${repFila('Prioridad (ingeniero)',m.priority.replaceAll('_',' '))}
    ${repFila('Responsable',m.inspector)}
    ${repFila('Fecha de levantamiento',m.inspection_date)}
    ${repFila('Fuente',m.source)}
    ${repFila('Notas',m.notes)}
  </table>`:''}

  ${v?`<h2>Estimación del modelo</h2>
  <table>
    ${repFila('Vulnerabilidad estimada',v.vulnerabilidad.replaceAll('_',' ')+` (puntaje ${v.score}/10)`)}
    ${repFila('Prioridad sugerida',v.prioridad.replaceAll('_',' '))}
    ${repFila('Tipología',v.tipologia.replaceAll('_',' ')+` (${v.tipologiaSrc})`)}
    ${repFila('Indicios de informalidad (modelo)',v.nivelInf+` · índice heurístico ${Number(v.informalidad||0).toFixed(2)}`)}
    ${repFila('Factores',v.factores.join('; '))}
  </table>
  <div class="mini">Estimación automática de reglas para priorización; no reemplaza la evaluación del ingeniero.</div>`:''}

  ${evalsHTML||'<h2>Evaluaciones de daño</h2><p class="mini">Sin evaluaciones post-sismo registradas.</p>'}
  </body></html>`;

  repAbrir(html,`ficha_${p.local_id}_${stamp()}.html`);
  status(`Ficha imprimible de ${p.local_id} generada.`);
}

// ---------- Mini-mapa del distrito (canvas → PNG embebido) ----------
// Colorea por habitabilidad si hay evaluaciones; si no, por vulnerabilidad estimada.

function repMapaDataURL(){
  if(!S.features.length)return null;
  let hayEvals=S.features.some(f=>latestEval(f.properties.key));
  // bbox de trabajo
  let b=S.districtBoundary?.bbox;
  if(!b){
    let w=180,e=-180,s=90,n=-90;
    for(let f of S.features){let c=f.properties.centroid;if(c[0]<w)w=c[0];if(c[0]>e)e=c[0];if(c[1]<s)s=c[1];if(c[1]>n)n=c[1]}
    b={w,e,s,n};
  }
  let W=760,H=560,pad=14;
  // escala uniforme (corrige el achatamiento por latitud)
  let kx=Math.cos((b.s+b.n)/2*Math.PI/180);
  let dx=(b.e-b.w)*kx,dy=(b.n-b.s);
  let esc=Math.min((W-2*pad)/dx,(H-2*pad)/dy);
  const X=lon=>pad+((lon-b.w)*kx)*esc;
  const Y=lat=>H-pad-(lat-b.s)*esc;

  let cv=document.createElement('canvas');cv.width=W;cv.height=H;
  let ctx=cv.getContext('2d');
  ctx.fillStyle='#f6f7f9';ctx.fillRect(0,0,W,H);

  for(let f of S.features){
    let p=f.properties,color;
    if(hayEvals){
      let ev=latestEval(p.key);
      color=ev?(C['hab_'+ev.habitabilidad]||'#8a8f94'):'#c9cdd3';
    }else{
      color=p.vulnEst?VULN_COLOR[p.vulnEst.vulnerabilidad]:'#c9cdd3';
    }
    ctx.fillStyle=color;
    ctx.beginPath();
    let ring=f.geometry.coordinates[0];
    ctx.moveTo(X(ring[0][0]),Y(ring[0][1]));
    for(let i=1;i<ring.length;i++)ctx.lineTo(X(ring[i][0]),Y(ring[i][1]));
    ctx.closePath();ctx.fill();
  }
  // límite distrital
  if(S.districtBoundary?.lines){
    ctx.strokeStyle='#1a73e8';ctx.lineWidth=2;ctx.setLineDash([7,5]);
    for(let line of S.districtBoundary.lines){
      ctx.beginPath();
      ctx.moveTo(X(line[0][1]),Y(line[0][0]));
      for(let i=1;i<line.length;i++)ctx.lineTo(X(line[i][1]),Y(line[i][0]));
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }
  return{url:cv.toDataURL('image/png'),porEvals:hayEvals};
}

// ---------- Reporte ejecutivo del distrito ----------

async function reporteDistrito(){
  if(!S.features.length){alert('Carga primero los edificios del distrito.');return}
  let d=D[S.district],evento=eventoActivo();
  let n=S.features.length;

  // base
  let nBasal=0,nBasalCompleta=0,nSuelo=0,porSuelo={},nML=0,nAahh=0,conAahhDato=0,nTsunami=0,porEquip={};
  // modelo
  let porVuln={baja:0,media:0,alta:0,muy_alta:0},nInfAlta=0,conModelo=0;
  // post-sismo (evento activo)
  let nEval=0,porHab={habitable:0,uso_restringido:0,inseguro:0},nBarricada=0,nDetallada=0;
  // tipo EDAN
  let nDestruidas=0,porDia={};

  for(let f of S.features){
    let p=f.properties,m=getBasal(p.key);
    if(hasBasal(m)){nBasal++;if(basalComplete(m))nBasalCompleta++}
    if(p.suelo){nSuelo++;porSuelo[p.suelo]=(porSuelo[p.suelo]||0)+1}
    if(p.ml)nML++;
    if(p.aahh!==undefined)conAahhDato++;
    if(p.aahh===true)nAahh++;
    if(p.tsunami)nTsunami++;
    if(p.equip)porEquip[p.equip]=(porEquip[p.equip]||0)+1;
    if(p.vulnEst){conModelo++;porVuln[p.vulnEst.vulnerabilidad]++;if(p.vulnEst.nivelInf==='alta')nInfAlta++}
    let ev=latestEval(p.key);
    if(ev){
      nEval++;porHab[ev.habitabilidad]=(porHab[ev.habitabilidad]||0)+1;
      if(ev.barricada)nBarricada++;if(ev.eval_detallada)nDetallada++;
      if(ev.pct_dano==='100'||(ev.danos||{}).colapso==='total')nDestruidas++;
      let dia=String(ev.fecha||ev.updatedAt).slice(0,10);
      (porDia[dia]||(porDia[dia]={n:0,habitable:0,uso_restringido:0,inseguro:0})).n++;
      porDia[dia][ev.habitabilidad]=(porDia[dia][ev.habitabilidad]||0)+1;
    }
  }
  let calidad=typeof resumenCalidad==='function'?resumenCalidad(S.features):null;

  // top prioritarios: inseguros primero; luego por puntaje del modelo
  let prior=S.features.map(f=>({f,ev:latestEval(f.properties.key)}))
    .sort((a,b)=>{
      let ha=a.ev?.habitabilidad==='inseguro'?1:0, hb=b.ev?.habitabilidad==='inseguro'?1:0;
      if(ha!==hb)return hb-ha;
      return (b.f.properties.vulnEst?.score||0)-(a.f.properties.vulnEst?.score||0);
    }).slice(0,25);

  let filasPrior=prior.map(({f,ev},i)=>{
    let p=f.properties,m=getBasal(p.key);
    return`<tr><td>${i+1}</td><td>${esc(p.local_id)}</td><td>${esc(first(p.match?.data?.direccion,p.osm.address,'s/d'))}</td>
    <td>${esc(first(m.floors,p.osm.levels,'—'))}</td><td>${esc(p.suelo||'—')}</td>
    <td>${p.vulnEst?esc(p.vulnEst.vulnerabilidad.replaceAll('_',' '))+` (${p.vulnEst.score})`:'—'}</td>
    <td>${ev?repHab(ev.habitabilidad):'<span class="mini">sin evaluar</span>'}</td></tr>`;
  }).join('');

  let sueloHTML=Object.entries(porSuelo).sort().map(([z,c])=>`<div class="stat"><span>${esc(z)}</span><b>${fmt(c)} (${Math.round(c/n*100)}%)</b></div>`).join('');

  // mini-mapa
  let mapa=repMapaDataURL();
  let leyendaMapa=mapa&&mapa.porEvals
    ?'Verde: habitable · Amarillo: uso restringido · Rojo: inseguro · Gris claro: sin evaluar'
    :'Verde: vulnerabilidad baja · Amarillo: media · Naranja: alta · Rojo: muy alta · Gris: sin calcular';

  // evolución diaria
  let dias=Object.keys(porDia).sort();
  let evolHTML=dias.length>1?`<h2>Evolución diaria de la evaluación</h2>
  <table><tr><th>Día</th><th>Evaluados</th><th>Habitable</th><th>Uso restringido</th><th>Inseguro</th><th>Acumulado</th></tr>
  ${(()=>{let acc=0;return dias.map(d=>{acc+=porDia[d].n;return`<tr><td>${esc(d)}</td><td>${porDia[d].n}</td><td>${porDia[d].habitable||0}</td><td>${porDia[d].uso_restringido||0}</td><td>${porDia[d].inseguro||0}</td><td>${acc} (${Math.round(acc/n*100)}%)</td></tr>`}).join('')})()}
  </table>`:'';

  // resumen tipo EDAN (aproximación para el formato oficial INDECI/SINPAD)
  let edanHTML=nEval?`<h2>Resumen tipo EDAN (aproximado)</h2>
  <table>
    <tr><th>Categoría</th><th>Criterio usado</th><th>Cantidad</th></tr>
    <tr><td>Edificaciones destruidas</td><td>colapso total o daño 100%</td><td><b>${fmt(nDestruidas)}</b></td></tr>
    <tr><td>Edificaciones inhabitables</td><td>habitabilidad INSEGURO (sin las destruidas)</td><td><b>${fmt(Math.max(0,porHab.inseguro-nDestruidas))}</b></td></tr>
    <tr><td>Edificaciones afectadas</td><td>habitabilidad USO RESTRINGIDO</td><td><b>${fmt(porHab.uso_restringido)}</b></td></tr>
    <tr><td>Edificaciones habitables inspeccionadas</td><td>habitabilidad HABITABLE</td><td><b>${fmt(porHab.habitable)}</b></td></tr>
    <tr><td>Sin inspeccionar</td><td>—</td><td><b>${fmt(n-nEval)}</b></td></tr>
  </table>
  <div class="mini">Equivalencias aproximadas para facilitar el llenado del EDAN / registro SINPAD oficial;
  las definiciones normativas de INDECI prevalecen. No incluye conteo de personas ni viviendas por edificio.</div>`:'';

  let html=`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
  <title>Reporte ${esc(d.name)} — SismoLima</title><style>${REP_CSS}</style></head><body>
  <div class="noprint"><button onclick="print()">🖨 Imprimir / guardar PDF</button></div>
  <h1>Reporte ejecutivo — ${esc(d.name)}</h1>
  <div class="sub">Generado ${new Date().toLocaleString('es-PE')} · SismoLima v0.7${evento?` · Evento activo: <b>${esc(evento.nombre)}</b>${evento.magnitud?` (M${esc(evento.magnitud)})`:''}`:''}</div>

  ${mapa?`<h2>Mapa del distrito</h2>
  <img src="${mapa.url}" style="width:100%;border:1px solid #dadce0;border-radius:8px">
  <div class="mini">${leyendaMapa}. Línea azul: límite distrital.</div>`:''}

  <h2>Base de edificios</h2>
  <div class="stat"><span>Edificios en la base</span><b>${fmt(n)}</b></div>
  <div class="stat"><span>· de OpenStreetMap / dibujados</span><b>${fmt(n-nML)}</b></div>
  <div class="stat"><span>· detectados por IA (Open Buildings)</span><b>${fmt(nML)}</b></div>
  <div class="stat"><span>Fichas basales llenadas</span><b>${fmt(nBasal)} (${Math.round(nBasal/n*100)}%)</b></div>
  <div class="stat"><span>· completas (≥80% de campos clave)</span><b>${fmt(nBasalCompleta)}</b></div>
  ${conAahhDato?`<div class="stat"><span>En asentamientos humanos (capa oficial)</span><b>${fmt(nAahh)} (${Math.round(nAahh/n*100)}%)</b></div>`:''}
  ${nTsunami?`<div class="stat"><span>⚠️ En zona de inundación por tsunami (DHN)</span><b>${fmt(nTsunami)}</b></div>`:''}
  ${Object.keys(porEquip).length?`<div class="stat"><span>Equipamientos críticos</span><b>${Object.entries(porEquip).map(([t,c])=>`${EQUIP_LABEL[t]||t}: ${c}`).join(' · ')}</b></div>`:''}

  <h2>Suelos (microzonificación CISMID)</h2>
  <div class="stat"><span>Con zona asignada</span><b>${fmt(nSuelo)} (${Math.round(nSuelo/n*100)}%)</b></div>
  ${sueloHTML||'<p class="mini">Sin asignaciones de suelo.</p>'}

  <h2>Vulnerabilidad estimada (modelo)</h2>
  ${conModelo?`
  <div class="stat"><span>Baja</span><b>${fmt(porVuln.baja)}</b></div>
  <div class="stat"><span>Media</span><b>${fmt(porVuln.media)}</b></div>
  <div class="stat"><span>Alta</span><b>${fmt(porVuln.alta)}</b></div>
  <div class="stat"><span>Muy alta</span><b>${fmt(porVuln.muy_alta)}</b></div>
  <div class="stat"><span>Con indicios fuertes de vivienda informal</span><b>${fmt(nInfAlta)}</b></div>
  <div class="mini">Modelo de reglas (suelo × tipología × pisos × año × informalidad); estimación para priorización.</div>`
  :'<p class="mini">Modelo aún no calculado.</p>'}

  <h2>Evaluación post-sismo${evento?` — ${esc(evento.nombre)}`:''}</h2>
  ${nEval?`
  <div class="stat"><span>Edificios evaluados</span><b>${fmt(nEval)} de ${fmt(n)} (${Math.round(nEval/n*100)}%)</b></div>
  <div class="stat"><span>${repHab('habitable')}</span><b>${fmt(porHab.habitable)}</b></div>
  <div class="stat"><span>${repHab('uso_restringido')}</span><b>${fmt(porHab.uso_restringido)}</b></div>
  <div class="stat"><span>${repHab('inseguro')}</span><b>${fmt(porHab.inseguro)}</b></div>
  <div class="stat"><span>Requieren barricada</span><b>${fmt(nBarricada)}</b></div>
  <div class="stat"><span>Requieren evaluación detallada</span><b>${fmt(nDetallada)}</b></div>`
  :'<p class="mini">Sin evaluaciones de daño registradas para el evento activo.</p>'}

  ${calidad&&calidad.evaluadas?`<h2>Calidad y revisión</h2>
  <div class="stat"><span>Pendientes de revisión</span><b>${fmt(calidad.porRevisar)}</b></div>
  <div class="stat"><span>Revisadas por coordinación</span><b>${fmt(calidad.revisadas)}</b></div>
  <div class="stat"><span>Con observaciones documentales</span><b>${fmt(calidad.observaciones)}</b></div>
  <div class="stat"><span>Tiempo medio registrado</span><b>${calidad.tiempo==null?'—':fmt(calidad.tiempo)+' min'}</b></div>
  <div class="stat"><span>Coincidencia entre evaluaciones comparables</span><b>${calidad.comparables?Math.round(calidad.acuerdos/calidad.comparables*100)+'% ('+calidad.comparables+')':'—'}</b></div>
  <div class="mini">Las observaciones documentales señalan fichas históricas sin alcance, fundamento o registro suficiente. La coincidencia no sustituye la revisión técnica.</div>`:''}

  ${evolHTML}
  ${edanHTML}

  ${(()=>{
    let secs=(typeof sectoresDistrito==='function')?sectoresDistrito():[];
    if(!secs.length)return'';
    let filas=secs.map(s=>{
      let prog=progresoSector(s.uuid),pct=prog.total?Math.round(prog.eval/prog.total*100):0,q=resumenCalidad(S.features.filter(f=>f.properties.sector===s.uuid));
      return`<tr><td><span class="badge" style="background:${s.color}">&nbsp;</span> ${esc(s.nombre)}</td><td>${esc(s.brigada||'—')}</td><td>${fmt(prog.total)}</td><td>${fmt(prog.eval)}</td><td>${pct}%</td><td>${fmt(q.porRevisar)}</td><td>${fmt(q.observaciones)}</td><td>${q.tiempo==null?'—':fmt(q.tiempo)+' min'}</td></tr>`;
    }).join('');
    let sinSec=S.features.filter(f=>!f.properties.sector).length;
    return`<h2>Avance por sector / brigada</h2>
    <table><tr><th>Sector</th><th>Brigada</th><th>Edificios</th><th>Evaluados</th><th>Avance</th><th>Por revisar</th><th>Observaciones</th><th>Tiempo</th></tr>${filas}</table>
    <div class="mini">Edificios sin sector asignado: ${fmt(sinSec)}.</div>`;
  })()}

  <h2>Top 25 edificios prioritarios</h2>
  <table><tr><th>#</th><th>Código</th><th>Dirección</th><th>Pisos</th><th>Suelo</th><th>Vuln. estimada</th><th>Post-sismo</th></tr>${filasPrior}</table>
  <div class="mini">Orden: primero inseguros (evaluación de campo), luego por puntaje del modelo.</div>
  </body></html>`;

  repAbrir(html,`reporte_${S.district}_${stamp()}.html`);
  status(`Reporte ejecutivo de ${d.name} generado.`);
}

function reporteRegistrosDano(ev){return (ev.registros||[]).map((r,i)=>`<h3>Daño ${i+1} — ${esc(r.elemento)}</h3><table>${repFila('Ubicación',r.ubicacion)}${repFila('Rubro',DANO_GRUPOS.flatMap(([,a])=>a).find(([k])=>k===r.rubro)?.[1]||r.rubro)}${repFila('Patrón y extensión',r.patron)}${repFila('Medición',r.medicion||'No medida')}${repFila('Mecanismo probable',r.mecanismo)}${repFila('Severidad',sevTitle(r.severidad))}${repFila('Evidencia',r.evidencia)}</table>`).join('')}
