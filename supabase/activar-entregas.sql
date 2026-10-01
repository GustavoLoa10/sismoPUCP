-- Ejecutar una vez en Supabase > SQL Editor. No contiene contraseñas.
begin;
create table if not exists public.taller_docentes (
 user_id uuid primary key references auth.users(id) on delete cascade
);
create table if not exists public.taller_sesiones (
 id uuid primary key default gen_random_uuid(),
 nombre text not null check (char_length(nombre) between 1 and 120),
 codigo text not null unique check (char_length(codigo) between 8 and 40),
 activa boolean not null default true,
 creada_en timestamptz not null default now()
);
create table if not exists public.taller_entregas (
 id uuid primary key,
 sesion_id uuid not null references public.taller_sesiones(id),
 recibida_en timestamptz not null default now(),
 participante jsonb not null,
 respuestas jsonb not null,
 constraint participante_objeto check (jsonb_typeof(participante)='object'),
 constraint respuestas_lista check (jsonb_typeof(respuestas)='array')
);
alter table public.taller_docentes enable row level security;
alter table public.taller_sesiones enable row level security;
alter table public.taller_entregas enable row level security;
revoke all on public.taller_docentes,public.taller_sesiones,public.taller_entregas from anon,authenticated;
grant select on public.taller_docentes,public.taller_entregas to authenticated;
grant select,insert,update on public.taller_sesiones to authenticated;
drop policy if exists docente_propio on public.taller_docentes;
create policy docente_propio on public.taller_docentes for select to authenticated using (user_id=(select auth.uid()));
drop policy if exists docente_entregas on public.taller_entregas;
create policy docente_entregas on public.taller_entregas for select to authenticated using (exists(select 1 from public.taller_docentes where user_id=(select auth.uid())));
drop policy if exists docente_sesiones on public.taller_sesiones;
create policy docente_sesiones on public.taller_sesiones for all to authenticated using (exists(select 1 from public.taller_docentes where user_id=(select auth.uid()))) with check (exists(select 1 from public.taller_docentes where user_id=(select auth.uid())));

-- Reserva permanente de un envío por Código PUCP y sesión.
-- Conserva todas las entregas previas; no borra ni reemplaza respuestas.
create table if not exists public.taller_codigos_enviados (
 sesion_id uuid not null references public.taller_sesiones(id),
 codigo_pucp text not null,
 entrega_id uuid not null,
 primary key (sesion_id,codigo_pucp)
);
alter table public.taller_codigos_enviados enable row level security;
revoke all on public.taller_codigos_enviados from public,anon,authenticated;
insert into public.taller_codigos_enviados(sesion_id,codigo_pucp,entrega_id)
select distinct on (sesion_id,upper(btrim(participante->>'codigoPUCP')))
 sesion_id,upper(btrim(participante->>'codigoPUCP')),id
from public.taller_entregas
where coalesce(btrim(participante->>'codigoPUCP'),'')<>''
order by sesion_id,upper(btrim(participante->>'codigoPUCP')),recibida_en,id
on conflict (sesion_id,codigo_pucp) do nothing;

