# 📸 Guía Visual - Subir a Vercel SIN Git

## 🎯 Resumen Ultra-Rápido

1. **Comprime tu carpeta** en ZIP
2. **Ve a vercel.com** y crea cuenta
3. **Sube el ZIP** o arrastra la carpeta
4. **Configura variables** de entorno
5. **Click "Deploy"**
6. **¡Listo!**

---

## 📦 PASO 1: Crear ZIP (2 minutos)

### En Windows:

1. Abre el **Explorador de Archivos**
2. Ve a: `C:\Users\Usuario\Desktop\Programa\Matrimonio`
3. Presiona **Ctrl + A** (selecciona todo)
4. **Click derecho** → **"Enviar a"** → **"Carpeta comprimida (en zip)"**
5. Espera a que se cree el ZIP
6. Renombra a: `matrimonio.zip`

**✅ Verifica que el ZIP tenga:**
- `package.json` ✅
- Carpeta `src/` ✅
- Carpeta `public/` ✅
- Carpeta `data/` ✅

---

## 🌐 PASO 2: Vercel (10 minutos)

### 2.1 Crear Cuenta

1. Abre: **https://vercel.com**
2. Click **"Sign Up"**
3. Elige **"Continue with Google"** (más rápido)
4. Autoriza Vercel

### 2.2 Subir Proyecto

1. En el dashboard, click **"Add New..."**
2. Click **"Project"**
3. Busca **"Upload"** o **"Browse"**
4. Selecciona tu `matrimonio.zip`
5. O **arrastra** tu carpeta directamente

### 2.3 Configurar

**Vercel detectará Next.js automáticamente - NO CAMBIES NADA**

### 2.4 Variables de Entorno

**ANTES de hacer deploy**, agrega estas variables:

**Click en "Environment Variables" o busca "Variables"**

Agrega una por una:

1. **ADMIN_USERNAME**
   - Valor: `Admin`

2. **ADMIN_PASSWORD**
   - Valor: Genera una contraseña segura
   - Usa: https://randomkeygen.com/ → "Fort Knox Password"
   - O usa: `Matrimonio2026!Seguro#`

3. **ADMIN_TOKEN**
   - Valor: Genera un token aleatorio
   - Usa: https://randomkeygen.com/ → "CodeIgniter Encryption Keys"
   - O copia: `a7f3b9c2d8e4f1a6b5c9d2e7f3a8b4c1d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4`

4. **NEXT_PUBLIC_BASE_URL**
   - Valor: `https://matrimonio.vercel.app` (cambiarás esto después)

**Para cada variable:**
- Marca las 3 casillas: Production, Preview, Development
- Click "Add" o "Save"

### 2.5 Deploy

1. Scroll hacia abajo
2. Click **"Deploy"** (botón grande)
3. Espera 2-5 minutos
4. ¡Listo! Verás tu URL

---

## ✅ PASO 3: Verificar

1. Click en **"Visit"** o copia la URL
2. Prueba: `https://tu-url.vercel.app`
3. Prueba admin: `https://tu-url.vercel.app/admin`
4. Login con: `Admin` / tu contraseña

---

## 🆘 Si Algo Sale Mal

### Error: "Build Failed"

**Solución:**
1. En Vercel → Tu proyecto → **Deployments**
2. Click en el deployment fallido
3. Lee los logs para ver el error
4. Avísame el error y te ayudo

### Error: "No se puede subir"

**Solución:**
1. Verifica que el ZIP no sea muy grande (máx 100MB)
2. Asegúrate de NO incluir `node_modules/`
3. Intenta arrastrar la carpeta directamente en vez de ZIP

### Error: "No puedo iniciar sesión"

**Solución:**
1. Verifica las variables de entorno
2. Asegúrate de que `ADMIN_PASSWORD` sea la correcta
3. Haz un nuevo deploy después de cambiar variables

---

## 💡 Tips Importantes

- ✅ El ZIP debe incluir `package.json`
- ✅ NO incluyas `node_modules/`
- ✅ Configura variables ANTES de deploy
- ✅ Guarda tus contraseñas en un lugar seguro
- ✅ Haz backup de `data/database.json`

---

**¿Necesitas ayuda con algún paso específico? Avísame y te guío más detalladamente.**

