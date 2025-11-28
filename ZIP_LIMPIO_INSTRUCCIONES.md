# ✅ Crear ZIP Limpio - Solo Archivos Correctos

## ❌ El Problema

El error menciona `POSTGRES_URL` y archivos de migración que **NO existen** en este proyecto.

**Esto significa que el ZIP incluye archivos incorrectos o de otro proyecto.**

---

## ✅ Solución: Crear ZIP Solo con Archivos Correctos

### Lista EXACTA de Archivos a Incluir

**SOLO incluye estos archivos/carpetas:**

#### Archivos en la Raíz:
1. ✅ `package.json`
2. ✅ `package-lock.json`
3. ✅ `next.config.js`
4. ✅ `tsconfig.json`
5. ✅ `tailwind.config.ts`
6. ✅ `postcss.config.js`
7. ✅ `.eslintrc.json`
8. ✅ `.gitignore`

#### Carpetas:
9. ✅ Carpeta `src/` (completa, con todo su contenido)
10. ✅ Carpeta `public/` (completa, con todo su contenido)
11. ✅ Carpeta `data/` (completa, con `database.json`)

---

## 🚫 NO Incluir

**NO incluyas estos archivos/carpetas:**

- ❌ `node_modules/` (se instala automáticamente)
- ❌ `.next/` (se genera en el build)
- ❌ `.vercel/` (se crea automáticamente)
- ❌ `.env.local` (usa variables de entorno en Vercel)
- ❌ Cualquier archivo relacionado con PostgreSQL
- ❌ Cualquier archivo `migrate.ts`
- ❌ Archivos de documentación (opcional, pero no necesarios)
- ❌ `Matrimonio/` (carpeta duplicada si existe)

---

## 📋 Pasos Detallados

### PASO 1: Abrir la Carpeta

1. Abre el Explorador de Archivos de Windows
2. Ve a: `C:\Users\Usuario\Desktop\Programa\Matrimonio`

### PASO 2: Seleccionar SOLO los Archivos Necesarios

**IMPORTANTE:** NO uses Ctrl+A (seleccionar todo)

En su lugar:

1. **Presiona y mantén presionada la tecla Ctrl**
2. **Click individualmente** en cada archivo/carpeta:

   **Archivos:**
   - Click en `package.json`
   - Click en `package-lock.json`
   - Click en `next.config.js`
   - Click en `tsconfig.json`
   - Click en `tailwind.config.ts`
   - Click en `postcss.config.js`
   - Click en `.eslintrc.json` (puede estar oculto)
   - Click en `.gitignore` (puede estar oculto)

   **Carpetas:**
   - Click en la carpeta `src/`
   - Click en la carpeta `public/`
   - Click en la carpeta `data/`

3. **Suelta la tecla Ctrl**

### PASO 3: Verificar Archivos Seleccionados

**Deberías ver seleccionados EXACTAMENTE:**
- 8 archivos (los mencionados arriba)
- 3 carpetas (`src/`, `public/`, `data/`)

**NO deberías ver seleccionado:**
- `node_modules/`
- `.next/`
- Archivos `.md` (opcional)
- Cualquier otra carpeta o archivo

### PASO 4: Crear el ZIP

1. **Click derecho** sobre uno de los archivos seleccionados
2. **"Enviar a"** → **"Carpeta comprimida (en zip)"**
3. Espera a que se cree el ZIP
4. **Renombra** a: `matrimonio-limpio.zip`

### PASO 5: Verificar el Contenido del ZIP

**Abre el ZIP** y verifica que tenga esta estructura:

```
matrimonio-limpio.zip
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
│   │   ├── auth.ts
│   │   ├── db.ts          ← Este es el correcto (JSON, NO PostgreSQL)
│   │   └── weddingInfo.ts
│   └── types/
├── public/                   ← Carpeta
│   └── images/
└── data/                     ← Carpeta
    └── database.json
```

**VERIFICA que:**
- ✅ `package.json` esté en la raíz del ZIP
- ✅ NO haya una carpeta `Matrimonio/` dentro del ZIP
- ✅ NO haya archivos `migrate.ts`
- ✅ NO haya referencias a PostgreSQL

---

## ✅ Verificación Final

Antes de subir a Vercel:

1. **Abre el ZIP**
2. **Abre la carpeta `src/lib/`**
3. **Verifica que SOLO tenga estos 3 archivos:**
   - ✅ `auth.ts`
   - ✅ `db.ts` (este es el correcto, usa JSON)
   - ✅ `weddingInfo.ts`

4. **Si ves algún otro archivo** (como `migrate.ts`), NO uses ese ZIP

---

## 🚀 Subir a Vercel

Una vez que tengas el ZIP limpio:

1. **Elimina el proyecto actual** en Vercel
2. **Crea un proyecto nuevo**
3. **Sube** `matrimonio-limpio.zip`
4. **Verifica** que Root Directory esté vacío o sea `./`
5. **Configura variables de entorno** ANTES de deploy
6. **Deploy**

---

## 🔍 Si Aún Hay Problemas

Si después de crear el ZIP limpio aún ves errores relacionados con PostgreSQL:

1. **Abre el ZIP** y busca cualquier archivo que contenga:
   - `POSTGRES`
   - `migrate`
   - `postgres`

2. **Si encuentras esos archivos**, significa que:
   - Están dentro de alguna carpeta
   - O hay archivos residuales en tu carpeta local

3. **Solución:**
   - Elimina esos archivos de tu carpeta local primero
   - Luego crea el ZIP de nuevo

---

## 📝 Resumen

**El proyecto usa:**
- ✅ `src/lib/db.ts` → Sistema de archivos JSON
- ✅ `data/database.json` → Almacenamiento

**El proyecto NO usa:**
- ❌ PostgreSQL
- ❌ Archivos de migración
- ❌ Variables POSTGRES_URL

**Tu ZIP debe tener SOLO:**
- 8 archivos de configuración
- 3 carpetas (src/, public/, data/)
- Nada más

---

**¡Con esto debería funcionar!**

