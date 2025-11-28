# ✅ Solución: Error "No Next.js version detected"

## ❌ El Error

```
Warning: Could not identify Next.js version
Error: No Next.js version detected. Make sure your package.json has "next" 
in either "dependencies" or "devDependencies". Also check your Root Directory 
setting matches the directory of your package.json file.
```

## 🔍 Causa del Problema

Vercel no puede encontrar tu `package.json` porque:
1. ❌ El ZIP no incluye `package.json` en la raíz
2. ❌ El "Root Directory" en Vercel está mal configurado
3. ❌ El `package.json` está dentro de una subcarpeta

---

## ✅ Solución Paso a Paso

### PASO 1: Verificar que package.json esté en la Raíz

**En tu carpeta local:**

1. Abre: `C:\Users\Usuario\Desktop\Programa\Matrimonio`
2. Verifica que `package.json` esté **directamente** en esta carpeta
3. NO debe estar dentro de una subcarpeta

**Estructura correcta:**
```
Matrimonio/
├── package.json          ← DEBE estar aquí
├── next.config.js
├── tsconfig.json
├── src/
├── public/
└── data/
```

**Estructura INCORRECTA:**
```
Matrimonio/
└── Matrimonio/          ← Carpeta duplicada
    ├── package.json     ← MAL: está dentro de otra carpeta
    └── ...
```

---

### PASO 2: Crear ZIP Correcto

**IMPORTANTE:** Asegúrate de que el ZIP tenga esta estructura:

1. **Abre tu carpeta:** `C:\Users\Usuario\Desktop\Programa\Matrimonio`

2. **Verifica que NO haya una carpeta duplicada:**
   - Si ves `Matrimonio/Matrimonio/`, eso es el problema
   - El ZIP debe tener los archivos directamente en la raíz

3. **Selecciona estos archivos/carpetas:**
   - `package.json` ← **MUY IMPORTANTE**
   - `package-lock.json`
   - `next.config.js`
   - `tsconfig.json`
   - `tailwind.config.ts`
   - `postcss.config.js`
   - `.eslintrc.json`
   - `.gitignore`
   - Carpeta `src/`
   - Carpeta `public/`
   - Carpeta `data/`

4. **Click derecho → "Enviar a" → "Carpeta comprimida (en zip)"**

5. **Abre el ZIP** y verifica que `package.json` esté en la raíz:
   ```
   matrimonio.zip
   ├── package.json          ← DEBE estar aquí
   ├── next.config.js
   ├── src/
   ├── public/
   └── data/
   ```

6. **Si ves esto (INCORRECTO):**
   ```
   matrimonio.zip
   └── Matrimonio/
       ├── package.json      ← MAL: dentro de subcarpeta
       └── ...
   ```
   **Solución:** Extrae todo de la subcarpeta y vuelve a crear el ZIP

---

### PASO 3: Configurar Root Directory en Vercel

**Si el ZIP está correcto pero aún falla:**

1. **En Vercel:**
   - Ve a tu proyecto
   - Click en **"Settings"**
   - Busca **"General"** → **"Root Directory"**

2. **Configuración:**
   - Si tu `package.json` está en la raíz del ZIP:
     - **Root Directory:** Debe estar **VACÍO** o ser `./`
   - Si tu `package.json` está en una subcarpeta (no recomendado):
     - **Root Directory:** `./nombre-de-la-carpeta`

3. **Para este proyecto:**
   - **Root Directory:** Debe estar **VACÍO** o `./`
   - **NO debe decir:** `./Matrimonio` o cualquier otra carpeta

4. **Guarda los cambios**

---

### PASO 4: Eliminar y Recrear el Proyecto (Recomendado)

**Si nada funciona, empieza desde cero:**

1. **En Vercel:**
   - Ve a tu proyecto
   - **Settings** → Scroll hasta abajo
   - **"Delete Project"**
   - Confirma la eliminación

2. **Crea un nuevo proyecto:**
   - **Add New** → **Project**
   - Sube tu ZIP limpio (con `package.json` en la raíz)
   - Vercel detectará Next.js automáticamente

3. **Verifica la configuración:**
   - **Framework Preset:** Debe decir `Next.js` ✅
   - **Root Directory:** Debe estar vacío o ser `./` ✅
   - **Build Command:** `npm run build` ✅
   - **Output Directory:** `.next` ✅

4. **Configura variables de entorno ANTES de deploy:**
   - `ADMIN_USERNAME` = `Admin`
   - `ADMIN_PASSWORD` = [tu contraseña]
   - `ADMIN_TOKEN` = [tu token]
   - `NEXT_PUBLIC_BASE_URL` = `https://tu-proyecto.vercel.app`

5. **Click "Deploy"**

---

## 🔍 Verificación Final

**Antes de hacer deploy, verifica:**

- [ ] `package.json` está en la raíz del ZIP
- [ ] `package.json` contiene `"next"` en `dependencies`
- [ ] El ZIP NO tiene carpetas duplicadas
- [ ] Root Directory en Vercel está vacío o es `./`
- [ ] Variables de entorno configuradas

---

## 📋 Estructura Correcta del ZIP

```
matrimonio.zip
├── package.json              ← RAÍZ
├── package-lock.json         ← RAÍZ
├── next.config.js            ← RAÍZ
├── tsconfig.json             ← RAÍZ
├── tailwind.config.ts        ← RAÍZ
├── postcss.config.js         ← RAÍZ
├── .eslintrc.json            ← RAÍZ
├── .gitignore                ← RAÍZ
├── src/                      ← Carpeta
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── public/                   ← Carpeta
│   └── images/
└── data/                     ← Carpeta
    └── database.json
```

**NO debe ser así:**
```
matrimonio.zip
└── Matrimonio/               ← Carpeta extra (INCORRECTO)
    ├── package.json
    └── ...
```

---

## ✅ Solución Rápida

1. **Abre tu carpeta** `Matrimonio`
2. **Selecciona SOLO los archivos/carpetas** (no selecciones la carpeta Matrimonio misma)
3. **Crea ZIP** con esos archivos
4. **Abre el ZIP** y verifica que `package.json` esté en la raíz
5. **Elimina el proyecto en Vercel**
6. **Crea proyecto nuevo** y sube el ZIP
7. **Verifica Root Directory** = vacío o `./`
8. **Deploy**

---

**¡Con esto debería funcionar! Si aún tienes problemas, avísame.**

