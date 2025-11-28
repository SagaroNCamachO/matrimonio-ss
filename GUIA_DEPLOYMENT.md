# 🚀 Guía de Deployment - Aplicación de Matrimonio

Esta guía te ayudará a subir tu aplicación de matrimonio a un servicio gratuito de hosting.

## 📋 Opciones Recomendadas

### 1. **Vercel** (Recomendado) ⭐
- ✅ **Gratis** para proyectos personales
- ✅ **Perfecto para Next.js** (creado por el mismo equipo)
- ✅ **Deployment automático** desde GitHub
- ✅ **SSL gratuito** (HTTPS)
- ✅ **Dominio personalizado** gratuito
- ✅ **Persistencia de datos** con sistema de archivos (hasta que necesites más)
- ✅ **Sin límite de tiempo** (puede estar activo indefinidamente)

### 2. **Netlify**
- ✅ Gratis para proyectos personales
- ✅ Buen soporte para Next.js
- ✅ SSL gratuito
- ⚠️ Límite de funciones serverless

### 3. **Railway**
- ✅ Gratis con créditos mensuales
- ✅ Persistencia de datos
- ⚠️ Puede requerir pago después de créditos gratuitos

---

## 🎯 Deployment en Vercel (Recomendado)

### Paso 1: Preparar el Proyecto

1. **Asegúrate de tener Git instalado y configurado**
   ```bash
   git --version
   ```

2. **Inicializa Git si no lo has hecho**
   ```bash
   git init
   git add .
   git commit -m "Preparación para deployment"
   ```

### Paso 2: Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta (puedes usar GitHub, Google, o email)
3. Es **completamente gratis** para proyectos personales

### Paso 3: Subir a GitHub (Recomendado)

1. **Crea un repositorio en GitHub:**
   - Ve a [github.com](https://github.com)
   - Crea un nuevo repositorio (puede ser privado)
   - No inicialices con README

2. **Conecta tu proyecto local:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

### Paso 4: Deploy en Vercel

1. **Desde el dashboard de Vercel:**
   - Haz clic en "Add New Project"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio de tu matrimonio

2. **Configuración del proyecto:**
   - **Framework Preset:** Next.js (se detecta automáticamente)
   - **Root Directory:** `./` (raíz del proyecto)
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `.next` (automático)

3. **Variables de Entorno:**
   Agrega estas variables en la sección "Environment Variables":
   ```
   ADMIN_USERNAME=Admin
   ADMIN_PASSWORD=TU_CONTRASEÑA_SEGURA
   ADMIN_TOKEN=TU_TOKEN_SEGURO_ALEATORIO
   NEXT_PUBLIC_BASE_URL=https://tu-proyecto.vercel.app
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_si_la_tienes
   ```

4. **Haz clic en "Deploy"**
   - Vercel construirá y desplegará tu aplicación automáticamente
   - Te dará una URL como: `https://tu-proyecto.vercel.app`

### Paso 5: Configurar Persistencia de Datos

**⚠️ IMPORTANTE:** Vercel usa un sistema de archivos efímero. Para mantener los datos:

**Opción A: Usar Vercel Blob Storage (Recomendado para producción)**
- Necesitarás instalar `@vercel/blob`
- Modificar `src/lib/db.ts` para usar Blob Storage

**Opción B: Usar un servicio de base de datos gratuito**
- **Supabase** (gratis hasta 500MB)
- **PlanetScale** (gratis con límites)
- **MongoDB Atlas** (gratis con límites)

**Opción C: Para desarrollo/pruebas (hasta marzo 2026)**
- Los datos se mantendrán mientras la aplicación esté activa
- Haz backups regulares descargando `data/database.json`
- Vercel mantiene los datos mientras el proyecto esté activo

### Paso 6: Configurar Dominio Personalizado (Opcional)

1. En el dashboard de Vercel, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar DNS

---

## 🔒 Seguridad en Producción

### Cambiar Credenciales por Defecto

**⚠️ CRÍTICO:** Antes de hacer deploy, cambia estas credenciales:

1. **En Vercel → Environment Variables:**
   ```
   ADMIN_PASSWORD=una_contraseña_muy_segura_y_larga
   ADMIN_TOKEN=un_token_aleatorio_muy_largo_y_seguro
   ```

2. **Genera tokens seguros:**
   - Puedes usar: `openssl rand -hex 32` (en terminal)
   - O un generador online: https://randomkeygen.com/

### Protección Adicional

- ✅ Las rutas `/admin` están protegidas con autenticación
- ✅ Los endpoints de API requieren tokens
- ✅ Validación de inputs en todos los formularios
- ✅ Sanitización de nombres de archivo
- ✅ Límites de tamaño de archivos

---

## 📦 Estructura de Archivos para Deployment

Asegúrate de que estos archivos estén en tu repositorio:

```
✅ package.json
✅ next.config.js
✅ tsconfig.json
✅ tailwind.config.ts
✅ .gitignore
✅ src/
✅ public/
✅ data/database.json (con datos iniciales)
```

**NO subas:**
- ❌ `.env.local` (usa variables de entorno en Vercel)
- ❌ `node_modules/` (se instalan automáticamente)
- ❌ `.next/` (se genera en build)

---

## 🔄 Actualizaciones y Mantenimiento

### Hacer Cambios

1. **Edita tu código localmente**
2. **Haz commit y push a GitHub:**
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```
3. **Vercel desplegará automáticamente** los cambios

### Backups

**Haz backups regulares de tus datos:**

1. **Desde el Panel Admin:**
   - Descarga `data/database.json` periódicamente
   - Guarda las imágenes de `public/images/`

2. **Desde Vercel:**
   - Puedes acceder a los logs y archivos del proyecto

---

## 🆘 Solución de Problemas

### La aplicación no se despliega

1. **Revisa los logs en Vercel:**
   - Ve a tu proyecto → Deployments → Ver logs

2. **Verifica las variables de entorno:**
   - Asegúrate de que todas estén configuradas

3. **Prueba localmente primero:**
   ```bash
   npm run build
   npm run start
   ```

### Los datos no se guardan

- Vercel tiene un sistema de archivos efímero
- Considera usar un servicio de base de datos para producción
- O haz backups regulares de `data/database.json`

### Error 404 en rutas

- Asegúrate de que `next.config.js` esté correcto
- Verifica que todas las rutas estén en `src/app/`

---

## 📞 Soporte

- **Documentación de Vercel:** https://vercel.com/docs
- **Documentación de Next.js:** https://nextjs.org/docs
- **Comunidad:** https://github.com/vercel/next.js/discussions

---

## ✅ Checklist Pre-Deployment

- [ ] Cambiar credenciales por defecto (ADMIN_PASSWORD, ADMIN_TOKEN)
- [ ] Configurar variables de entorno en Vercel
- [ ] Probar build local: `npm run build`
- [ ] Verificar que `.gitignore` esté correcto
- [ ] Hacer backup de `data/database.json`
- [ ] Subir código a GitHub
- [ ] Conectar repositorio en Vercel
- [ ] Configurar variables de entorno
- [ ] Hacer deploy
- [ ] Probar la aplicación desplegada
- [ ] Configurar dominio personalizado (opcional)

---

## 🎉 ¡Listo!

Una vez desplegado, tu aplicación estará disponible en:
- **URL pública:** `https://tu-proyecto.vercel.app`
- **Panel Admin:** `https://tu-proyecto.vercel.app/admin`

¡Feliz deployment! 💍

