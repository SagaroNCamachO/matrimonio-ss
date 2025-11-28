# 🚀 Guía Paso a Paso para Iniciar tu Aplicación

## 📋 Antes de Empezar

### ¿Qué necesitas?
1. **Una computadora** (Windows, Mac o Linux)
2. **Conexión a Internet**
3. **Node.js instalado** (te explico cómo más abajo)

---

## Paso 1: Instalar Node.js

Node.js es necesario para ejecutar la aplicación.

### Windows:
1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS** (la recomendada, botón verde)
3. Ejecuta el instalador
4. Sigue las instrucciones (solo haz clic en "Siguiente" en todo)
5. Reinicia tu computadora

### Mac:
1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS**
3. Abre el archivo descargado (.pkg)
4. Sigue las instrucciones del instalador
5. Reinicia tu computadora

### Verificar instalación:
1. Abre la **Terminal** (Windows: PowerShell, Mac: Terminal)
2. Escribe: `node --version`
3. Deberías ver algo como: `v20.x.x`
4. Si aparece un error, Node.js no está instalado correctamente

---

## Paso 2: Abrir la Carpeta del Proyecto

### Opción A: Desde el Explorador de Archivos
1. Abre el Explorador de Archivos (Windows) o Finder (Mac)
2. Navega a: `C:\Users\Usuario\Desktop\Programa\Matrimonio`
3. Haz clic derecho en la carpeta
4. Selecciona "Abrir en Terminal" o "Abrir PowerShell aquí"

### Opción B: Desde la Terminal
1. Abre la Terminal/PowerShell
2. Escribe:
   ```bash
   cd C:\Users\Usuario\Desktop\Programa\Matrimonio
   ```
3. Presiona Enter

---

## Paso 3: Instalar las Dependencias

Las "dependencias" son las herramientas que necesita la aplicación para funcionar.

1. En la Terminal, escribe:
   ```bash
   npm install
   ```
2. Presiona Enter
3. **Espera** (puede tardar 2-5 minutos la primera vez)
4. Verás muchos mensajes, es normal
5. Cuando termine, verás algo como: "added 500 packages"

**⚠️ Si aparece un error:**
- Asegúrate de estar en la carpeta correcta
- Verifica que Node.js esté instalado (`node --version`)
- Intenta de nuevo

---

## Paso 4: Iniciar la Aplicación

1. En la Terminal, escribe:
   ```bash
   npm run dev
   ```
2. Presiona Enter
3. Verás un mensaje como:
   ```
   ▲ Next.js 14.2.5
   - Local:        http://localhost:3000
   ```
4. **¡La aplicación está funcionando!** 🎉

---

## Paso 5: Abrir en el Navegador

1. Abre tu navegador (Chrome, Firefox, Edge, etc.)
2. En la barra de direcciones, escribe:
   ```
   http://localhost:3000
   ```
3. Presiona Enter
4. **¡Deberías ver tu aplicación de matrimonio!** 💍

---

## 🎯 Cómo Usar la Aplicación

### Página Principal (Inicio)
- Muestra información sobre tu matrimonio
- Fecha, hora, lugares
- Código de vestimenta
- Información de regalos

### Gestión de Invitados
1. Haz clic en **"Invitados"** en el menú superior
2. Haz clic en **"Agregar Invitado"**
3. Llena el formulario:
   - Nombre (obligatorio)
   - Email (opcional)
   - Teléfono (opcional)
   - Marca "Confirmado" si ya confirmó asistencia
   - Notas (opcional)
4. Haz clic en **"Agregar"**
5. ¡Listo! El invitado aparece en la lista

**Para editar:** Haz clic en el ícono de lápiz ✏️
**Para eliminar:** Haz clic en el ícono de papelera 🗑️

