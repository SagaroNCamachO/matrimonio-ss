# 🆘 Solución de Errores Comunes en Vercel

## ❌ Error: "Build Failed"

### Causa 1: Faltan Variables de Entorno

**Síntoma:**
```
Error: Missing environment variable
```

**Solución:**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables requeridas:
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
   - ADMIN_TOKEN
   - NEXT_PUBLIC_BASE_URL
4. Asegúrate de marcar "Production"
5. Haz un nuevo deploy

---

### Causa 2: Archivos Faltantes en el ZIP

**Síntoma:**
```
Error: Cannot find module
Error: File not found
```

**Solución:**
1. Verifica que el ZIP incluya:
   - ✅ `package.json`
   - ✅ Carpeta `src/` completa
   - ✅ Carpeta `public/` completa
   - ✅ Carpeta `data/` completa
2. Crea un nuevo ZIP con todos los archivos
3. Sube el nuevo ZIP

---

### Causa 3: Error en el Código

**Síntoma:**
```
Error: Syntax error
Error: Type error
```

**Solución:**
1. En Vercel → Deployments → Click en el deployment fallido
2. Lee los logs completos
3. Busca el error específico
4. Corrígelo en tu código local
5. Crea nuevo ZIP y vuelve a subir

---

## ❌ Error: "Cannot find module '@/...'"

**Solución:**
1. Verifica que `tsconfig.json` tenga la configuración de paths
2. Verifica que `src/` esté completa en el ZIP
3. Asegúrate de que no falten archivos en `src/lib/` o `src/types/`

---

## ❌ Error: "No se puede iniciar sesión en admin"

**Solución:**
1. Verifica las variables de entorno:
   - `ADMIN_USERNAME` debe ser exactamente `Admin`
   - `ADMIN_PASSWORD` debe ser la que configuraste
2. Asegúrate de que las variables estén en "Production"
3. Haz un nuevo deploy después de cambiar variables
4. Espera 1-2 minutos después del deploy

---

## ❌ Error: "Las imágenes no se muestran"

**Solución:**
1. Verifica que la carpeta `public/images/` esté en el ZIP
2. Verifica que las rutas en `database.json` sean correctas
3. Si usas URLs externas, verifica que sean públicas
4. Revisa la consola del navegador (F12) para ver errores

---

## ❌ Error: "Module not found: Can't resolve '...'"

**Solución:**
1. Verifica que `package.json` tenga todas las dependencias
2. Verifica que el ZIP incluya `package.json`
3. Vercel instalará las dependencias automáticamente

---

## ❌ Error: "Build timeout" o "Build takes too long"

**Solución:**
1. Verifica que NO incluyas `node_modules/` en el ZIP
2. El ZIP debe ser menor a 100MB
3. Si es muy grande, excluye archivos de documentación grandes

---

## 📋 Checklist de Verificación

Antes de subir, verifica:

- [ ] El ZIP incluye `package.json`
- [ ] El ZIP incluye carpeta `src/` completa
- [ ] El ZIP incluye carpeta `public/` completa
- [ ] El ZIP incluye carpeta `data/` completa
- [ ] El ZIP NO incluye `node_modules/`
- [ ] El ZIP NO incluye `.next/`
- [ ] Variables de entorno configuradas
- [ ] Todas las variables marcadas en "Production"

---

## 🔍 Cómo Ver los Logs de Error

1. En Vercel → Tu proyecto
2. Click en "Deployments"
3. Click en el deployment fallido (marcado en rojo)
4. Verás los logs completos del error
5. Busca la línea que dice "Error:" o "Failed:"
6. Esa es la causa del problema

---

## 💡 Tips

- ✅ Siempre verifica los logs en Vercel
- ✅ El error específico está al final de los logs
- ✅ Copia el error completo y búscalo en Google
- ✅ O avísame el error y te ayudo a resolverlo

---

**¿Ves un error específico? Compártelo y te ayudo a solucionarlo.**