create or replace function public.enviar_taller(p_id uuid,p_codigo text,p_participante jsonb,p_respuestas jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_sesion uuid; v_fila public.taller_entregas%rowtype; r jsonb; v_n integer; v_codigo_pucp text; v_reserva uuid;
begin
 if p_id is null or p_codigo is null or char_length(p_codigo)>40 then raise exception 'Identificador o código inválido'; end if;
 select id into v_sesion from public.taller_sesiones where codigo=p_codigo and activa;
 if v_sesion is null then raise exception 'Código de sesión incorrecto o sesión cerrada'; end if;
 if p_participante is null or jsonb_typeof(p_participante)<>'object' or coalesce(char_length(btrim(p_participante->>'nombre')),0) not between 2 and 120 or coalesce(char_length(p_participante->>'institucion'),0)>120 or coalesce(char_length(p_participante->>'equipo'),0)>80 or octet_length(p_participante::text)>4000 then raise exception 'Datos del participante inválidos'; end if;
 v_codigo_pucp=upper(btrim(p_participante->>'codigoPUCP'));
 if v_codigo_pucp is null or v_codigo_pucp !~ '^[A-Z0-9]{1,20}$' then raise exception 'Código PUCP inválido'; end if;
 p_participante=jsonb_set(p_participante,'{codigoPUCP}',to_jsonb(v_codigo_pucp));
 if p_respuestas is null or jsonb_typeof(p_respuestas)<>'array' then raise exception 'Respuestas inválidas'; end if;
 v_n=jsonb_array_length(p_respuestas);
 if v_n not between 1 and 12 or octet_length(p_respuestas::text)>200000 then raise exception 'Envíe entre una y doce fichas, sin archivos adjuntos'; end if;
 if (select count(distinct e->>'caso') from jsonb_array_elements(p_respuestas) e)<>v_n then raise exception 'Casos repetidos'; end if;
 for r in select value from jsonb_array_elements(p_respuestas) loop
  if jsonb_typeof(r)<>'object' or coalesce(r->>'caso','') not in ('T01','T02','T03','T04','T05','T06','T07','T08','T09','T10','T11','T12') or coalesce(jsonb_typeof(r->'evaluacion'),'')<>'object' or coalesce(r->'evaluacion'->>'habitabilidad','') not in ('habitable','uso_restringido','inseguro') or coalesce(r->'evaluacion'->>'alcance','') not in ('exterior','interior_exterior') or coalesce(char_length(btrim(r->'evaluacion'->>'evaluador')),0)=0 or coalesce(char_length(btrim(r->'evaluacion'->>'fundamento')),0)=0 or coalesce(char_length(btrim(r->'evaluacion'->>'sistema_observado')),0)=0 then raise exception 'Hay una ficha inválida o sin finalizar'; end if;
  if r->'evaluacion' ? 'fotos' then raise exception 'Las fotografías no se incluyen en esta entrega'; end if;
 end loop;
 -- Reintentos de la misma entrega devuelven el comprobante sin crear otro envío.
 select * into v_fila from public.taller_entregas where id=p_id;
 if found then
  if v_fila.sesion_id<>v_sesion or v_fila.participante<>p_participante or v_fila.respuestas<>p_respuestas then raise exception 'El identificador ya pertenece a otra entrega'; end if;
  return jsonb_build_object('id',v_fila.id,'recibida_en',v_fila.recibida_en,'fichas',jsonb_array_length(v_fila.respuestas));
 end if;
 insert into public.taller_codigos_enviados(sesion_id,codigo_pucp,entrega_id)
 values(v_sesion,v_codigo_pucp,p_id)
 on conflict(sesion_id,codigo_pucp) do nothing
 returning entrega_id into v_reserva;
 if v_reserva is null then
  -- Si dos reintentos idénticos llegaron juntos, la reserva espera al primero.
  select * into v_fila from public.taller_entregas where id=p_id;
  if found and v_fila.sesion_id=v_sesion and v_fila.participante=p_participante and v_fila.respuestas=p_respuestas then
   return jsonb_build_object('id',v_fila.id,'recibida_en',v_fila.recibida_en,'fichas',jsonb_array_length(v_fila.respuestas));
  end if;
  raise exception using errcode='P0001',message='Este Código PUCP ya tiene una entrega en esta sesión. Solo se permite un envío.';
 end if;
 insert into public.taller_entregas(id,sesion_id,participante,respuestas) values(p_id,v_sesion,p_participante,p_respuestas) on conflict(id) do nothing;
 select * into v_fila from public.taller_entregas where id=p_id;
 if v_fila.sesion_id<>v_sesion or v_fila.participante<>p_participante or v_fila.respuestas<>p_respuestas then raise exception 'El identificador ya pertenece a otra entrega'; end if;
 return jsonb_build_object('id',v_fila.id,'recibida_en',v_fila.recibida_en,'fichas',jsonb_array_length(v_fila.respuestas));
end;
$$;
revoke all on function public.enviar_taller(uuid,text,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.enviar_taller(uuid,text,jsonb,jsonb) to anon,authenticated;

-- Borrar exclusivamente una entrega elegida; solo para docentes autorizados.
create or replace function public.eliminar_entrega_prueba(p_entrega_id uuid)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_fila public.taller_entregas%rowtype; v_codigo text; v_n integer; v_liberado boolean=false;
begin
 if not exists(select 1 from public.taller_docentes where user_id=(select auth.uid())) then
  raise exception using errcode='42501',message='Solo un docente autorizado puede eliminar una entrega de prueba';
 end if;
 select * into v_fila from public.taller_entregas where id=p_entrega_id;
 if not found then return jsonb_build_object('eliminadas',0,'reenvio_habilitado',false); end if;
 v_codigo=upper(btrim(v_fila.participante->>'codigoPUCP'));
 if coalesce(v_codigo,'')<>'' then
  perform pg_advisory_xact_lock(hashtextextended(v_fila.sesion_id::text||':'||v_codigo,0));
  perform 1 from public.taller_codigos_enviados where sesion_id=v_fila.sesion_id and codigo_pucp=v_codigo for update;
 end if;
 delete from public.taller_entregas where id=p_entrega_id;
 get diagnostics v_n=row_count;
 if v_n=1 and coalesce(v_codigo,'')<>'' and not exists(select 1 from public.taller_entregas where sesion_id=v_fila.sesion_id and upper(btrim(participante->>'codigoPUCP'))=v_codigo) then
  delete from public.taller_codigos_enviados where sesion_id=v_fila.sesion_id and codigo_pucp=v_codigo;
  v_liberado=true;
 end if;
 return jsonb_build_object('eliminadas',v_n,'reenvio_habilitado',v_liberado);
end;
$$;
revoke all on function public.eliminar_entrega_prueba(uuid) from public,anon,authenticated;
grant execute on function public.eliminar_entrega_prueba(uuid) to authenticated;

-- Verificar un comprobante no devuelve datos personales ni respuestas.
create or replace function public.comprobar_recibo_taller(p_id uuid,p_codigo text)
returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if p_id is null or p_codigo is null or char_length(p_codigo)>40 then raise exception 'Comprobante inválido'; end if;
 return jsonb_build_object('registrada',exists(select 1 from public.taller_entregas e join public.taller_sesiones s on s.id=e.sesion_id where e.id=p_id and s.codigo=p_codigo));
end;
$$;
revoke all on function public.comprobar_recibo_taller(uuid,text) from public,anon,authenticated;
grant execute on function public.comprobar_recibo_taller(uuid,text) to anon,authenticated;

insert into public.taller_sesiones(nombre,codigo) select 'Taller sismoPUCP',upper(substr(replace(gen_random_uuid()::text,'-',''),1,10)) where not exists(select 1 from public.taller_sesiones);
commit;
-- Guarda este código y compártelo con los alumnos del taller.
select nombre,codigo,activa from public.taller_sesiones order by creada_en;
 then raise exception 'Código PUCP inválido'; end if;
 p_participante=jsonb_set(p_participante,'{codigoPUCP}',to_jsonb(v_codigo_pucp));
 if p_respuestas is null or jsonb_typeof(p_respuestas)<>'array' then raise exception 'Respuestas inválidas'; end if;
 v_n=jsonb_array_length(p_respuestas);
 if v_n not between 1 and 12 or octet_length(p_respuestas::text)>200000 then raise exception 'Envíe entre una y doce fichas, sin archivos adjuntos'; end if;
 if (select count(distinct e->>'caso') from jsonb_array_elements(p_respuestas) e)<>v_n then raise exception 'Casos repetidos'; end if;
 for r in select value from jsonb_array_elements(p_respuestas) loop
  if jsonb_typeof(r)<>'object' or coalesce(r->>'caso','') not in ('T01','T02','T03','T04','T05','T06','T07','T08','T09','T10','T11','T12') or coalesce(jsonb_typeof(r->'evaluacion'),'')<>'object' or coalesce(r->'evaluacion'->>'habitabilidad','') not in ('habitable','uso_restringido','inseguro') or coalesce(r->'evaluacion'->>'alcance','') not in ('exterior','interior_exterior') or coalesce(char_length(btrim(r->'evaluacion'->>'evaluador')),0)=0 or coalesce(char_length(btrim(r->'evaluacion'->>'fundamento')),0)=0 or coalesce(char_length(btrim(r->'evaluacion'->>'sistema_observado')),0)=0 then raise exception 'Hay una ficha inválida o sin finalizar'; end if;
  if r->'evaluacion' ? 'fotos' then raise exception 'Las fotografías no se incluyen en esta entrega'; end if;
 end loop;
 insert into public.taller_entregas(id,sesion_id,participante,respuestas) values(p_id,v_sesion,p_participante,p_respuestas) on conflict(id) do nothing;
 select * into v_fila from public.taller_entregas where id=p_id;
 if v_fila.sesion_id<>v_sesion or v_fila.participante<>p_participante or v_fila.respuestas<>p_respuestas then raise exception 'El identificador ya pertenece a otra entrega'; end if;
 return jsonb_build_object('id',v_fila.id,'recibida_en',v_fila.recibida_en,'fichas',jsonb_array_length(v_fila.respuestas));
end;
$$;
revoke all on function public.enviar_taller(uuid,text,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.enviar_taller(uuid,text,jsonb,jsonb) to anon,authenticated;
insert into public.taller_sesiones(nombre,codigo) select 'Taller sismoPUCP',upper(substr(replace(gen_random_uuid()::text,'-',''),1,10)) where not exists(select 1 from public.taller_sesiones);
commit;
-- Guarda este código y compártelo con los alumnos del taller.
select nombre,codigo,activa from public.taller_sesiones order by creada_en;
