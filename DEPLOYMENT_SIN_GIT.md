# 🚀 Subir a Vercel SIN Git - Guía Paso a Paso

Esta guía te muestra cómo subir tu aplicación directamente a Vercel usando solo la interfaz web, sin necesidad de Git ni comandos.

---

## 📦 Paso 1: Preparar tu Código (2 minutos)

### 1.1 Verificar que tienes todos los archivos

Asegúrate de que tu carpeta tenga estos archivos importantes:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`
- ✅ `tailwind.config.ts`
- ✅ Carpeta `src/` con todo el código
- ✅ Carpeta `public/` con imágenes
- ✅ Carpeta `data/` con `database.json`

### 1.2 Crear un ZIP de tu proyecto

1. **Abre el Explorador de Archivos de Windows**
2. **Ve a:** `C:\Users\Usuario\Desktop\Programa\Matrimonio`
3. **Selecciona TODOS los archivos y carpetas** (Ctrl+A)
4. **Click derecho** → **"Enviar a"** → **"Carpeta comprimida (en zip)"**
5. Se creará un archivo `Matrimonio.zip`
6. **Renombra el ZIP** a algo simple como `matrimonio-app.zip`

**⚠️ IMPORTANTE:** Asegúrate de que el ZIP incluya:
- ✅ `package.json`
- ✅ `src/` (toda la carpeta)
- ✅ `public/` (toda la carpeta)
- ✅ `data/` (toda la carpeta)
- ✅ Archivos de configuración (`.json`, `.js`, `.ts`)

**❌ NO incluyas:**
- `node_modules/` (se instala automáticamente)
- `.next/` (se genera automáticamente)
- `.env.local` (usa variables de entorno en Vercel)

---

## 🌐 Paso 2: Crear Cuenta en Vercel (3 minutos)

### 2.1 Acceder a Vercel

1. **Abre tu navegador** (Chrome, Edge, Firefox, etc.)
2. **Ve a:** https://vercel.com
3. **Click en "Sign Up"** (arriba derecha)

### 2.2 Registrarse

Tienes 3 opciones (elige la más fácil para ti):

**Opción A - Con Google (Más Rápido):**
- Click "Continue with Google"
- Elige tu cuenta de Google
- Autoriza Vercel

**Opción B - Con GitHub:**
- Click "Continue with GitHub"
- Si no tienes GitHub, créalo primero en github.com
- Autoriza Vercel

**Opción C - Con Email:**
- Ingresa tu email
- Crea una contraseña
- Verifica tu email

**✅ Recomendación:** Usa Google (más rápido)

### 2.3 Completar Perfil

- Vercel te pedirá tu nombre (opcional)
- Click "Continue" o "Skip"

---

## 📤 Paso 3: Subir tu Proyecto (5 minutos)

### 3.1 Crear Nuevo Proyecto

1. **En el dashboard de Vercel**, verás un botón grande **"Add New..."**
2. **Click en "Add New..."** → **"Project"**
3. O directamente click en **"Add New Project"**

### 3.2 Importar Proyecto

Verás varias opciones. Busca la sección que dice:

**"Deploy from..."** o **"Import"**

**Opción 1 - Si ves "Upload":**
1. Click en **"Upload"** o **"Browse"**
2. Selecciona tu archivo `matrimonio-app.zip`
3. Espera a que se suba

**Opción 2 - Si NO ves "Upload":**
1. Busca **"Import Git Repository"**
2. Abajo verás **"Or, drag and drop a folder"**
3. **Arrastra tu carpeta** `Matrimonio` directamente
4. O busca **"Deploy"** → **"Browse"** → Selecciona tu ZIP

### 3.3 Configuración del Proyecto

Vercel detectará automáticamente que es Next.js:

**Verás algo como:**
```
Framework Preset: Next.js ✅
Root Directory: ./
Build Command: npm run build
Output Directory: .next
```

**✅ NO CAMBIES NADA**, está perfecto así.

**Nombre del Proyecto:**
- Puedes dejarlo como está o cambiarlo a `matrimonio`
- Click "Edit" si quieres cambiarlo

---

## 🔐 Paso 4: Configurar Variables de Entorno (5 minutos)

**⚠️ MUY IMPORTANTE:** Antes de hacer deploy, configura estas variables.

### 4.1 Abrir Configuración de Variables

En la pantalla de configuración del proyecto, busca:

**"Environment Variables"** o **"Variables de Entorno"**

Si no lo ves, haz scroll hacia abajo o busca un botón que diga:
- "Environment Variables"
- "Configure"
- "Advanced"

### 4.2 Agregar Variables

Click en **"Add"** o **"Add Variable"** para cada una:

#### Variable 1: ADMIN_USERNAME
- **Name:** `ADMIN_USERNAME`
- **Value:** `Admin`
- **Environments:** Marca las 3 casillas:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development
- Click **"Add"** o **"Save"**

#### Variable 2: ADMIN_PASSWORD
- **Name:** `ADMIN_PASSWORD`
- **Value:** `TU_CONTRASEÑA_SEGURA`
  - ⚠️ **Genera una contraseña segura** (mínimo 16 caracteres)
  - Puedes usar: https://randomkeygen.com/ → "Fort Knox Password"
  - O crea una manual: `Matrimonio2026!Seguro#`
