-- Primero: Authentication > Users > Add user. Crear tu usuario docente con correo y contraseña.
-- Luego reemplaza TU_CORREO por ese correo y ejecuta este archivo en SQL Editor.
insert into public.taller_docentes(user_id)
select id from auth.users where lower(email)=lower('TU_CORREO')
on conflict do nothing;
-- Debe devolver una fila; si devuelve cero, el correo no existe en Authentication > Users.
select u.email from public.taller_docentes d join auth.users u on u.id=d.user_id;
