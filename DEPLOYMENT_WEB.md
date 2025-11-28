# 🌐 Deployment por Interfaz Web (Sin Terminal)

Esta es la forma más fácil: todo desde el navegador, sin comandos complicados.

---

## 📋 Paso 1: Preparar el Código (5 minutos)

### Opción A: Subir a GitHub (Recomendado)

1. **Instala Git para Windows:**
   - Descarga: https://git-scm.com/download/win
   - Instala con opciones por defecto
   - Reinicia tu computadora

2. **Crea cuenta en GitHub:**
   - Ve a https://github.com
   - Crea cuenta (gratis)
   - Verifica tu email

3. **Crea un repositorio:**
   - Click en "+" (arriba derecha) → "New repository"
   - Nombre: `matrimonio` (o el que prefieras)
   - Marca "Private" si quieres
   - **NO marques** "Initialize with README"
   - Click "Create repository"

4. **Sube tu código:**
   - GitHub te mostrará instrucciones
   - O usa GitHub Desktop (más fácil): https://desktop.github.com/
   - Con GitHub Desktop: File → Add Local Repository → Selecciona tu carpeta

### Opción B: Zip y Subir Manualmente

Si no quieres usar Git, puedes:
1. Comprimir tu carpeta en ZIP
2. Subirla a un servicio como Dropbox/Google Drive
3. Usar Vercel con "Import Project" → "Upload"

---

## 🚀 Paso 2: Deploy en Vercel (10 minutos)

### 1. Crear Cuenta en Vercel

1. Ve a **https://vercel.com**
2. Click en **"Sign Up"**
3. Elige **"Continue with GitHub"** (más fácil si usaste GitHub)
   - O usa email/Google
4. Completa el registro (gratis)

### 2. Conectar Repositorio

1. En el dashboard de Vercel, click **"Add New Project"**
2. Si usaste GitHub:
   - Click **"Import Git Repository"**
   - Selecciona tu repositorio `matrimonio`
   - Click **"Import"**
3. Si no usaste GitHub:
   - Click **"Import Project"**
   - Sube tu ZIP o conecta otro servicio

### 3. Configurar el Proyecto

Vercel detectará automáticamente que es Next.js:

- **Framework Preset:** Next.js ✅ (automático)
- **Root Directory:** `./` ✅ (automático)
- **Build Command:** `npm run build` ✅ (automático)
- **Output Directory:** `.next` ✅ (automático)

**NO cambies nada**, está perfecto así.

### 4. Configurar Variables de Entorno

**IMPORTANTE:** Antes de hacer deploy, configura estas variables:

1. En la sección **"Environment Variables"**, agrega:

   **Variable 1:**
   - Name: `ADMIN_USERNAME`
   - Value: `Admin`
   - Environments: Production, Preview, Development (marca las 3)

   **Variable 2:**
   - Name: `ADMIN_PASSWORD`
   - Value: `TU_CONTRASEÑA_SEGURA_AQUI`
   - Environments: Production, Preview, Development
   - ⚠️ **Genera una contraseña segura** (mínimo 16 caracteres)

   **Variable 3:**
   - Name: `ADMIN_TOKEN`
   - Value: `TU_TOKEN_ALEATORIO_AQUI`
   - Environments: Production, Preview, Development
   - ⚠️ **Genera un token aleatorio** (32+ caracteres)

   **Variable 4:**
   - Name: `NEXT_PUBLIC_BASE_URL`
   - Value: `https://tu-proyecto.vercel.app`
   - Environments: Production, Preview, Development
   - ⚠️ **Cambia esto después del primer deploy** con tu URL real

   **Variable 5 (Opcional):**
   - Name: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Value: `tu_clave_si_la_tienes`
   - Environments: Production, Preview, Development

### 5. Generar Contraseñas Seguras

**Mientras configuras las variables, genera credenciales seguras:**

**Opción A: Online (Más Fácil)**
1. Ve a: https://randomkeygen.com/
2. Para `ADMIN_PASSWORD`: Usa "Fort Knox Password" (copia una)
3. Para `ADMIN_TOKEN`: Usa "CodeIgniter Encryption Keys" (copia una)

