// Utilidades compartidas — SismoLima v0.6
function id(x){return document.getElementById(x)}
function esc(s){return String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function attr(s){return esc(s).replaceAll('\n',' ')}
function csvq(v){let s=String(v??'');return /[",\n]/.test(s)?`"${s.replaceAll('"','""')}"`:s}
function download(name,text,mime){let blob=new Blob([text],{type:mime}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
function first(...a){for(let x of a)if(x!==undefined&&x!==null&&String(x).trim()!=='')return x;return''}
function low(x){return String(x||'').toLowerCase()}
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w\s.-]/g,' ').replace(/\s+/g,' ').trim()}
function normAddr(s){return norm(s).replace(/\b(av|av\.|avenida)\b/g,'avenida').replace(/\b(jr|jr\.|jiron)\b/g,'jiron').replace(/\b(nro|numero|n|num)\b/g,'').replace(/\s+/g,' ').trim()}
function num(x){if(x==null||String(x).trim()==='')return NaN;return Number(String(x).replace(',','.').replace(/[^\d.-]/g,''))}
function fmt(n){return n===''||n==null||Number.isNaN(Number(n))?'—':Number(n).toLocaleString('es-PE')}
function today(){return new Date().toISOString().slice(0,10)}
function nowISO(){return new Date().toISOString()}
function nowLocal(){let d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)}
function stamp(){return new Date().toISOString().slice(0,19).replaceAll(':','-')}
function uuid(){return (crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{let r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);return v.toString(16)}))}
function pii(k){let n=norm(k);return['dni','ruc','propietario','contribuyente','telefono','correo','email'].some(x=>n.includes(x))}
function opts(arr,v){return arr.map(([x,t])=>`<option value="${attr(x)}" ${String(x)===String(v||'')?'selected':''}>${esc(t)}</option>`).join('')}
function status(t){id('status').textContent=t}
function fmtFecha(iso){if(!iso)return 's/f';try{return new Date(iso).toLocaleString('es-PE',{dateStyle:'short',timeStyle:'short'})}catch{return iso}}
function noise(seed){let s=String(seed),h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24)}return((h>>>0)%100000)/100000}
function debounce(fn,ms){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}}
