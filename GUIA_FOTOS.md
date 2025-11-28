# 📸 Guía para Subir y Gestionar Fotos

Esta guía te explica cómo subir fotos desde tu PC o teléfono y gestionar la galería de fotos de tu sitio web de matrimonio.

## 🎯 Cómo Subir Fotos

### Desde el Panel Admin

1. **Accede al Panel Admin**
   - Ve a `http://localhost:3000/admin`
   - Inicia sesión con:
     - Usuario: `Admin`
     - Contraseña: `12345`

2. **Ve a la pestaña "Información"**
   - En el panel admin, haz clic en la pestaña **"Información"**
   - Desplázate hasta la sección **"Galería de Fotos"**

3. **Sube una foto desde tu PC o teléfono**
   - En la sección "Subir nueva foto":
     - Haz clic en **"Elegir archivo"** o **"Seleccionar archivo"**
     - Busca la foto en tu computadora o teléfono
     - Escribe una descripción (ej: "Nuestra ceremonia en la iglesia")
     - La foto se subirá automáticamente cuando selecciones el archivo

### Formatos Permitidos
- ✅ **JPG / JPEG** (recomendado)
- ✅ **PNG**
- ✅ **WEBP**
- ❌ Tamaño máximo: **5MB por foto**

### ¿Dónde se guardan las fotos?
Las fotos se guardan en la carpeta `public/images/` de tu proyecto. Esta carpeta se crea automáticamente la primera vez que subes una foto.

## ✏️ Editar Descripciones de Fotos

Las descripciones son los textos que aparecen en el carrusel de fotos en el frontend.

1. **En la lista de fotos** (debajo del formulario de subida):
   - Cada foto muestra un campo de texto con su descripción actual
   - Simplemente **escribe o edita** el texto en ese campo
   - Los cambios se guardan automáticamente cuando guardas los cambios en el panel admin

### Ejemplos de Descripciones
- "Nuestra ceremonia en la iglesia"
- "Mesa romántica decorada"
- "Detalles florales en tonos palo rosa"
- "Primer baile como esposos"
- "Celebración con familia y amigos"

## 🔄 Reordenar Fotos

Puedes cambiar el orden en que aparecen las fotos en el carrusel:

1. **Mover una foto hacia arriba**: Haz clic en el botón **↑** (flecha arriba)
2. **Mover una foto hacia abajo**: Haz clic en el botón **↓** (flecha abajo)

Las fotos se numeran automáticamente (1, 2, 3...) para que sepas su orden actual.

## 🗑️ Eliminar Fotos

1. En la lista de fotos, encuentra la foto que quieres eliminar
2. Haz clic en el botón **"Eliminar"** (botón rojo)
3. La foto se eliminará de la galería

**⚠️ Nota:** Si la foto está guardada localmente (en `public/images/`), el archivo físico también se eliminará del servidor.

## 📱 Agregar Fotos desde URL Externa

Si tienes una foto en internet (por ejemplo, en Google Drive, Dropbox, etc.):

1. En la sección **"O agrega una URL externa"**:
   - Pega la URL completa de la imagen (debe terminar en .jpg, .png, etc.)
   - Escribe una descripción
   - Haz clic en **"Agregar URL"**

**⚠️ Importante:** Las URLs externas pueden dejar de funcionar si el enlace expira o se elimina la imagen. Se recomienda subir las fotos localmente.

## 💾 Guardar Cambios

**IMPORTANTE:** Después de subir, editar o eliminar fotos, **debes hacer clic en el botón "Guardar Cambios"** al final de la pestaña "Información" para que los cambios se guarden permanentemente.

## 🎨 Ver las Fotos en el Frontend

Las fotos aparecen en la sección **"Nuestra paleta palo rosa"** del sitio web principal. Cada foto muestra:
- La imagen
- La descripción que escribiste (en la parte inferior de la foto)

## ❓ Solución de Problemas

### "Error al subir la foto"
- Verifica que el archivo sea menor a 5MB
- Asegúrate de que el formato sea JPG, PNG o WEBP
- Verifica que tengas espacio en disco

### "La foto no se muestra"
- Verifica que hayas guardado los cambios en el panel admin
- Si es una URL externa, verifica que el enlace sea público y accesible
- Recarga la página del frontend (Ctrl+F5 o Cmd+Shift+R)

### "No puedo ver las fotos en el panel admin"
- Verifica que la carpeta `public/images/` exista
- Si no existe, créala manualmente o sube una foto (se creará automáticamente)

## 📂 Estructura de Archivos

```
Matrimonio/
├── public/
│   └── images/          ← Aquí se guardan las fotos subidas
│       ├── 1234567890_foto1.jpg
│       ├── 1234567891_foto2.png
│       └── ...
└── data/
    └── database.json    ← Aquí se guardan las referencias a las fotos
```

## 💡 Consejos

1. **Nombra tus fotos descriptivamente** antes de subirlas para encontrarlas fácilmente
2. **Optimiza las fotos** antes de subirlas (reduce el tamaño si son muy grandes)
3. **Usa descripciones claras** para que los invitados entiendan qué representa cada foto
4. **Ordena las fotos** de manera que cuenten una historia (ceremonia → recepción → celebración)
5. **Guarda regularmente** después de hacer cambios importantes
