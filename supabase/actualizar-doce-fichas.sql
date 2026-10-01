-- Actualiza únicamente la función de recepción; conserva sesiones y respuestas existentes.
begin;
create or replace function public.enviar_taller(p_id uuid,p_codigo text,p_participante jsonb,p_respuestas jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_sesion uuid; v_fila public.taller_entregas%rowtype; r jsonb; v_n integer;
begin
 if p_id is null or p_codigo is null or char_length(p_codigo)>40 then raise exception 'Identificador o código inválido'; end if;
 select id into v_sesion from public.taller_sesiones where codigo=p_codigo and activa;
 if v_sesion is null then raise exception 'Código de sesión incorrecto o sesión cerrada'; end if;
 if p_participante is null or jsonb_typeof(p_participante)<>'object' or coalesce(char_length(btrim(p_participante->>'nombre')),0) not between 2 and 120 or coalesce(char_length(p_participante->>'institucion'),0)>120 or coalesce(char_length(p_participante->>'equipo'),0)>80 or octet_length(p_participante::text)>4000 then raise exception 'Datos del participante inválidos'; end if;
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
commit;
