# 📸 Guía para Subir Fotos desde PC o Teléfono

## 🎯 Cómo Subir Fotos

### Opción 1: Desde el Panel Admin (Recomendado)

1. **Accede al panel admin:**
   - Ve a `http://localhost:3000/admin`
   - Inicia sesión con: Usuario `Admin` / Contraseña `12345`

2. **Ve a la pestaña "Información":**
   - Haz clic en el botón "Información" en la parte superior

3. **Baja hasta "Galería de Fotos":**
   - Verás dos opciones para agregar fotos

#### Subir desde tu PC o Teléfono:

1. En la sección **"Subir nueva foto"**:
   - Haz clic en el botón "Elegir archivo" o "Seleccionar archivo"
   - Busca la foto en tu computadora o teléfono
   - Escribe una descripción (ej: "Nuestra primera foto juntos")
   - La foto se subirá automáticamente cuando la selecciones

2. **Formatos permitidos:**
   - JPG / JPEG
   - PNG
   - WEBP

3. **Tamaño máximo:** 10MB por foto

4. **Las fotos se guardan en:** `public/images/` (en tu proyecto)

#### Agregar URL externa:

Si prefieres usar una foto que ya está en internet:

1. En la sección **"O agrega una URL externa"**:
   - Pega la URL de la imagen (ej: `https://ejemplo.com/foto.jpg`)
   - Escribe una descripción
   - Haz clic en "Agregar"

---

## ✏️ Editar Descripciones

1. **En la lista de fotos:**
   - Verás todas las fotos que has subido
   - Cada foto tiene un campo de texto con su descripción
   - **Simplemente edita el texto** y haz clic en "Guardar cambios" al final del formulario

2. **La descripción aparece:**
   - Debajo de cada foto en la galería del sitio web
   - Como texto alternativo (alt) para accesibilidad

---

## 🗑️ Eliminar Fotos

1. **En la lista de fotos:**
   - Cada foto tiene un botón "Eliminar" a la derecha
   - Haz clic en "Eliminar" para quitar la foto de la galería
   - **Nota:** Esto solo la quita de la galería, el archivo físico permanece en `public/images/`

---

## 📱 Desde el Teléfono

### Si estás en la misma red WiFi:

1. **Abre el panel admin en tu teléfono:**
   - Ve a `http://IP_DE_TU_COMPUTADORA:3000/admin`
   - Ejemplo: `http://192.168.1.100:3000/admin`
   - Para saber la IP de tu computadora:
     - Windows: Abre PowerShell y escribe `ipconfig`
     - Mac/Linux: Abre Terminal y escribe `ifconfig` o `ip addr`

2. **Sube las fotos igual que desde la PC:**
   - El proceso es exactamente el mismo
   - Puedes seleccionar fotos desde la galería de tu teléfono

### Si estás en una red diferente:

Necesitarás desplegar la aplicación en internet (Vercel, Netlify, etc.) para acceder desde cualquier lugar.

---

## 📂 Dónde se Guardan las Fotos

Las fotos se guardan en:
```
tu-proyecto/
└── public/
    └── images/
        ├── 1234567890_foto1.jpg
        ├── 1234567891_foto2.png
        └── ...
```

**Importante:**
- Las fotos son accesibles públicamente en: `http://localhost:3000/images/nombre-archivo.jpg`
- Si haces respaldo del proyecto, incluye la carpeta `public/images/`
- Si subes el proyecto a GitHub, las fotos también se subirán (a menos que las ignores en `.gitignore`)

---

## ✅ Pasos Rápidos

1. ✅ Ve a `/admin` → pestaña **Información**
2. ✅ Baja hasta **"Galería de Fotos"**
3. ✅ Haz clic en **"Elegir archivo"** y selecciona tu foto
4. ✅ Escribe una **descripción**
5. ✅ La foto se sube automáticamente
6. ✅ **Edita las descripciones** directamente en los campos de texto
7. ✅ Haz clic en **"Guardar cambios"** al final del formulario
8. ✅ Recarga la página principal para ver tus fotos

---

## 🆘 Problemas Comunes

### La foto no se sube
- Verifica que el archivo sea JPG, PNG o WEBP
- Asegúrate de que el tamaño sea menor a 10MB
- Verifica que tengas permisos de escritura en la carpeta `public/images/`

### La foto no se ve en el sitio
- Recarga la página principal (Ctrl+F5 o Cmd+Shift+R)
- Verifica que hayas guardado los cambios en el panel admin
- Revisa la consola del navegador por errores

### No puedo acceder desde el teléfono
- Asegúrate de estar en la misma red WiFi
- Verifica que el firewall no esté bloqueando el puerto 3000
- Usa la IP correcta de tu computadora

### Las fotos son muy grandes
- Antes de subir, redimensiona las fotos con:
  - [TinyPNG](https://tinypng.com) - Comprime sin perder calidad
  - [Squoosh](https://squoosh.app) - Redimensiona y comprime
  - Apps del teléfono: "Redimensionar imagen"

---

## 💡 Consejos

1. **Optimiza antes de subir:**
   - Redimensiona a máximo 1200px de ancho
   - Comprime con TinyPNG para reducir el tamaño
   - Esto hará que la página cargue más rápido

2. **Nombres descriptivos:**
   - Las descripciones aparecen en el sitio web
   - Usa nombres claros: "Ceremonia en la iglesia", "Primer baile", etc.

3. **Cantidad recomendada:**
   - Entre 3 y 9 fotos es ideal
   - Demasiadas fotos pueden hacer lenta la carga

4. **Respaldo:**
   - Haz una copia de la carpeta `public/images/` regularmente
   - Así no perderás tus fotos si algo pasa

---

¡Listo! Ya puedes subir tus propias fotos desde tu PC o teléfono. 📸💍

