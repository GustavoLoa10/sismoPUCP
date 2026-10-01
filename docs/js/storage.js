// Capa de persistencia local (IndexedDB) — SismoLima v0.6
// API async: la fase 2 puede implementar esta misma interfaz contra una BD
// compartida (p. ej. Supabase) sin tocar el resto de la aplicación.

const Storage={
  _db:null,
  DB_NAME:globalThis.SISMO_TALLER?'sismoPUCP_alumnos_v1':'sismolima_v06', // mismo nombre que v0.6 para conservar los datos
  DB_VER:12,               // v9 borradores/fotos; v10 conflictos; v11 historial; v12 galería del taller

  open(){
    if(this._db)return Promise.resolve(this._db);
    return new Promise((res,rej)=>{
      const rq=indexedDB.open(this.DB_NAME,this.DB_VER);
      rq.onupgradeneeded=e=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains('borradores'))db.createObjectStore('borradores',{keyPath:'buildingKey'});
        if(!db.objectStoreNames.contains('eventos'))db.createObjectStore('eventos',{keyPath:'uuid'});
        if(!db.objectStoreNames.contains('basal'))db.createObjectStore('basal',{keyPath:'key'});
        if(!db.objectStoreNames.contains('evaluaciones')){
          const st=db.createObjectStore('evaluaciones',{keyPath:'uuid'});
          st.createIndex('building','buildingKey',{unique:false});
        }
        if(!db.objectStoreNames.contains('fotos'))db.createObjectStore('fotos',{keyPath:'uuid'});
        if(!db.objectStoreNames.contains('geom'))db.createObjectStore('geom',{keyPath:'key'});
        if(!db.objectStoreNames.contains('edificios')){
          const st=db.createObjectStore('edificios',{keyPath:'key'});
          st.createIndex('district','district',{unique:false});
        }
        if(!db.objectStoreNames.contains('limites'))db.createObjectStore('limites',{keyPath:'district'});
        if(!db.objectStoreNames.contains('suelos'))db.createObjectStore('suelos',{keyPath:'id'});
        if(!db.objectStoreNames.contains('aahh'))db.createObjectStore('aahh',{keyPath:'id'});
        if(!db.objectStoreNames.contains('amenazas'))db.createObjectStore('amenazas',{keyPath:'id'});
        if(!db.objectStoreNames.contains('sectores')){
          const st=db.createObjectStore('sectores',{keyPath:'uuid'});
          st.createIndex('district','district',{unique:false});
        }
        if(!db.objectStoreNames.contains('sync_queue'))db.createObjectStore('sync_queue',{keyPath:'id'});
        if(!db.objectStoreNames.contains('conflictos'))db.createObjectStore('conflictos',{keyPath:'id'});
        if(!db.objectStoreNames.contains('auditoria'))db.createObjectStore('auditoria',{keyPath:'id'});
        if(!db.objectStoreNames.contains('recursos_taller'))db.createObjectStore('recursos_taller',{keyPath:'id'});
      };
      rq.onsuccess=()=>{this._db=rq.result;this._db.onversionchange=()=>{this._db.close();this._db=null};res(this._db)};
      rq.onerror=()=>rej(rq.error);
      rq.onblocked=()=>{if(typeof status==='function')status('Cierra otras pestañas de SismoLima para actualizar la base local.');};
    });
  },

  _tx(store,mode,fn){
    return this.open().then(db=>new Promise((res,rej)=>{
      const tx=db.transaction(store,mode);
      const out=fn(tx.objectStore(store));
      tx.oncomplete=()=>res(out&&out.result!==undefined?out.result:out);
      tx.onerror=tx.onabort=()=>rej(tx.error);
    }));
  },

  put(store,obj){return this._tx(store,'readwrite',st=>st.put(obj))},
  bulkPut(store,arr){return this._tx(store,'readwrite',st=>{arr.forEach(o=>st.put(o))})},
  get(store,key){
    return this.open().then(db=>new Promise((res,rej)=>{
      const rq=db.transaction(store).objectStore(store).get(key);
      rq.onsuccess=()=>res(rq.result||null);rq.onerror=()=>rej(rq.error);
    }));
  },
  all(store){
    return this.open().then(db=>new Promise((res,rej)=>{
      const rq=db.transaction(store).objectStore(store).getAll();
      rq.onsuccess=()=>res(rq.result||[]);rq.onerror=()=>rej(rq.error);
    }));
  },
  del(store,key){return this._tx(store,'readwrite',st=>st.delete(key))},
  clearStore(store){return this._tx(store,'readwrite',st=>st.clear())},
  allByIndex(store,index,value){
    return this.open().then(db=>new Promise((res,rej)=>{
      const rq=db.transaction(store).objectStore(store).index(index).getAll(value);
      rq.onsuccess=()=>res(rq.result||[]);rq.onerror=()=>rej(rq.error);
    }));
  },
  // escritura por lotes para volúmenes grandes (base de edificios)
  async putChunks(store,arr,chunk=4000){
    for(let i=0;i<arr.length;i+=chunk)await this.bulkPut(store,arr.slice(i,i+chunk));
  },

  async wipeAll(){
    await this._draftQueue.catch(()=>{});this._draftCache={};
    for(const s of['eventos','basal','evaluaciones','fotos','geom','edificios','limites','suelos','aahh','amenazas','sectores','sync_queue','borradores','conflictos','auditoria','recursos_taller'])await this.clearStore(s);
  },

  // Identificador estable de este dispositivo/navegador (para trazabilidad y merge)
  deviceId(){
    let d=localStorage.getItem('sl6_device');
    if(!d){d=uuid();localStorage.setItem('sl6_device',d)}
    return d;
  },

  // Migración única desde v0.5 (fichas basales en localStorage)
  async migrateV05(){
    if(localStorage.getItem('sl6_migrated_v05'))return 0;
    let old;
    try{old=JSON.parse(localStorage.getItem('sismolima_v05_manual')||'{}')}catch{old={}}
    const keys=Object.keys(old);
    if(keys.length){
      const existing=await this.all('basal');
      const have=new Set(existing.map(b=>b.key));
      const recs=keys.filter(k=>!have.has(k)).map(k=>({key:k,...old[k],updatedAt:old[k].updated_at||nowISO(),deviceId:this.deviceId()}));
      if(recs.length)await this.bulkPut('basal',recs);
    }
    localStorage.setItem('sl6_migrated_v05','1');
    return keys.length;
  },

  // Caché síncrona de lectura y cola de escritura persistente, con fotos en IndexedDB.
  _draftCache:{}, _draftQueue:Promise.resolve(),
  draftKey(buildingKey){return 'sl6_draft_'+buildingKey},
  async initDrafts(){
    this._draftCache=Object.fromEntries((await this.all('borradores')).map(d=>[d.buildingKey,d]));
    if(globalThis.SISMO_TALLER)return;
    for(const key of Object.keys(localStorage).filter(k=>k.startsWith('sl6_draft_'))){
      try{const d=JSON.parse(localStorage.getItem(key));if(d?.buildingKey){if(!this._draftCache[d.buildingKey])await this.saveDraft(d.buildingKey,d);localStorage.removeItem(key);}}
      catch(e){if(typeof status==='function')status('No se pudo migrar un borrador antiguo. Se conserva el original.');}
    }
  },
  saveDraft(buildingKey,data){
    const snapshot=JSON.parse(JSON.stringify({...data,buildingKey}));delete snapshot._photosLoading;
    this._draftCache[buildingKey]=snapshot;
    const op=this._draftQueue.catch(()=>{}).then(()=>this.put('borradores',snapshot));
    this._draftQueue=op;return op;
  },
  loadDraft(buildingKey){return this._draftCache[buildingKey]?JSON.parse(JSON.stringify(this._draftCache[buildingKey])):null},
  clearDraft(buildingKey){
    delete this._draftCache[buildingKey];
    const op=this._draftQueue.catch(()=>{}).then(()=>this.del('borradores',buildingKey));
    this._draftQueue=op;return op;
  },
  async saveInspection(rec,photos){
    const db=await this.open();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(['evaluaciones','fotos','borradores'],'readwrite');
      tx.oncomplete=()=>{delete this._draftCache[rec.buildingKey];resolve()};
      tx.onerror=tx.onabort=()=>reject(tx.error||new Error('No se pudo guardar la evaluación completa.'));
      try{
        tx.objectStore('evaluaciones').put(rec);
        for(const ph of photos)tx.objectStore('fotos').put({...ph,buildingKey:rec.buildingKey,evalUuid:rec.uuid,updatedAt:rec.updatedAt});
        tx.objectStore('borradores').delete(rec.buildingKey);
      }catch(err){tx.abort();reject(err)}
    });
  }
};