- **Environments:** Marca las 3 casillas
- Click **"Add"**

#### Variable 3: ADMIN_TOKEN
- **Name:** `ADMIN_TOKEN`
- **Value:** `TU_TOKEN_ALEATORIO`
  - ⚠️ **Genera un token aleatorio** (32+ caracteres)
  - Puedes usar: https://randomkeygen.com/ → "CodeIgniter Encryption Keys"
  - O copia este ejemplo: `a7f3b9c2d8e4f1a6b5c9d2e7f3a8b4c1d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4`
- **Environments:** Marca las 3 casillas
- Click **"Add"**

#### Variable 4: NEXT_PUBLIC_BASE_URL
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://matrimonio.vercel.app` (o el nombre que elegiste)
  - ⚠️ **Cambia esto DESPUÉS del primer deploy** con tu URL real
- **Environments:** Marca las 3 casillas
- Click **"Add"**

#### Variable 5 (Opcional): GOOGLE_MAPS_API_KEY
- **Name:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- **Value:** (déjalo vacío si no tienes clave de Google Maps)
- **Environments:** Marca las 3 casillas
- Click **"Add"**

### 4.3 Verificar Variables

Deberías ver 4-5 variables listadas:
- ✅ ADMIN_USERNAME
- ✅ ADMIN_PASSWORD
- ✅ ADMIN_TOKEN
- ✅ NEXT_PUBLIC_BASE_URL
- ✅ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (opcional)

---

## 🚀 Paso 5: Hacer Deploy (3 minutos)

### 5.1 Iniciar Deploy

1. **Scroll hacia abajo** hasta el final de la página
2. **Busca el botón grande:**
   - **"Deploy"** (verde o azul)
   - O **"Deploy Project"**
3. **Click en "Deploy"**

### 5.2 Esperar el Build

Vercel comenzará a:
1. ✅ Subir tu código
2. ✅ Instalar dependencias (`npm install`)
3. ✅ Hacer build (`npm run build`)
4. ✅ Desplegar la aplicación

**Tiempo estimado:** 2-5 minutos

Verás una barra de progreso y logs en tiempo real.

### 5.3 Deploy Completado

Cuando termine, verás:
- ✅ **"Deployment successful"** o **"Ready"**
- Una **URL** como: `https://matrimonio-xxxxx.vercel.app`
- Un botón **"Visit"** o **"Open"**

**🎉 ¡Tu aplicación está online!**

---

## ✅ Paso 6: Verificar que Funciona (5 minutos)

### 6.1 Probar el Frontend

1. **Click en "Visit"** o copia la URL
2. **Abre la URL** en tu navegador
3. **Verifica que:**
   - ✅ La página carga
   - ✅ Las imágenes se ven
   - ✅ El contador regresivo funciona
   - ✅ Los mapas se muestran
   - ✅ El formulario de confirmación funciona

### 6.2 Probar el Admin

1. **Ve a:** `https://tu-url.vercel.app/admin`
2. **Inicia sesión con:**
   - Usuario: `Admin`
   - Contraseña: La que configuraste en variables de entorno
3. **Verifica que puedes:**
   - ✅ Ver la información
   - ✅ Editar datos
   - ✅ Subir imágenes
   - ✅ Gestionar invitados

### 6.3 Actualizar NEXT_PUBLIC_BASE_URL