### Distribución de Mesas
1. Haz clic en **"Mesas"** en el menú superior
2. Haz clic en **"Nueva Mesa"**
3. Escribe el nombre (ej: "Mesa 1" o "Mesa Principal")
4. Selecciona la capacidad (1-10 personas)
5. Haz clic en **"Crear"**
6. Para asignar invitados:
   - En cada mesa, hay un dropdown "Agregar invitado..."
   - Selecciona un invitado de la lista
   - ¡Se asignará automáticamente!

**Para cambiar la capacidad:** Haz clic en el ícono de configuración ⚙️

### Control de Gastos
1. Haz clic en **"Gastos"** en el menú superior
2. Primero, configura tu presupuesto:
   - Haz clic en **"Presupuesto"**
   - Escribe el monto total
   - Haz clic en **"Actualizar"**
3. Para agregar un gasto:
   - Haz clic en **"Agregar Gasto"**
   - Llena el formulario:
     - Descripción (ej: "Decoración floral")
     - Cantidad en euros
     - Categoría (selecciona de la lista)
     - Fecha
     - Notas (opcional)
   - Haz clic en **"Agregar"**
4. Verás:
   - Total gastado
   - Presupuesto restante
   - Barra de progreso (verde = bien, rojo = sobrepasado)

---

## ⚠️ Problemas Comunes y Soluciones

### "npm no se reconoce"
**Solución:** Node.js no está instalado o no está en el PATH
- Reinstala Node.js
- Reinicia la computadora
- Abre una nueva Terminal

### "Puerto 3000 ya está en uso"
**Solución:** Otra aplicación está usando el puerto
- Cierra otras aplicaciones
- O cambia el puerto en `package.json` (línea "dev": "next dev -p 3001")

### La página no carga
**Solución:**
- Verifica que el servidor esté corriendo (deberías ver mensajes en la Terminal)
- Asegúrate de escribir: `http://localhost:3000` (no `https://`)
- Prueba en otro navegador

### Los datos desaparecen
**Solución:** Los datos se guardan en el navegador
- Si cambias de navegador, los datos no aparecerán
- Si borras la caché del navegador, se perderán
- **Recomendación:** No borres los datos del navegador mientras uses la app

### La aplicación es muy lenta
**Solución:**
- Cierra otras pestañas del navegador
- Reinicia el servidor (Ctrl+C y luego `npm run dev` de nuevo)
- Reinicia tu computadora

---

## 🛑 Cómo Detener la Aplicación

1. Ve a la Terminal donde está corriendo
2. Presiona: `Ctrl + C` (Windows) o `Cmd + C` (Mac)
3. Verás: "Terminated"
4. La aplicación se detendrá

**Para volver a iniciarla:** Ejecuta `npm run dev` de nuevo

---

## 💡 Consejos Útiles

1. **Mantén la Terminal abierta** mientras uses la app
2. **No cierres la ventana del navegador** con la app abierta
3. **Guarda tus datos regularmente** (se guardan automáticamente, pero es bueno verificar)
4. **Haz respaldos:** Anota tus invitados y gastos en un Excel por si acaso

---

## 📞 ¿Necesitas Más Ayuda?

### Comandos Útiles:

```bash
# Ver versión de Node.js
node --version

# Ver versión de npm
npm --version

# Instalar dependencias (si algo falla)
npm install

# Iniciar la aplicación
npm run dev

# Detener la aplicación
Ctrl + C (o Cmd + C en Mac)
```

### Estructura de Carpetas Importante:

```
Matrimonio/
├── src/
│   ├── app/          # Páginas de la aplicación
│   ├── components/   # Componentes reutilizables
│   ├── data/         # Datos del matrimonio (edita aquí)
│   └── context/      # Lógica de la aplicación
├── package.json      # Configuración del proyecto
└── README.md         # Documentación
```

---

## 🎉 ¡Listo!

Ya tienes todo lo necesario para usar tu aplicación de matrimonio. 

**Recuerda:**
- La aplicación se ejecuta en tu computadora
- Los datos se guardan en tu navegador
- Puedes cerrar y abrir la app cuando quieras
- Los datos se mantienen (mientras no borres la caché)

¡Disfruta organizando tu matrimonio! 💍✨



