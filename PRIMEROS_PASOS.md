# 🎯 Primeros Pasos - Guía Visual

## 🖼️ Vista General de la Aplicación

```
┌─────────────────────────────────────────────────────────┐
│  💍 Matrimonio          [Inicio] [Panel Admin]        │  ← Menú superior
├─────────────────────────────────────────────────────────┤
│                                                           │
│              💕 Juan & María                              │
│                                                           │
│              Nos casamos                                 │
│         Sábado, 15 de diciembre de 2024                  │
│                  A las 16:00 horas                       │
│                                                           │
│  [Scroll para ver más información]                       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📱 Navegación por la Aplicación

### 1️⃣ Página de Inicio
**Qué verás:**
- Nombre de los novios
- Fecha y hora del matrimonio
- Información de la ceremonia (con mapa)
- Información de la fiesta (con mapa)
- Código de vestimenta
- Información de regalos
- Información adicional

**Qué hacer aquí:**
- Personaliza la información desde el panel `/admin` (pestaña **Información**). Allí puedes editar nombres, fecha, textos, lugares, mensaje de WhatsApp y datos bancarios.
- Esta es la página pública que verán tus invitados.

---

### 2️⃣ Gestión de Invitados

**Cómo llegar:**
1. Abre `http://localhost:3000/admin`
2. Inicia sesión con tu usuario/contraseña
3. Selecciona la pestaña **Invitados**

**Agregar tu primer invitado:**
```
┌─────────────────────────────────────┐
│  [Agregar Invitado]  ← Clic aquí    │
└─────────────────────────────────────┘

Se abre un formulario:
┌─────────────────────────────────────┐
│  Nuevo Invitado                      │
│                                      │
│  Nombre *: [_____________]           │
│  Email:    [_____________]           │
│  Teléfono: [_____________]           │
│  ☑ Confirmado                        │
│  Notas:    [_____________]           │
│                                      │
│  [Cancelar]  [Agregar]               │
└─────────────────────────────────────┘
```

**Después de agregar:**
- El invitado aparece en una tarjeta
- Puedes ver: nombre, email, teléfono, estado de confirmación
- Botones para editar (✏️) y eliminar (🗑️)

**Ejemplo de tarjeta:**
```
┌──────────────────────────────┐
│  María García          ✏️ 🗑️ │
│  ✓ Confirmado                │
│  📧 maria@email.com          │
│  📞 +34 600 000 000          │
└──────────────────────────────┘
```

---

### 3️⃣ Distribución de Mesas

**Cómo llegar:**
1. Inicia sesión en `/admin`
2. Abre la pestaña **Mesas**

**Crear tu primera mesa:**
```
┌─────────────────────────────────────┐
│  [Nueva Mesa]  ← Clic aquí          │
└─────────────────────────────────────┘

Se abre un formulario:
┌─────────────────────────────────────┐
│  Nueva Mesa                          │
│                                      │
│  Nombre: [Mesa 1________]            │
│  Capacidad: [8] (1-10)               │
│                                      │
│  [Cancelar]  [Crear]                 │
└─────────────────────────────────────┘
```

**Después de crear:**
- La mesa aparece como una tarjeta
- Muestra: nombre, capacidad, invitados asignados
- Barra de progreso (cuántos lugares ocupados)

**Asignar invitados:**
```
┌──────────────────────────────┐
│  Mesa 1              ⚙️ ✏️ 🗑️ │
│  0 / 8 invitados             │
│  ░░░░░░░░░░ (0%)             │
│                              │
│  [Agregar invitado... ▼]     │ ← Dropdown
│                              │
└──────────────────────────────┘

Al hacer clic en el dropdown:
┌──────────────────────────────┐
│  Agregar invitado...          │
│  ├─ Juan Pérez                │ ← Selecciona
│  ├─ María García              │
│  └─ Pedro López               │
└──────────────────────────────┘
```

**Vista de mesa completa:**
```
┌──────────────────────────────┐
│  Mesa 1              ⚙️ ✏️ 🗑️ │
│  8 / 8 invitados             │
│  ████████████ (100%)         │
│                              │
│  • Juan Pérez        [Quitar]│
│  • María García      [Quitar]│
│  • Pedro López       [Quitar]│
│  ... (5 más)                 │
│                              │
│  ✓ Mesa completa             │
└──────────────────────────────┘
```

---

### 4️⃣ Control de Gastos

**Cómo llegar:**
1. Ingresa al panel `/admin`
2. Abre la pestaña **Gastos**

**Configurar presupuesto (PRIMERO):**
```
┌─────────────────────────────────────┐
│  [Presupuesto]  ← Clic aquí         │
└─────────────────────────────────────┘

Se abre un formulario:
┌─────────────────────────────────────┐
│  Configurar Presupuesto              │
│                                      │
│  Presupuesto Total (CLP): [5000000] │
│                                      │
│  [Cancelar]  [Actualizar]           │
└─────────────────────────────────────┘
```