**Opción B: Manual**
- `ADMIN_PASSWORD`: Mínimo 16 caracteres, ejemplo: `Matrimonio2026!Seguro#`
- `ADMIN_TOKEN`: 32+ caracteres aleatorios, ejemplo: `a7f3b9c2d8e4f1a6b5c9d2e7f3a8b4c1d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4`

### 6. Hacer Deploy

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel:
   - Instala dependencias
   - Hace build
   - Despliega tu aplicación
3. ¡Listo! Verás una URL como: `https://matrimonio-xxxxx.vercel.app`

### 7. Actualizar NEXT_PUBLIC_BASE_URL

1. Copia la URL que te dio Vercel
2. Ve a Settings → Environment Variables
3. Edita `NEXT_PUBLIC_BASE_URL`
4. Cambia el valor a tu URL real
5. Haz un nuevo deploy (Vercel lo hará automáticamente o click "Redeploy")

---

## ✅ Paso 3: Verificar que Funciona

### 1. Prueba el Frontend

1. Visita tu URL: `https://tu-proyecto.vercel.app`
2. Verifica que:
   - ✅ La página carga
   - ✅ Las imágenes se ven
   - ✅ El contador regresivo funciona
   - ✅ Los mapas se muestran
   - ✅ El formulario de confirmación funciona

### 2. Prueba el Admin

1. Ve a: `https://tu-proyecto.vercel.app/admin`
2. Inicia sesión con:
   - Usuario: `Admin`
   - Contraseña: La que configuraste en variables de entorno
3. Verifica que puedes:
   - ✅ Ver la información
   - ✅ Editar datos
   - ✅ Subir imágenes
   - ✅ Gestionar invitados

---

## 🔄 Actualizar la Aplicación

### Si usaste GitHub:

1. **Haz cambios en tu código local**
2. **Sube a GitHub:**
   - Con Git: `git add .` → `git commit -m "cambios"` → `git push`
   - Con GitHub Desktop: Commit → Push
3. **Vercel desplegará automáticamente** en 1-2 minutos

### Si subiste ZIP:

1. **Haz cambios en tu código**
2. **Crea nuevo ZIP**
3. **En Vercel:** Settings → General → Delete Project
4. **Crea nuevo proyecto** y sube el ZIP actualizado

---

## 📸 Backup de Datos

**IMPORTANTE:** Vercel mantiene los datos mientras el proyecto esté activo, pero haz backups:

1. **Desde el Panel Admin:**
   - Descarga `data/database.json` periódicamente
   - Guarda las imágenes importantes

2. **Desde Vercel:**
   - Puedes acceder a los archivos del proyecto
   - O descargar el repositorio completo

---

## 🆘 Solución de Problemas

### "Build Failed"
- Revisa los logs en Vercel → Deployments → Ver logs
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que `package.json` esté correcto

### "No se muestran las imágenes"
- Verifica que las imágenes estén en `public/images/`
- Si subiste a GitHub, asegúrate de incluir la carpeta `public/`

### "Error 404 en rutas"
- Verifica que `next.config.js` esté correcto
- Asegúrate de que todas las rutas estén en `src/app/`

### "No puedo iniciar sesión en admin"
- Verifica las variables de entorno `ADMIN_USERNAME` y `ADMIN_PASSWORD`
- Asegúrate de que estén en "Production" environment
- Haz un nuevo deploy después de cambiar variables

---

## 🎉 ¡Listo!

Tu aplicación estará online en:
- **URL pública:** `https://tu-proyecto.vercel.app`
- **Panel Admin:** `https://tu-proyecto.vercel.app/admin`

**La aplicación estará activa hasta marzo de 2026 y más, completamente gratis.**

---

## 💡 Tips Finales

- ✅ Vercel es **100% gratis** para proyectos personales
- ✅ SSL/HTTPS es **automático y gratuito**
- ✅ Puedes agregar dominio personalizado después (gratis)
- ✅ Los datos se mantienen mientras el proyecto esté activo
- ✅ Cada cambio se despliega automáticamente (si usas GitHub)

---

**¿Necesitas ayuda en algún paso? Avísame y te guío más detalladamente.**

