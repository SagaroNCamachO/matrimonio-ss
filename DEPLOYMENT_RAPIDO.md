# ⚡ Deployment Rápido - Vercel

## 🎯 Pasos Rápidos (15 minutos)

### 1. Preparar Código (5 min)

```bash
# Asegúrate de estar en la carpeta del proyecto
cd C:\Users\Usuario\Desktop\Programa\Matrimonio

# Inicializar Git (si no lo has hecho)
git init
git add .
git commit -m "Preparación para deployment"
```

### 2. Subir a GitHub (5 min)

1. Ve a [github.com](https://github.com) y crea cuenta (si no tienes)
2. Crea un nuevo repositorio (puede ser privado)
3. Copia la URL del repositorio
4. Ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 3. Deploy en Vercel (5 min)

1. Ve a [vercel.com](https://vercel.com)
2. Crea cuenta (puedes usar GitHub para login rápido)
3. Click en **"Add New Project"**
4. Conecta tu repositorio de GitHub
5. Selecciona el repositorio de tu matrimonio
6. **Configuración automática** (Vercel detecta Next.js)
7. **Agrega estas variables de entorno:**

```
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=TU_CONTRASEÑA_SEGURA_AQUI
ADMIN_TOKEN=TU_TOKEN_ALEATORIO_AQUI
NEXT_PUBLIC_BASE_URL=https://tu-proyecto.vercel.app
```

8. Click en **"Deploy"**
9. Espera 2-3 minutos
10. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

---

## 🔑 Generar Contraseñas Seguras

### Opción 1: Terminal (si tienes OpenSSL)
```bash
# Generar contraseña segura
openssl rand -base64 32

# Generar token seguro
openssl rand -hex 32
```

### Opción 2: Online
- Ve a: https://randomkeygen.com/
- Usa "CodeIgniter Encryption Keys" o "Fort Knox Password"

### Opción 3: Manual
- Crea una contraseña de al menos 16 caracteres
- Mezcla mayúsculas, minúsculas, números y símbolos
- Ejemplo: `Matrimonio2026!Seguro#`

---

## ✅ Verificación Post-Deploy

1. **Visita tu URL:** `https://tu-proyecto.vercel.app`
2. **Prueba el frontend:**
   - Verifica que la página carga
   - Revisa que las imágenes se ven
   - Prueba el formulario de confirmación

3. **Prueba el admin:**
   - Ve a `https://tu-proyecto.vercel.app/admin`
   - Inicia sesión con tus credenciales
   - Verifica que puedes editar información

---

## 🔄 Actualizar la Aplicación

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de cambios"
git push
```

Vercel desplegará automáticamente los cambios en 1-2 minutos.

---

## 📞 ¿Problemas?

- **Error en build:** Revisa los logs en Vercel → Deployments
- **No carga:** Verifica las variables de entorno
- **Datos no se guardan:** Normal en Vercel (haz backups)

---

## 💡 Tips

- ✅ Vercel es **gratis** para siempre en plan personal
- ✅ SSL/HTTPS es **automático y gratuito**
- ✅ Puedes agregar dominio personalizado después
- ✅ Los datos se mantienen mientras el proyecto esté activo
- ✅ Hasta marzo 2026 no hay problema de tiempo

---

**¡Tu aplicación estará online en menos de 15 minutos!** 🚀

