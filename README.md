# 💍 Aplicación Web + Panel Administrativo

Experiencia completa de invitación virtual para matrimonios:

- **Landing moderna** en modo invitación (hero animado, secciones temáticas, CTA para confirmar y compartir por WhatsApp).
- **Flujo RSVP**: formulario público `/confirmar` que registra invitados directo en la lista oficial.
- **Panel Admin protegido** (`/admin`) con autenticación (`Admin` / `12345`) para modificar TODO: info visual, invitados, mesas (1-10 personas), gastos y mensaje de WhatsApp.
- **Backend** con API REST (Next.js App Router) que persiste en `data/database.json`.

> 📖 ¿Primera vez? Empieza con [EMPEZAR_AQUI.md](./EMPEZAR_AQUI.md).  
> ⚡ ¿Necesitas algo rápido? [INSTRUCCIONES_RAPIDAS.txt](./INSTRUCCIONES_RAPIDAS.txt).  
> 🧭 Guía visual: [PRIMEROS_PASOS.md](./PRIMEROS_PASOS.md).  
> 📸 Guía de fotos: [GUIA_FOTOS.md](./GUIA_FOTOS.md).  
> 🚀 **¿Listo para subir a internet?** [DEPLOYMENT_RAPIDO.md](./DEPLOYMENT_RAPIDO.md) (15 minutos)

---

## ✨ Características Clave

- 🎨 **Landing cinematográfica** con gradientes, animaciones y CTA para confirmar.
- 📍 **Google Maps embebido** (ceremonia y fiesta) + botón "Abrir en Maps".
- 👔 **Código de vestimenta** y secciones informativas dinámicas.
- 📸 **Galería de fotos** con subida desde PC/teléfono, edición de descripciones y reordenamiento.
- 💌 **Invitaciones por WhatsApp** con mensaje personalizable (`{confirmUrl}` se reemplaza solo).
- ✅ **Formulario público de confirmación** → guarda nombre/apellido en backend.
- 🛡️ **Panel Admin con login** (usuario/contraseña).
- 👥 **Gestor de invitados** (CRUD, confirmados, asignación a mesas).
- 🪑 **Mesas configurables (1-10)**, barra de ocupación y asignación drag-free.
- 💰 **Control de gastos** con categorías, totales y alerta visual.
- 💾 **Persistencia en JSON** (`data/database.json`) fácil de versionar o respaldar.

---

## 🚀 Inicio Rápido

### 1. Prerrequisitos
- Node.js 18+
- npm (incluido con Node)

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de entorno (`.env.local`)
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_maps
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=12345
ADMIN_TOKEN=admin-token
```
> **Mapas embebidos:** Para que los mapas funcionen correctamente, necesitas una API key de Google Maps.  
> 1. Ve a [Google Cloud Console](https://console.cloud.google.com/)  
> 2. Crea un proyecto o selecciona uno existente  
> 3. Habilita estas APIs: **Maps Embed API** y **Maps JavaScript API**  
> 4. Ve a "Credenciales" → "Crear credenciales" → "Clave de API"  
> 5. Copia la clave y añádela a `.env.local`  
> 
> Si no configuras la API key, los mapas mostrarán un botón para abrir Google Maps en una nueva pestaña.

### 4. Datos iniciales
- Archivo principal: `data/database.json`  
  (Se genera solo si no existe).  
- Puedes editarlo manualmente o hacerlo desde el panel admin (recomendado).
- **Directorio de fotos:** `public/images/` (se crea automáticamente al subir la primera foto).

### 5. Levantar la app
```bash
npm run dev
# abre http://localhost:3000
```

### 6. Panel admin
- Ir a `http://localhost:3000/admin`
- Usuario: `Admin`
- Contraseña: `12345`

---

## 📁 Estructura Principal

```
data/
└── database.json         # Persistencia de weddingInfo, guests, tables, expenses
public/
└── images/               # Fotos subidas desde el panel admin
src/
├── app/
│   ├── page.tsx          # Landing pública (server component)
│   ├── confirmar/        # Formulario RSVP público
│   ├── admin/            # Panel protegido (login + dashboard)
│   └── api/              # Endpoints REST (auth, admin, RSVP, info, upload)
├── components/
│   ├── (landing)         # Hero, InfoSection, GiftSection, PhotoGallery, etc.
│   └── admin/            # AdminDashboard con tabs Info/Invitados/Mesas/Gastos
├── lib/                  # db.ts (FS JSON), auth helpers
└── types/                # Tipos compartidos
```

---

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Dev server con recarga |
| `npm run build` | Build producción |
| `npm run start` | Servir build |
| `npm run lint` | Linter |
| `npm run verificar` | Chequeo rápido de instalación (Node + npm + dependencias) |

---

## 🧩 API & Backend

- `POST /api/auth/login` → token simple (Bearer) basado en credenciales `.env`.
- `GET/PUT /api/admin/info` → weddingInfo completo (hero, lugares, dress code, mensaje WhatsApp, regalos).
- `GET/POST/PUT/DELETE /api/admin/guests` → CRUD invitados + asignación automática a mesas.
- `GET/POST/PUT/DELETE /api/admin/tables` → mesas con capacidad validada (1-10).
- `GET/POST/PUT/DELETE /api/admin/expenses` → control de gastos.
- `GET /api/admin/dashboard` → dataset completo (para hidratar panel).
- `POST /api/confirm` → RSVP público (nombre+apellido) marca confirmado.
- `GET /api/public/info` → info para cualquier cliente (landing).

---

## 🔐 Panel Admin

- Login requerido (usuario/contraseña configurables).
- Tabs:
  - **Información**: todos los textos mostrados en la landing incluyendo hero, lugares, dress code, mensaje WhatsApp y meta de regalos (incluye lat/lng para mapas).
  - **Invitados**: agregar/editar/confirmar/eliminar + asignar a mesas.
  - **Mesas**: crear mesas (1-10 personas), ver ocupación y asignar/quitar invitados.
  - **Gastos**: controlar presupuesto real con categorías personalizables.

Todos los cambios se guardan en `data/database.json` y se reflejan inmediatamente en la landing pública.

---

## 📣 Invitaciones & RSVP

- Cada invitado puede recibir un enlace de WhatsApp generado desde la landing (usa el mensaje configurable con `{confirmUrl}`).
- El botón **Confirmar asistencia** lleva a `/confirmar`, donde el invitado ingresa nombre y apellido → se registra / marca como confirmado automáticamente.
- El panel Admin muestra confirmados en tiempo real (incluidos los que llegaron por WhatsApp).

---

## 🌐 Despliegue

1. Subir repositorio a GitHub.
2. Deploy en Vercel (recomendado):
   - Importa el repo.
   - Añade las variables de entorno anteriores.
   - Incluye `data/database.json` (Vercel permite escritura en disco temporal; para producción considera base externa o servicio persistente).
3. Otros proveedores compatibles: Netlify, Railway, Render, etc.

> Para producción real con persistencia compartida, mueve `data/database.json` a una base de datos externa (Supabase, Mongo, etc.) o monta un storage compartido.

---

## 📌 Notas Importantes

- Los datos del formulario de confirmación se guardan automáticamente como invitados confirmados.
- El backend usa JSON plano; haz respaldos periódicos del archivo `data/database.json`.
- Si distribuyes el build, asegúrate de proteger las rutas `/api/admin/**`.
- La navegación pública solo muestra `Inicio` y `Panel Admin`; el resto se opera dentro del panel.

---

## ❤️ Créditos

Proyecto creado para ayudarte a organizar tu matrimonio con estilo profesional y sin complicaciones técnicas.

¡Feliz celebración! 💕
