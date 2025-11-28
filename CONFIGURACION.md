# 📋 Guía de Configuración Rápida

## 1. Personalizar Información del Matrimonio

Tienes dos opciones:

1. **Panel Admin** (`/admin`) → pestaña **Información** (recomendado).  
   Inicia sesión con `Admin / 12345` y modifica todo desde la interfaz.
2. **Archivo** `data/database.json` → ideal para respaldos o ediciones rápidas con un editor de texto.

### Datos Básicos
```typescript
couple: {
  name1: 'Tu Nombre',
  name2: 'Nombre de tu Pareja',
},
date: '2024-12-15', // Formato: YYYY-MM-DD
time: '16:00', // Formato: HH:MM
```

### Ubicaciones

#### Ceremonia (Iglesia)
```typescript
ceremony: {
  name: 'Nombre de la Iglesia',
  address: 'Dirección completa',
  lat: 40.4168, // Latitud
  lng: -3.7038, // Longitud
},
```

#### Fiesta (Recepción)
```typescript
reception: {
  name: 'Nombre del Salón',
  address: 'Dirección completa',
  lat: 40.4178, // Latitud
  lng: -3.7048, // Longitud
},
```

**Cómo obtener coordenadas (lat, lng):**
1. Abre Google Maps
2. Busca la dirección
3. Haz clic derecho en el marcador
4. Copia las coordenadas (aparecen en formato decimal)

### Código de Vestimenta
```typescript
dressCode: 'Tu descripción del código de vestimenta',
```

### Información de Regalos
```typescript
giftAccount: {
  bank: 'Nombre del Banco',
  accountNumber: '12345678',
  accountHolder: 'Nombre Completo',
  accountType: 'cuenta_rut' | 'cuenta_corriente' | 'chequera_electronica' | 'cuenta_vista' | 'cuenta_ahorro',
  accountRut: '12.345.678-9', // Opcional, solo si es cuenta_rut
  totalReceived: 0, // En pesos chilenos
  goal: 5000000,    // Meta en CLP
  currency: 'CLP'
},
```

## 2. Configurar Google Maps

### Opción A: Con API Key (Recomendado)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo
3. Habilita estas APIs:
   - **Maps Embed API**
   - **Maps JavaScript API**
4. Ve a "Credenciales" → "Crear credenciales" → "Clave de API"
5. Copia la clave
6. Crea un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_aqui
```

### Opción B: Sin API Key

Si no quieres usar una API key, los mapas mostrarán un botón para abrir Google Maps en una nueva pestaña. Los mapas embebidos no funcionarán, pero los usuarios podrán ver las ubicaciones.

## 3. Personalizar Información Adicional

Puedes hacerlo desde el panel admin (pestaña **Información**) o editando directamente los componentes.  
`src/components/AdditionalInfo.tsx` controla el bloque de contacto/transporte/hoteles/música.
- Información de contacto
- Detalles de transporte
- Hoteles recomendados
- Música y sugerencias

## 4. Personalizar Colores y Estilo

Los colores principales están en los componentes usando clases de Tailwind:
- **Rosa/Rose**: Para elementos románticos
- **Azul/Blue**: Para ceremonia
- **Rosa/Pink**: Para fiesta
- **Púrpura/Purple**: Para elementos decorativos

Puedes cambiar los colores editando las clases en cada componente.

## 5. Actualizar Total de Regalos

Desde el panel admin modifica:
- Banco
- Titular
- Número de cuenta
- Meta y monto recibido

Si prefieres hacerlo manualmente, edita `giftAccount` en `data/database.json`.

## 6. Agregar Fotos

Para agregar fotos:
1. Coloca las imágenes en `public/images/`
2. Importa en el componente:
```typescript
import Image from 'next/image';
<Image src="/images/foto.jpg" alt="Descripción" width={500} height={300} />
```

## 7. Pruebas Locales

```bash
npm install
npm run dev
```

Visita `http://localhost:3000` para ver tu aplicación.

## 8. Desplegar

### Vercel (Más fácil)
1. Sube a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa proyecto
4. Añade variable de entorno `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
5. ¡Despliega!

¡Listo! Tu aplicación está configurada. 💍✨