1. **Copia tu URL real** (la que te dio Vercel)
2. **En Vercel:** Ve a tu proyecto → **Settings** → **Environment Variables**
3. **Edita** `NEXT_PUBLIC_BASE_URL`
4. **Cambia el valor** a tu URL real: `https://tu-url-real.vercel.app`
5. **Guarda**
6. **Haz un nuevo deploy:**
   - Ve a **Deployments**
   - Click en los **3 puntos** del último deployment
   - Click **"Redeploy"**

---

## 🔄 Actualizar la Aplicación (Cuando hagas cambios)

### Método 1: Subir Nuevo ZIP

1. **Haz tus cambios** en el código local
2. **Crea nuevo ZIP** con los cambios
3. **En Vercel:**
   - Ve a tu proyecto
   - **Settings** → **General**
   - Scroll hasta abajo
   - **"Delete Project"** (esto NO borra los datos, solo el proyecto)
4. **Crea nuevo proyecto** y sube el ZIP actualizado
5. **Configura las mismas variables de entorno**

### Método 2: Usar GitHub (Recomendado para el futuro)

Si más adelante quieres actualizaciones automáticas:
1. Instala Git y GitHub Desktop
2. Sube tu código a GitHub
3. Conecta GitHub a Vercel
4. Cada cambio se desplegará automáticamente

---

## 🆘 Solución de Problemas

### "Build Failed" o Error en Deploy

**Causas comunes:**
1. **Faltan variables de entorno**
   - Verifica que todas estén configuradas
   - Asegúrate de marcar "Production"

2. **Archivos faltantes en el ZIP**
   - Verifica que `package.json` esté incluido
   - Verifica que `src/` esté completa
   - Verifica que `data/` esté incluida

3. **Error en el código**
   - Revisa los logs en Vercel
   - Busca el error específico
   - Corrígelo localmente y vuelve a subir

**Cómo ver los logs:**
- En Vercel → Tu proyecto → **Deployments**
- Click en el deployment fallido
- Verás los logs completos del error

### "No se muestran las imágenes"

**Solución:**
1. Verifica que la carpeta `public/images/` esté en el ZIP
2. Verifica que las rutas en `database.json` sean correctas
3. Si usas URLs externas, verifica que sean públicas

### "No puedo iniciar sesión en admin"

**Solución:**
1. Verifica las variables de entorno:
   - `ADMIN_USERNAME` debe ser `Admin`
   - `ADMIN_PASSWORD` debe ser la que configuraste
2. Asegúrate de que estén en "Production"
3. Haz un nuevo deploy después de cambiar variables

### "Error 404 en rutas"

**Solución:**
1. Verifica que `next.config.js` esté en el ZIP
2. Verifica que todas las rutas estén en `src/app/`
3. Revisa los logs de Vercel para el error específico

---

## 📸 Backup de Datos

**IMPORTANTE:** Haz backups regulares:

1. **Desde el Panel Admin:**
   - Descarga `data/database.json` periódicamente
   - Guarda las imágenes importantes

2. **Desde Vercel:**
   - Puedes ver los archivos del proyecto
   - O descargar el código completo

---

## ✅ Checklist Final

Antes de considerar que está listo:

- [ ] ZIP creado con todos los archivos necesarios
- [ ] Cuenta en Vercel creada
- [ ] Proyecto subido a Vercel
- [ ] Variables de entorno configuradas
- [ ] Deploy exitoso
- [ ] Frontend funciona correctamente
- [ ] Panel admin accesible y funcional
- [ ] `NEXT_PUBLIC_BASE_URL` actualizada con URL real

---

## 🎉 ¡Listo!

Tu aplicación estará online en:
- **URL:** `https://tu-proyecto.vercel.app`
- **Admin:** `https://tu-proyecto.vercel.app/admin`

**La aplicación estará activa hasta marzo 2026 y más, completamente gratis.**

---

## 💡 Tips

- ✅ Vercel es **100% gratis** para proyectos personales
- ✅ SSL/HTTPS es **automático y gratuito**
- ✅ Puedes agregar dominio personalizado después
- ✅ Los datos se mantienen mientras el proyecto esté activo
- ✅ Puedes hacer hasta 100 deployments por día (gratis)

---

**¿Tienes algún problema? Avísame y te ayudo a resolverlo paso a paso.**

