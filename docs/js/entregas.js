// La clave publicable identifica la web; los permisos se aplican en Supabase.
let envioEnCurso=false;
function mensajeEntrega(texto){id('deliveryStatus').hidden=false;id('deliveryStatus').textContent=texto;}
async function prepararEntrega(){
 await Storage._draftQueue;
 const participante={nombre:id('participantName').value.trim(),codigoPUCP:id('participantPUCP').value.trim().toUpperCase(),institucion:id('participantInstitution').value.trim(),equipo:id('participantTeam').value.trim()};
 if(participante.nombre.length<2)throw Error('Escribe tu nombre y apellidos antes de entregar.');
 if(!/^[A-Z0-9]{1,20}$/.test(participante.codigoPUCP))throw Error('Escribe tu Código PUCP antes de entregar.');
 const respuestas=[];
 for(const c of TALLER_PRACTICAS){
  const key='TALLER-'+c.id,ev=evalsOf(key).find(e=>e.estadoRegistro!=='anulada'&&e.eventoId===c.eventoId);
  if(!ev)continue;
  const borrador=Storage.loadDraft(key);
  if(borrador){const a=JSON.parse(JSON.stringify(borrador)),b=JSON.parse(JSON.stringify(ev));for(const x of [a,b])for(const k of ['updatedAt','startedAt','estadoRegistro','version','revision'])delete x[k];
   // Evitar entregar una evaluación anterior cuando hay cambios sin finalizar.
   if(JSON.stringify(a)!==JSON.stringify(b))throw Error(etiquetaCasoTaller(c.id)+': tienes un borrador pendiente. Finaliza esa ficha antes de enviar.');
  }
  const copia=JSON.parse(JSON.stringify(ev));delete copia.fotos;delete copia.fotoMetadatos;
  const errores=validarDano(ev).errores;if(errores.length)throw Error(etiquetaCasoTaller(c.id)+': '+errores[0]);
  respuestas.push({caso:c.id,titulo:c.titulo,evaluacion:copia});
 }
 if(!respuestas.length)throw Error('Finaliza al menos una ficha con el botón de la ficha antes de entregar.');
 return {participante,respuestas};
}
async function enviarEntrega(){
 if(envioEnCurso)return;envioEnCurso=true;id('btnSendDelivery').disabled=true;
 try{
  const codigo=ENTREGAS_CONFIG.sessionCode;if(!codigo)throw Error('No está configurado el taller de destino.');
  const data=await prepararEntrega();
  const reciboKey='sismoPUCP_entrega_unica:'+codigo+':'+data.participante.codigoPUCP;
  await comprobarReciboAnterior(reciboKey,codigo);
  if(!await confirmarEntrega(data))return;
  const contenido=JSON.stringify({codigo,...data}),huella=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(contenido)))).map(x=>x.toString(16).padStart(2,'0')).join('');
  let anterior;try{anterior=JSON.parse(localStorage.getItem('sismoPUCP_ultima_entrega'))}catch{}
  const envioId=anterior?.huella===huella?anterior.id:crypto.randomUUID();
  // Se registra antes del envío para reutilizar el ID tras una interrupción.
  localStorage.setItem('sismoPUCP_ultima_entrega',JSON.stringify({huella,id:envioId}));
  mensajeEntrega('Enviando '+data.respuestas.length+' fichas…');
  const response=await fetch(ENTREGAS_CONFIG.url+'/rest/v1/rpc/enviar_taller',{method:'POST',headers:{apikey:ENTREGAS_CONFIG.key,'Content-Type':'application/json'},body:JSON.stringify({p_id:envioId,p_codigo:codigo,p_participante:data.participante,p_respuestas:data.respuestas}),signal:AbortSignal.timeout(25000)});
  const result=await response.json();if(!response.ok)throw Error(result.code==='PGRST202'?'Falta activar las tablas de entregas en Supabase.':result.message||'No se pudo registrar la entrega.');
  if(result.id!==envioId||!result.recibida_en||result.fichas!==data.respuestas.length)throw Error('No se recibió una confirmación válida. Puedes reintentar con el mismo identificador.');
  localStorage.setItem('sismoPUCP_recibo',JSON.stringify(result));
  localStorage.setItem(reciboKey,JSON.stringify(result));
  mensajeEntrega('Entrega recibida: '+result.fichas+' de '+TALLER_PRACTICAS.length+' fichas. Fecha: '+new Date(result.recibida_en).toLocaleString('es-PE',{timeZone:'America/Lima'})+'. Comprobante: '+result.id);
  mostrarResumen();id('resumenTaller').hidden=false;id('resumenTaller').scrollIntoView({behavior:'smooth',block:'start'});
 }catch(err){mensajeEntrega('No se confirmó la entrega. '+(err.name==='TimeoutError'?'La conexión tardó demasiado. Reintenta; se conservará el mismo identificador.':err.message)+' Tus respuestas siguen guardadas en este dispositivo.');}
 finally{envioEnCurso=false;id('btnSendDelivery').disabled=false;}
}
id('btnSendDelivery').onclick=enviarEntrega;
try{const r=JSON.parse(localStorage.getItem('sismoPUCP_recibo'));if(r)mensajeEntrega('Última entrega confirmada: '+r.fichas+' fichas. Comprobante: '+r.id);}catch{}

function confirmarEntrega(data){
 const dialog=id('confirmDelivery');id('confirmDeliverySummary').textContent=data.participante.nombre+' · Código PUCP '+data.participante.codigoPUCP+' · '+data.respuestas.length+' de '+TALLER_PRACTICAS.length+' fichas finalizadas. Solo se permite un envío por Código PUCP en esta sesión; después no podrás añadir ni modificar fichas.';
 return new Promise(resolve=>{let aceptar=false;const cerrar=()=>{dialog.removeEventListener('close',cerrar);resolve(aceptar)};dialog.addEventListener('close',cerrar);id('cancelDelivery').onclick=()=>dialog.close();id('acceptDelivery').onclick=()=>{aceptar=true;dialog.close()};dialog.showModal()});
}

async function comprobarReciboAnterior(reciboKey,codigo){
 const guardado=localStorage.getItem(reciboKey);if(!guardado)return;
 let recibo;try{recibo=JSON.parse(guardado)}catch{throw Error('No se pudo leer el comprobante anterior. Solicita revisión al docente.');}
 mensajeEntrega('Comprobando la entrega anterior…');
 const response=await fetch(ENTREGAS_CONFIG.url+'/rest/v1/rpc/comprobar_recibo_taller',{method:'POST',headers:{apikey:ENTREGAS_CONFIG.key,'Content-Type':'application/json'},body:JSON.stringify({p_id:recibo.id,p_codigo:codigo}),signal:AbortSignal.timeout(25000)});
 const result=await response.json();
 if(!response.ok)throw Error(result.code==='PGRST202'?'Falta activar el borrado de pruebas en Supabase. El docente debe ejecutar activar-borrado-pruebas.sql.':result.message||'No se pudo comprobar la entrega anterior.');
 if(typeof result.registrada!=='boolean')throw Error('El servidor no confirmó la vigencia del comprobante.');
 if(result.registrada)throw Error('Este Código PUCP ya tiene una entrega confirmada en esta sesión. Solo se permite un envío.');
 localStorage.removeItem(reciboKey);
 for(const key of ['sismoPUCP_recibo','sismoPUCP_ultima_entrega']){try{if(JSON.parse(localStorage.getItem(key)||'null')?.id===recibo.id)localStorage.removeItem(key)}catch{}}
 mensajeEntrega('El comprobante anterior fue eliminado. Se verificará la disponibilidad del código al enviar.');
}
