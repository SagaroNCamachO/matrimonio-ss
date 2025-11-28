# ✅ Checklist de Producción

## 🔒 Seguridad

- [x] Validación de inputs en formularios
- [x] Sanitización de datos de usuario
- [x] Validación de formato de email
- [x] Límites de longitud de campos
- [x] Validación de tipos de archivo
- [x] Límites de tamaño de archivos (5MB)
- [x] Autenticación en rutas admin
- [x] Protección de endpoints de API
- [x] Sanitización de nombres de archivo
- [ ] **CAMBIAR credenciales por defecto antes de deploy**

## 🧪 Pruebas Funcionales

### Frontend
- [ ] Página principal carga correctamente
- [ ] Hero muestra imagen y contador regresivo
- [ ] Información del evento muestra fechas/horas correctas
- [ ] Mapas se muestran correctamente
- [ ] Galería de fotos funciona
- [ ] Formulario de confirmación funciona
- [ ] Diseño responsive (móvil/tablet/desktop)

### Backend
- [ ] Login admin funciona
- [ ] Panel admin carga datos
- [ ] Edición de información funciona
- [ ] Subida de imágenes funciona
- [ ] Gestión de invitados funciona
- [ ] Gestión de mesas funciona
- [ ] Gestión de gastos funciona
- [ ] Confirmación de asistencia guarda datos

### API
- [ ] `/api/auth/login` - Autenticación
- [ ] `/api/admin/info` - Información del matrimonio
- [ ] `/api/admin/guests` - CRUD invitados
- [ ] `/api/admin/tables` - CRUD mesas
- [ ] `/api/admin/expenses` - CRUD gastos
- [ ] `/api/admin/upload` - Subida de archivos
- [ ] `/api/confirm` - Confirmación pública
- [ ] `/api/public/info` - Información pública

## 📦 Preparación para Deployment

- [x] `.gitignore` configurado correctamente
- [x] `.env.example` creado
- [x] `package.json` con scripts correctos
- [x] `next.config.js` configurado
- [ ] Build local exitoso: `npm run build`
- [ ] Variables de entorno documentadas
- [ ] README actualizado

## 🚀 Deployment

- [ ] Repositorio Git creado
- [ ] Código subido a GitHub
- [ ] Cuenta Vercel creada
- [ ] Proyecto conectado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Deploy exitoso
- [ ] URL pública funcionando
- [ ] Panel admin accesible
- [ ] Pruebas en producción

## 📝 Datos

- [ ] Backup de `data/database.json`
- [ ] Backup de imágenes en `public/images/`
- [ ] Verificar que datos iniciales estén correctos

---

## 🎯 Comandos de Verificación

```bash
# 1. Verificar instalación
npm run verificar

# 2. Probar build
npm run build

# 3. Probar producción local
npm run start

# 4. Linter
npm run lint
```

---

## ⚠️ Antes de Deploy

1. **Cambiar credenciales:**
   - Generar `ADMIN_PASSWORD` seguro
   - Generar `ADMIN_TOKEN` aleatorio largo

2. **Verificar variables de entorno:**
   - Todas las variables deben estar configuradas
   - `NEXT_PUBLIC_BASE_URL` debe ser la URL de producción

3. **Hacer backup:**
   - Descargar `data/database.json`
   - Descargar imágenes importantes

---

**Fecha de revisión:** Diciembre 2024