**Después de configurar:**
```
┌─────────────────────────────────────┐
│  Presupuesto Total:  $5.000.000    │
│  Gastado:           $1.250.000     │
│  Restante:          $3.750.000     │
│                                      │
│  Progreso: 25%                      │
│  ████████░░░░░░░░░░                  │
└─────────────────────────────────────┘
```

**Agregar un gasto:**
```
┌─────────────────────────────────────┐
│  [Agregar Gasto]  ← Clic aquí       │
└─────────────────────────────────────┘

Se abre un formulario:
┌─────────────────────────────────────┐
│  Nuevo Gasto                         │
│                                      │
│  Descripción *: [Decoración floral]  │
│  Cantidad (CLP) *: [500000]          │
│  Categoría *:    [Decoración ▼]     │
│  Fecha *:        [2024-12-01]       │
│  Notas:          [Flores rojas...]  │
│                                      │
│  [Cancelar]  [Agregar]               │
└─────────────────────────────────────┘
```

**Vista de gastos:**
```
┌─────────────────────────────────────┐
│  Decoración floral                  │
│  Decoración   15 dic 2024            │
│  $500.000                  ✏️ 🗑️   │
├─────────────────────────────────────┤
│  Fotografía                          │
│  Fotografía   10 nov 2024            │
│  $750.000                  ✏️ 🗑️   │
└─────────────────────────────────────┘
```

---

## 🎨 Colores y Significados

### En la sección de Gastos:
- 🟢 **Verde**: Menos del 80% del presupuesto usado
- 🟡 **Amarillo**: Entre 80-100% del presupuesto
- 🔴 **Rojo**: Más del 100% (sobrepasaste el presupuesto)

### En las Mesas:
- 🟢 **Verde**: Mesa completa
- 🟣 **Morado**: Mesa con espacio disponible

---

## 💡 Consejos Prácticos

### Orden Recomendado
1. ✅ **Configura la información general** (pestaña Información).
2. ✅ **Comparte el enlace público** (`/` + botón WhatsApp).
3. ✅ **Carga la lista de invitados** (pestaña Invitados).
4. ✅ **Diseña las mesas** y asigna invitados.
5. ✅ **Controla el presupuesto y gastos**.

### Datos guardados automáticamente
- Lista de invitados (incluye confirmados vía WhatsApp).
- Mesas y asignaciones.
- Gastos y presupuesto.
- Información visual y mensaje de WhatsApp.

**⚠️ Importante:**
- Todo se guarda en `data/database.json`.
- Realiza copias de ese archivo como respaldo.
- Para producción multiusuario considera mover los datos a una base externa.

---

## 🔄 Flujo de Trabajo Típico

```
1. Arranca la app
   └─> npm run dev
   └─> Abrir http://localhost:3000

2. Configura la información general
   └─> Entrar a http://localhost:3000/admin
   └─> Login (Admin / 12345)
   └─> Pestaña "Información"

3. Carga invitados y comparte el enlace
   └─> Pestaña "Invitados" → agregar datos
   └─> Compartir landing o botón de WhatsApp

4. Diseña las mesas
   └─> Pestaña "Mesas" → crear mesas y asignar

5. Controla los gastos
   └─> Pestaña "Gastos" → presupuesto + registros

6. Verifica la landing pública
   └─> Revisar http://localhost:3000
   └─> Probar formulario /confirmar
```

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo cambiar la capacidad de una mesa después de crearla?**
R: Sí, modifica el campo de capacidad dentro de la tarjeta de la mesa (entre 1 y 10 personas).

**P: ¿Qué pasa si asigno más invitados que la capacidad?**
R: La aplicación lo evita automáticamente y muestra un mensaje de error.

**P: ¿Puedo eliminar un invitado que ya está en una mesa?**
R: Sí, al eliminar un invitado, se quita automáticamente de su mesa.

**P: ¿Los gastos se descuentan automáticamente del presupuesto?**
R: Sí, el presupuesto restante se calcula automáticamente.

**P: ¿Puedo exportar los datos?**
R: Los datos viven en `data/database.json`. Haz una copia de ese archivo cuando quieras respaldos o usarlo en otra máquina.

---

## 🎉 ¡Ya Estás Listo!

Con esta guía visual deberías poder usar la aplicación sin problemas. 

**Recuerda:**
- Todo se guarda automáticamente en `data/database.json`
- Puedes editar y eliminar cuando quieras desde el panel
- La aplicación funciona completamente en tu computadora
- No necesitas internet después de instalar (excepto para mapas y WhatsApp)

¡Disfruta organizando tu matrimonio! 💍✨



