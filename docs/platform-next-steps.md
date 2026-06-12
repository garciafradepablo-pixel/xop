# MOONKEY LAB — Platform Next Steps

Guía de setup para convertir la web estática en plataforma piloto real.

---

## 1. Crear proyecto Supabase Free

1. Ve a [supabase.com](https://supabase.com) → New Project.
2. Nombre sugerido: `moonkey-lab-pilot`
3. Elige región EU (Frankfurt o Irlanda) para GDPR.
4. Guarda el password del proyecto en un gestor de contraseñas.
5. Espera ~2 minutos a que el proyecto arranque.

---

## 2. Variables de entorno a configurar

En Cloudflare Pages → Settings → Environment Variables:

```
PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Las encuentras en Supabase → Project Settings → API.

La `anon key` es pública por diseño — está pensada para el cliente.
**Nunca expongas la `service_role` key en el frontend.**

Para desarrollo local, crea un archivo `.env` en la raíz del proyecto:
```
PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Asegúrate de que `.env` está en `.gitignore`.

---

## 3. Ejecutar el schema

1. En Supabase → SQL Editor → New query.
2. Pega el contenido de `supabase/schema.sql`.
3. Ejecuta.
4. Verifica en Table Editor que se crearon: `profiles`, `progress`, `feedback`, `leads`.

---

## 4. Configurar Auth

En Supabase → Authentication → Settings:

- **Site URL**: `https://tu-dominio.pages.dev` (o dominio propio)
- **Redirect URLs**: añade `https://tu-dominio.pages.dev/cuenta`
- **Email confirmations**: desactiva si quieres magic link sin verificación extra
- **SMTP**: configura un proveedor de email para producción (Resend, Mailgun, etc.)
  - Por defecto Supabase usa su propio SMTP limitado a 4 emails/hora — suficiente para piloto.

---

## 5. Probar login

1. Ve a `/login` en tu sitio (ya desplegado con las env vars).
2. Introduce tu email.
3. Revisa la bandeja de entrada — llega un magic link.
4. Haz clic → debes aterrizar en `/cuenta` con sesión activa.

Si no llega el email:
- Revisa Supabase → Authentication → Logs.
- Comprueba el SMTP o usa el dashboard de Supabase para enviar invitaciones manualmente.

---

## 6. Probar progreso

1. Avanza en `/modulos` y marca algunos módulos como completados.
2. Ve a `/cuenta`.
3. Si estás logueado, haz clic en "Sincronizar ahora".
4. Abre Supabase → Table Editor → `progress` — debes ver la fila.

---

## 7. Antes de abrir a usuarios

- [ ] Configurar SMTP real (Resend tiene free tier generoso).
- [ ] Revisar RLS — probar con un usuario real que no pueda leer datos de otro.
- [ ] Añadir dominio propio en Cloudflare Pages.
- [ ] Actualizar Site URL y Redirect URLs en Supabase con el dominio final.
- [ ] Revisar la página `/privacidad` con los datos reales de contacto.
- [ ] Proteger `/admin` — no exponer con la anon key; usar Studio o una Edge Function con service_role.

---

## 8. Qué NO implementar todavía

- **Stripe / pagos**: hasta tener al menos 10 Monkeys completando N1.
- **SSR en Astro**: el sitio compila estático — no cambiar a SSR hasta necesitar auth server-side real.
- **Chat / comunidad**: hasta validar que los Monkeys quieren interacción entre sí.
- **Notificaciones push**: hasta tener base de usuarios activa.
- **Múltiples idiomas**: hasta tener feedback del mercado hispano completo.

---

## 9. Roadmap orientativo

| Fase | Acción | Trigger |
|------|--------|---------|
| Piloto 0 | Deploy con Supabase + schema | Ya disponible |
| Piloto 1 | 5 Monkeys completan N1 + feedback | Primer grupo |
| Piloto 2 | Abrir N2 a Monkeys piloto | Tras validar N1 |
| Piloto 3 | Monetización: acceso privado N2/N3 | Tras demanda clara |
| V1 | Logo definitivo + inglés | Antes de ampliar alcance |
| V1.1 | Pagos (Stripe o Payment Links) | Tras primeros 50 usuarios |
