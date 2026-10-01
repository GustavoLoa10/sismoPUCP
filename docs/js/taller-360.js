// Visor local de panoramas equirectangulares completos (2:1).
let cerrarPanoramaTaller=null;
async function agregarPanoramasTaller(c,files){
 let ok=0;const errores=[];
 for(const file of [...files].slice(0,12)){
  try{
   const dataUrl=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error('No se pudo leer el archivo'));r.readAsDataURL(file)});
   const im=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('Use una imagen JPG, PNG o WebP'));i.src=dataUrl});
   if(Math.abs(im.width/im.height-2)>.05)throw new Error('Se requiere una panorámica completa equirectangular 2:1 (por ejemplo, 6000 × 3000)');
   const rid=`personalizada:${c.id}:${uuid()}`;
   await Storage.put('recursos_taller',{id:rid,caseId:c.id,tipo:'personalizada',media:'panorama',dataUrl,titulo:'Panorámica 360° · '+file.name,descripcion:'Fotografía 360° equirectangular. En PDF se incluye la imagen panorámica desplegada.',orden:Date.now(),createdAt:nowISO()});
   GALERIA_TALLER.activa[c.id]=rid;ok++;
  }catch(e){errores.push(file.name+': '+e.message)}
 }
 if(casoActivo()?.id===c.id){await renderGaleriaTaller(c);id('galleryStatus').textContent=`${ok} panorámica(s) guardada(s). ${errores.join(' · ')}`}
}
function abrirPanoramaTaller(r){
 cerrarPanoramaTaller?.();
 const dialog=document.createElement('dialog');dialog.className='panorama-dialog';dialog.setAttribute('aria-label','Visor de fotografía 360 grados');
 dialog.innerHTML=`<header><b>${esc(r.titulo||'Fotografía 360°')}</b><button data-close aria-label="Cerrar visor 360">Cerrar ×</button></header><canvas tabindex="0" aria-label="Panorama 360. Arrastre para mirar alrededor. Flechas para girar y teclas más y menos para zoom."></canvas><p role="status">Arrastre para mirar alrededor. Use las flechas o los botones para girar.</p><footer><button data-action="left" aria-label="Mirar a la izquierda">←</button><button data-action="right" aria-label="Mirar a la derecha">→</button><button data-action="up" aria-label="Mirar arriba">↑</button><button data-action="down" aria-label="Mirar abajo">↓</button><button data-action="in">Acercar +</button><button data-action="out">Alejar −</button><button data-action="reset">Centrar</button><button data-action="light">Iluminar interior</button><button data-action="full">Pantalla completa</button></footer>`;
 const pantalla=document.createElement('div');pantalla.className='panorama-shell';pantalla.append(...dialog.childNodes);dialog.append(pantalla);
 document.body.append(dialog);dialog.showModal();
 const canvas=dialog.querySelector('canvas'),status=dialog.querySelector('[role=status]'),gl=canvas.getContext('webgl');let disposed=false,texture,program,buffer,observer;
 const clean=()=>{if(disposed)return;disposed=true;document.removeEventListener('fullscreenchange',actualizarPantalla);observer?.disconnect();if(gl){if(texture)gl.deleteTexture(texture);if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program)}dialog.remove();if(cerrarPanoramaTaller===clean)cerrarPanoramaTaller=null};cerrarPanoramaTaller=clean;
 const actualizarPantalla=()=>{const active=document.fullscreenElement===pantalla;const b=dialog.querySelector('[data-action=full]');b.textContent=active?'Salir de pantalla completa':'Pantalla completa';b.setAttribute('aria-pressed',String(active))};
 document.addEventListener('fullscreenchange',actualizarPantalla);
 const cerrar=async()=>{if(document.fullscreenElement===pantalla)try{await document.exitFullscreen()}catch{}dialog.close()};
 dialog.onclose=clean;dialog.querySelector('[data-close]').onclick=cerrar;dialog.oncancel=e=>{e.preventDefault();cerrar()};
 if(!gl){status.textContent='El visor 360 requiere WebGL. La imagen original sigue disponible en la galería.';return}
 try{
  function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error('No se pudo preparar el visor');return s}
  const vs=shader(gl.VERTEX_SHADER,'attribute vec2 p;varying vec2 q;void main(){q=p;gl_Position=vec4(p,0.,1.);}');
  const fs=shader(gl.FRAGMENT_SHADER,`precision mediump float;varying vec2 q;uniform sampler2D tex;uniform float yaw;uniform float pitch;uniform float zoom;uniform float aspect;uniform float dual;uniform float single;uniform float light;void main(){vec3 d=normalize(vec3(q.x*aspect*zoom,q.y*zoom,1.));float cp=cos(pitch),sp=sin(pitch);d=vec3(d.x,d.y*cp+d.z*sp,-d.y*sp+d.z*cp);float cy=cos(yaw),sy=sin(yaw);d=vec3(d.x*cy+d.z*sy,d.y,-d.x*sy+d.z*cy);vec2 uv=vec2(fract(atan(d.x,d.z)/6.2831853+.5),.5-asin(clamp(d.y,-1.,1.))/3.14159265);if(dual>.5){bool back=d.z<0.;float theta=acos(clamp(abs(d.z),0.,1.));float radius=theta/1.57079633*.485;float n=max(length(d.xy),.00001);uv=vec2((back?.75:.25)+(back?-d.x:d.x)/n*radius*.5,.5-d.y/n*radius);}if(single>.5){if(d.z<=0.){gl_FragColor=vec4(.09,.13,.15,1.);return;}float theta=acos(clamp(d.z,0.,1.));float radius=theta/1.57079633*.485;float n=max(length(d.xy),.00001);uv=vec2(.5+d.x/n*radius,.5-d.y/n*radius);}gl_FragColor=vec4(clamp(texture2D(tex,uv).rgb*light,0.,1.),1.);}`);
  program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('No se pudo iniciar el visor');gl.useProgram(program);
  buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  gl.uniform1f(gl.getUniformLocation(program,'dual'),r.projection==='dual-fisheye'?1:0);
  const single=r.projection==='single-fisheye';gl.uniform1f(gl.getUniformLocation(program,'single'),single?1:0);
  if(single){dialog.setAttribute('aria-label','Visor de imagen de una lente');canvas.setAttribute('aria-label','Vista parcial. Arrastre para explorar el campo fotografiado.');status.textContent='Una lente ojo de pez: campo parcial, no 360° completo. Proyección aproximada; no permite medir daños. Arrastre para explorar.';}
  if(r.projection==='dual-fisheye')status.textContent='Dos lentes ojo de pez. Proyección aproximada, sin cosido calibrado; revise las uniones con la imagen original. Arrastre para explorar.';
  let yaw=r.projection==='dual-fisheye'?Math.PI:0,pitch=0,fov=75,light=r.initialLight||1,ready=false;
  if(light>1)dialog.querySelector('[data-action="light"]').textContent='Luz original';
  const uniforms=Object.fromEntries(['yaw','pitch','zoom','aspect','light'].map(k=>[k,gl.getUniformLocation(program,k)]));
  function draw(){if(disposed||!ready)return;const rect=canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(rect.width*ratio));canvas.height=Math.max(1,Math.round(rect.height*ratio));gl.viewport(0,0,canvas.width,canvas.height);pitch=Math.max(single?-.65:-1.5,Math.min(single?.65:1.5,pitch));if(single)yaw=Math.max(-.65,Math.min(.65,yaw));fov=Math.max(30,Math.min(single?90:110,fov));gl.uniform1f(uniforms.light,light);gl.uniform1f(uniforms.yaw,yaw);gl.uniform1f(uniforms.pitch,pitch);gl.uniform1f(uniforms.zoom,Math.tan(fov*Math.PI/360));gl.uniform1f(uniforms.aspect,canvas.width/canvas.height);gl.drawArrays(gl.TRIANGLES,0,6);canvas.dataset.yaw=String(yaw);canvas.dataset.fov=String(fov)}
  const im=new Image();im.onload=()=>{if(disposed)return;try{const max=Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE),8192);let source=im;if(im.width>max||im.height>max){const scale=Math.min(max/im.width,max/im.height),temp=document.createElement('canvas');temp.width=Math.round(im.width*scale);temp.height=Math.round(im.height*scale);temp.getContext('2d').drawImage(im,0,0,temp.width,temp.height);source=temp}texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);ready=true;canvas.dataset.ready='true';draw();canvas.focus()}catch(e){status.textContent='No se pudo mostrar la panorámica: '+e.message}};im.onerror=()=>{status.textContent='No se pudo cargar la panorámica.'};im.src=r.dataUrl||r.src;
  observer=new ResizeObserver(draw);observer.observe(canvas);
  let drag=null;canvas.onpointerdown=e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)};canvas.onpointermove=e=>{if(!drag)return;yaw-=(e.clientX-drag.x)*.005;pitch+=(e.clientY-drag.y)*.005;drag={x:e.clientX,y:e.clientY};draw()};canvas.onpointerup=canvas.onpointercancel=()=>{drag=null};canvas.addEventListener('wheel',e=>{e.preventDefault();fov+=e.deltaY*.04;draw()},{passive:false});
  function action(a){if(a==='light'){light=light===1?2.5:1;dialog.querySelector('[data-action=light]').textContent=light===1?'Iluminar interior':'Luz original'}if(a==='left')yaw-=.15;if(a==='right')yaw+=.15;if(a==='up')pitch+=.12;if(a==='down')pitch-=.12;if(a==='in')fov-=10;if(a==='out')fov+=10;if(a==='reset'){yaw=r.projection==='dual-fisheye'?Math.PI:0;pitch=0;fov=75}draw()}
  canvas.onkeydown=e=>{const a={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'in','=':'in','-':'out',Home:'reset'}[e.key];if(a){e.preventDefault();action(a)}};
  dialog.querySelector('footer').onclick=async e=>{const a=e.target.closest('[data-action]')?.dataset.action;if(a==='full'){try{if(document.fullscreenElement===pantalla)await document.exitFullscreen();else await pantalla.requestFullscreen()}catch{status.textContent='Pantalla completa no disponible en este navegador.'}}else action(a)};
 }catch(e){status.textContent=e.message}
}
