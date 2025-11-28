# 🚀 Deployment Paso a Paso - Guía Visual

## Opción 1: Vercel CLI (Más Rápido - Sin Git) ⭐ RECOMENDADO

### Paso 1: Instalar Vercel CLI

Abre PowerShell como Administrador y ejecuta:

```powershell
npm install -g vercel
```

### Paso 2: Login en Vercel

```powershell
vercel login
```

Esto abrirá tu navegador para que inicies sesión (puedes crear cuenta gratis en vercel.com).

### Paso 3: Deploy desde tu carpeta

```powershell
cd C:\Users\Usuario\Desktop\Programa\Matrimonio
vercel
```

Sigue las preguntas:
- **Set up and deploy?** → Y (Sí)
- **Which scope?** → Tu cuenta
- **Link to existing project?** → N (No, crear nuevo)
- **Project name?** → matrimonio (o el que prefieras)
- **Directory?** → . (punto, carpeta actual)
- **Override settings?** → N (No)

### Paso 4: Configurar Variables de Entorno

Después del primer deploy, configura las variables:

```powershell
vercel env add ADMIN_USERNAME
# Escribe: Admin

vercel env add ADMIN_PASSWORD
# Escribe: TU_CONTRASEÑA_SEGURA

vercel env add ADMIN_TOKEN
# Escribe: TU_TOKEN_ALEATORIO_SEGURO

vercel env add NEXT_PUBLIC_BASE_URL
# Escribe: https://tu-proyecto.vercel.app (Vercel te dará la URL)
```

### Paso 5: Redesplegar con Variables

```powershell
vercel --prod
```

¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

---

## Opción 2: Con Git y GitHub (Recomendado para actualizaciones)

### Paso 1: Instalar Git

1. Descarga Git: https://git-scm.com/download/win
2. Instala con opciones por defecto
3. Reinicia PowerShell

### Paso 2: Inicializar Git

```powershell
cd C:\Users\Usuario\Desktop\Programa\Matrimonio
git init
git add .
git commit -m "Primera versión - Lista para producción"
```

### Paso 3: Crear Repositorio en GitHub

1. Ve a https://github.com
2. Crea cuenta (si no tienes)
3. Click en "New repository"
4. Nombre: `matrimonio` (o el que prefieras)
5. **NO marques** "Initialize with README"
6. Click "Create repository"

### Paso 4: Conectar y Subir

GitHub te dará comandos, pero aquí están:

```powershell
git remote add origin https://github.com/TU_USUARIO/matrimonio.git
git branch -M main
git push -u origin main
```

### Paso 5: Deploy en Vercel

1. Ve a https://vercel.com
2. Login con GitHub
3. Click "Add New Project"
4. Selecciona tu repositorio `matrimonio`
5. **Configuración automática** (Vercel detecta Next.js)
6. **Agrega Variables de Entorno:**
   - `ADMIN_USERNAME` = `Admin`
   - `ADMIN_PASSWORD` = `TU_CONTRASEÑA_SEGURA`
   - `ADMIN_TOKEN` = `TU_TOKEN_ALEATORIO_SEGURO`
   - `NEXT_PUBLIC_BASE_URL` = `https://tu-proyecto.vercel.app`
7. Click "Deploy"
8. Espera 2-3 minutos
9. ¡Listo!

---

## 🔑 Generar Contraseñas Seguras

### Opción A: Online (Más Fácil)
1. Ve a: https://randomkeygen.com/
2. Usa "Fort Knox Password" para ADMIN_PASSWORD
3. Usa "CodeIgniter Encryption Keys" para ADMIN_TOKEN

### Opción B: Manual
- ADMIN_PASSWORD: Mínimo 16 caracteres, mezcla mayúsculas, minúsculas, números y símbolos
- ADMIN_TOKEN: Al menos 32 caracteres aleatorios

Ejemplo:
- ADMIN_PASSWORD: `Matrimonio2026!Seguro#`
- ADMIN_TOKEN: `a7f3b9c2d8e4f1a6b5c9d2e7f3a8b4c1d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4`

---

## ✅ Verificación Post-Deploy

1. Visita tu URL: `https://tu-proyecto.vercel.app`
2. Verifica que la página carga
3. Prueba el formulario de confirmación
4. Accede al admin: `https://tu-proyecto.vercel.app/admin`
5. Inicia sesión con tus credenciales
6. Verifica que puedes editar información

---

## 🔄 Actualizar la Aplicación

### Con Vercel CLI:
```powershell
vercel --prod
```

### Con Git:
```powershell
git add .
git commit -m "Descripción de cambios"
git push
```
Vercel desplegará automáticamente.

---

## 🆘 Problemas Comunes

### "vercel no se reconoce"
- Instala: `npm install -g vercel`
- Reinicia PowerShell

### "git no se reconoce"
- Instala Git desde: https://git-scm.com/download/win
- Reinicia PowerShell

### Error en build
- Revisa los logs en Vercel dashboard
- Verifica que todas las variables de entorno estén configuradas

---

## 💡 Recomendación

**Usa la Opción 1 (Vercel CLI)** si quieres deploy rápido sin Git.  
**Usa la Opción 2 (Git + GitHub)** si quieres versionar tu código y deployments automáticos.

---

**¿Listo? Empecemos con la Opción 1 (más rápida):**

