# PROMPT PARA CLAUDE CODE: ASISTENTE PERSONAL CON VOZ Y BD LOCAL

## 🎯 OBJETIVO GENERAL
Crear una **aplicación móvil Android/iOS nativa** que funcione como asistente personal para almacenar y consultar datos en una base de datos local, con capacidades de voz (entrada y salida) mediante Whisper y Text-to-Speech.

---

## 📋 REQUISITOS TÉCNICOS DETALLADOS

### 1. STACK TECNOLÓGICO RECOMENDADO (100% GRATUITO - ANDROID ONLY)
```
Frontend:        React Native + Expo (Android exclusivo)
Backend Local:   Node.js + Express (servidor embebido en la app)
Base de Datos:   SQLite3 (optimizado para Android)
Reconocimiento:  SpeechRecognizer API (Android nativo, 100% GRATUITO)
Síntesis Voz:    TextToSpeech Engine (Android nativo, 100% GRATUITO)
Almacenamiento:  Sistema de archivos local encriptado
Versión Android: 7.0+ (API 24+)
```

### ✅ COSTO TOTAL: $0 (CERO EUROS)

- ✅ React Native + Expo: Gratis
- ✅ SQLite3: Gratis
- ✅ Reconocimiento de voz Android: Nativo (gratis)
- ✅ Text-to-Speech Android: Nativo (gratis)
- ✅ Sin APIs de terceros pagadas
- ✅ Sin dependencias de Apple/iOS

**NOTA IMPORTANTE SOBRE MariaDB**
**MariaDB no es viable en móvil.** Recomendamos **SQLite3** porque:
- ✅ Diseñado para dispositivos móviles
- ✅ Base de datos embebida (sin servidor externo)
- ✅ Excelente para usuarios únicos
- ✅ Muy bajo consumo de recursos
- ✅ Fácil de respaldar
- ✅ Integración nativa en React Native

Si en futuro quieres migrar a MariaDB en un VPS, el esquema SQL será compatible (migration scripts incluidos).

---

## 🗂️ ESTRUCTURA DE BASE DE DATOS (SQLite)

```sql
-- TABLA: DOCTORES
CREATE TABLE doctores (
    id_doctor INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    especialidad TEXT,
    telefono TEXT,
    email TEXT,
    direccion TEXT,
    notas TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLA: CODIGOS_PUERTAS
CREATE TABLE codigos_puertas (
    id_codigo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_puerta TEXT NOT NULL UNIQUE,
    codigo TEXT NOT NULL,
    ubicacion TEXT,
    tipo TEXT DEFAULT 'numerica', -- numerica, rfid, biometrica
    fecha_cambio DATETIME DEFAULT CURRENT_TIMESTAMP,
    notas TEXT,
    activo BOOLEAN DEFAULT 1
);

-- TABLA: NUMEROS_IP
CREATE TABLE numeros_ip (
    id_ip INTEGER PRIMARY KEY AUTOINCREMENT,
    dispositivo_nombre TEXT NOT NULL UNIQUE,
    direccion_ip TEXT NOT NULL UNIQUE,
    tipo_dispositivo TEXT, -- pc, impresora, servidor, etc
    descripcion TEXT,
    puerto TEXT,
    usuario TEXT,
    contraseña TEXT, -- Encriptado en app
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT 1
);

-- TABLA: CONTACTOS
CREATE TABLE contactos (
    id_contacto INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    telefono TEXT,
    email TEXT,
    categoria TEXT, -- trabajo, personal, emergencia
    notas TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLA: DATOS_PERSONALIZADOS
CREATE TABLE datos_personalizados (
    id_dato INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL,
    clave TEXT NOT NULL,
    valor TEXT NOT NULL,
    tipo TEXT DEFAULT 'texto', -- texto, numero, fecha, booleano
    UNIQUE(categoria, clave)
);

-- TABLA: HISTORIAL_CONSULTAS
CREATE TABLE historial_consultas (
    id_historial INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_consulta TEXT, -- doctor, codigo, ip, contacto
    consulta_texto TEXT,
    respuesta_texto TEXT,
    fecha_consulta DATETIME DEFAULT CURRENT_TIMESTAMP,
    duracion_segundos INTEGER
);

-- TABLA: CONFIGURACION
CREATE TABLE configuracion (
    id_config INTEGER PRIMARY KEY AUTOINCREMENT,
    clave TEXT NOT NULL UNIQUE,
    valor TEXT,
    tipo TEXT DEFAULT 'texto'
);
```

---

## 🎤 FUNCIONALIDADES PRINCIPALES

### 1. ENTRADA DE VOZ Y TEXTO (100% GRATUITO - ANDROID NATIVO)
- **Micrófono**: Grabación de audio con SpeechRecognizer API (Android)
- **Teclado**: Entrada manual de texto
- **Reconocimiento**: Convertir voz → texto usando SpeechRecognizer (Google)
  - Motor nativo de Android - Completamente gratuito
  - Idioma principal: Español (España y América Latina)
  - Funciona offline en Android (sin necesidad de internet)
  - Misma precisión que Google Assistant
- **Fallback**: Si hay error, permite reintentar o escribir manualmente

### 2. PROCESAMIENTO Y BÚSQUEDA
- **NLP Simple**: Parseo de intenciones (crear, buscar, actualizar, eliminar)
- **Búsqueda**: Por nombre, categoría, palabras clave
- **Autocompletado**: Sugerencias mientras escribes

Ejemplos de comandos de voz:
```
"Agregar doctor Juan García, especialidad cardiología"
"¿Cuál es el código de la puerta principal?"
"Mostrar todas las direcciones IP"
"Contactar a María por teléfono"
"Actualizar el código del garaje a 5432"
```

### 3. SALIDA DE VOZ Y TEXTO
- **Text-to-Speech**: Respuestas en voz usando motor nativo del SO
- **Pantalla**: Mostrar resultados en interfaz limpia
- **Historial**: Guardar todas las consultas y respuestas

---

## 🏗️ ARQUITECTURA TÉCNICA

```
┌─────────────────────────────────────────┐
│      REACT NATIVE EXPO APP (ANDROID)    │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ UI/UX    │  │ Voz      │  │ Teclado│ │
│  │ (Screens)│  │(Android  │  │(Input) │ │
│  │          │  │SpeechRec)│  │        │ │
│  └──────────┘  └──────────┘  └────────┘ │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │    MOTOR DE PROCESAMIENTO        │   │
│  │ - Parser de intenciones          │   │
│  │ - Lógica de consultas            │   │
│  │ - Text-to-Speech (TTS Android)   │   │
│  └──────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │    SQLite3 DATABASE LOCAL        │   │
│  │ - Doctores                       │   │
│  │ - Códigos de puertas             │   │
│  │ - IPs                            │   │
│  │ - Contactos                      │   │
│  │ - Historial                      │   │
│  └──────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │    ENCRIPTACIÓN LOCAL            │   │
│  │ - Datos sensibles cifrados       │   │
│  │ - Backup automático              │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 🔐 SEGURIDAD Y PRIVACIDAD

1. **Encriptación**: 
   - Datos sensibles (contraseñas, códigos) encriptados con AES-256
   - Base de datos SQLite encriptada

2. **Autenticación**:
   - PIN numérico para acceder a la app
   - Huella dactilar (biometría Android)
   - Timeout de sesión configurable

3. **Privacidad**:
   - **Todos los datos permanecen en el móvil**
   - **SpeechRecognizer**: Reconocimiento offline, sin enviar datos privados
   - Sin sincronización en la nube (a menos que el usuario lo configure manualmente)

4. **Respaldo**:
   - Exportar BD a archivo encriptado
   - Restaurar desde backup
   - Opcionalmente: sincronizar con Google Drive (opcional del usuario)

---

## 📱 INTERFAZ DE USUARIO - PROFESIONAL CON COLORES CLAROS Y AZULES

### 🎨 PALETA DE COLORES
```
Fondo Principal:     #F8F9FA (Gris muy claro - casi blanco)
Fondo Secundario:    #E8EFFE (Azul muy claro)
Fondo Tarjetas:      #FFFFFF (Blanco puro)
Primario Azul:       #0066CC (Azul profesional)
Azul Oscuro:         #003D99 (Azul oscuro para énfasis)
Azul Claro:          #E3F2FD (Azul muy claro para fondos)
Texto Principal:     #1A1A1A (Negro suave)
Texto Secundario:    #666666 (Gris)
Acento Verde:        #10B981 (Verde éxito)
Acento Rojo:         #EF4444 (Rojo alerta)
Bordes:              #D9D9D9 (Gris claro)
Sombra:              rgba(0, 102, 204, 0.08) (Azul sutil)
```

### Pantallas principales (con diseño profesional):

1. **Home**: 
   - Fondo: #F8F9FA con gradiente sutil a #E8EFFE
   - Tarjeta de bienvenida: Blanco con borde azul #0066CC (2px)
   - Botón micrófono: Botón flotante circular #0066CC con sombra azul
   - Atajos rápidos: Grid de 2 columnas con tarjetas blancas, iconos azules
   - Búsqueda: Input con fondo claro, borde azul al enfocar, icono lupa azul

2. **Doctores**: 
   - Encabezado: Gradiente azul (#0066CC → #003D99) con texto blanco
   - Lista de doctores: Tarjetas blancas con borde izquierdo azul (5px)
   - Botón agregar: Botón flotante #0066CC con icono +
   - Cada tarjeta: Nombre azul oscuro, especialidad gris, teléfono en azul claro
   - Acciones: Iconos azules (llamar, editar, borrar)

3. **Códigos de Puerta**: 
   - Fondo: #F8F9FA
   - Listado: Tarjetas con código destacado en #0066CC
   - Botón copiar: Azul claro (#E3F2FD) con texto azul oscuro
   - Último cambio: Texto gris pequeño
   - Estado activo: Indicador verde (#10B981)

4. **Direcciones IP**: 
   - Diseño similar a códigos de puertas
   - IP destacada en monospace #0066CC
   - Tipo dispositivo: Badge con fondo azul claro
   - Botón copiar IP: Azul profesional
   - Mostrar/ocultar contraseña: Icono azul

5. **Contactos**: 
   - Lista con avatar circular (iniciales en azul blanco)
   - Nombre azul oscuro, categoría gris
   - Botones de acción: Azul claro para hover

6. **Datos Personalizados**: 
   - Acordeones/Expandibles con encabezados azul claro
   - Contenido: Tarjetas blancas con bordes sutiles
   - Editables inline con bordes azul al editar

7. **Historial**: 
   - Timeline vertical con línea azul
   - Consultas en tarjetas blancas
   - Hora: Texto gris
   - Respuesta: Texto negro con énfasis azul en palabras clave

8. **Configuración**: 
   - Switches: Azul cuando activos
   - Secciones: Encabezados azul oscuro con separadores
   - Inputs: Bordes sutiles, énfasis azul
   - Botones acción: Primario azul, secundario gris claro

### Características UX Profesionales:
- ✅ Colores corporativos: Azul y blanco/gris claro
- ✅ Bordes redondeados (12px para tarjetas, 8px para botones)
- ✅ Sombras sutiles con tonos azules
- ✅ Tipografía clara: Montserrat o Inter para encabezados, Roboto para cuerpo
- ✅ Espaciado generoso (16px padding estándar)
- ✅ Botón flotante para micrófono con animación de respiración
- ✅ Gestos táctiles (deslizar, swipe) con feedback visual azul
- ✅ Animaciones suaves (transiciones 300ms)
- ✅ Estados hover: Fondo azul muy claro (#E3F2FD)
- ✅ Modo claro por defecto (sin dark mode)
- ✅ Iconos en azul profesional
- ✅ Transiciones de color suave en interacciones
- ✅ Loading spinners en azul gradiente
- ✅ Toasts/notificaciones: Blanco con borde izquierdo azul o verde
- ✅ Modales: Fondo gris con overlay oscuro (40% opacidad)
- ✅ Indicadores de progreso: Azul gradiente

---

## 🎨 TEMA Y ESTILOS DETALLADOS

### Variables de Tema (en código):
```javascript
const theme = {
  colors: {
    // Fondos
    backgroundPrimary: '#F8F9FA',
    backgroundSecondary: '#E8EFFE',
    backgroundCard: '#FFFFFF',
    
    // Azules
    primary: '#0066CC',      // Azul principal - botones, enlaces
    primaryDark: '#003D99',  // Azul oscuro - encabezados
    primaryLight: '#E3F2FD', // Azul muy claro - hover, fondos
    
    // Texto
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    
    // Estados
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#0066CC',
    
    // Bordes
    border: '#D9D9D9',
    borderLight: '#E8E8E8',
    
    // Sombras
    shadow: 'rgba(0, 102, 204, 0.08)',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },
  
  typography: {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40, color: '#003D99' },
    h2: { fontSize: 24, fontWeight: '700', lineHeight: 32, color: '#003D99' },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28, color: '#003D99' },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24, color: '#1A1A1A' },
    bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20, color: '#666666' },
    label: { fontSize: 12, fontWeight: '500', lineHeight: 16, color: '#999999' },
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 102, 204, 0.05)',
    md: '0 4px 6px rgba(0, 102, 204, 0.08)',
    lg: '0 10px 25px rgba(0, 102, 204, 0.1)',
    xl: '0 20px 50px rgba(0, 102, 204, 0.15)',
  },
};
```

### Estilos de Componentes:

**Botones:**
```javascript
// Primario (Azul)
backgroundColor: '#0066CC'
color: '#FFFFFF'
borderRadius: 8px
padding: 12px 24px
fontSize: 14px
fontWeight: 600
shadow: md

// Secundario (Gris claro)
backgroundColor: '#E8E8E8'
color: '#1A1A1A'
borderRadius: 8px
padding: 12px 24px

// Terciario (Azul muy claro)
backgroundColor: '#E3F2FD'
color: '#0066CC'
borderRadius: 8px
padding: 8px 16px
fontSize: 13px

// Hover (todos)
opacity: 0.9
transform: translateY(-2px)
shadow: lg
```

**Tarjetas:**
```javascript
backgroundColor: '#FFFFFF'
borderRadius: 12px
padding: 16px
shadow: md
border: 1px solid '#E8E8E8'
marginBottom: 12px

// Con énfasis izquierdo (doctores, contactos)
borderLeft: 4px solid '#0066CC'
```

**Inputs / Campos de Texto:**
```javascript
backgroundColor: '#FFFFFF'
border: 1px solid '#D9D9D9'
borderRadius: 8px
padding: 12px 16px
fontSize: 16px
color: '#1A1A1A'

// Focus state
borderColor: '#0066CC'
shadow: '0 0 0 3px rgba(0, 102, 204, 0.1)'
outline: none
```

**Encabezados de Pantalla:**
```javascript
// Gradiente azul
background: 'linear-gradient(135deg, #0066CC 0%, #003D99 100%)'
color: '#FFFFFF'
padding: 24px 16px
borderRadius: 0
height: auto
shadow: md
```

**Badges/Etiquetas:**
```javascript
// Estado activo
backgroundColor: '#D1FAE5'
color: '#065F46'
borderRadius: 20px
padding: 4px 12px
fontSize: 12px
fontWeight: 500

// Categoría
backgroundColor: '#E3F2FD'
color: '#0066CC'
borderRadius: 20px
padding: 4px 12px
fontSize: 12px
```

**Botón Flotante (Micrófono):**
```javascript
position: 'absolute'
bottom: 24px
right: 24px
width: 64px
height: 64px
borderRadius: 32px (full)
backgroundColor: '#0066CC'
shadow: xl
animation: 'pulse 2s infinite'  // Respiración suave
icon: '#FFFFFF'
iconSize: 32px
```

**Toast/Notificaciones:**
```javascript
// Éxito
backgroundColor: '#FFFFFF'
borderLeft: 4px solid '#10B981'
color: '#1A1A1A'
shadow: md

// Error
backgroundColor: '#FFFFFF'
borderLeft: 4px solid '#EF4444'
color: '#1A1A1A'
shadow: md
```

---

## 🚀 FUNCIONALIDADES TÉCNICAS A IMPLEMENTAR

### Módulo 1: Base de Datos
- [ ] Inicializar SQLite con schema
- [ ] CRUD para cada tabla
- [ ] Búsqueda avanzada (LIKE, filtros)
- [ ] Migraciones automáticas
- [ ] Backup/Restore

### Módulo 2: Voz (SpeechRecognizer Android - GRATUITO)
- [ ] Integración SpeechRecognizer API (Android nativo)
- [ ] Grabación de audio con permisos Android
- [ ] Transcripción en tiempo real sin costos
- [ ] Soporte Spanish (España y Latinoamérica)
- [ ] Funcionamiento offline
- [ ] Manejo de errores sin conexión
- [ ] Cancelación de grabación

### Módulo 3: Text-to-Speech (Android TextToSpeech Engine - GRATUITO)
- [ ] TTS nativo Android (TextToSpeech)
- [ ] Velocidad, volumen, idioma configurables
- [ ] Voz en español (predeterminada del dispositivo)
- [ ] Cola de reproducción
- [ ] Pausa y reanudación
- [ ] Soporte offline completo

### Módulo 4: Lógica IA Simple
- [ ] Parser de comandos naturales
- [ ] Detección de intención (crear, consultar, actualizar)
- [ ] Respuestas contextales
- [ ] Autocomplete inteligente

### Módulo 5: Seguridad (Android)
- [ ] Encriptación AES-256 para datos sensibles
- [ ] Huella dactilar (biometría Android)
- [ ] PIN numérico
- [ ] Logs de acceso

### Módulo 6: Sincronización (Opcional)
- [ ] Exportar BD a JSON
- [ ] Importar desde JSON
- [ ] Respaldar a Google Drive
- [ ] Restaurar desde Drive

---

## 🎯 CASOS DE USO ESPECÍFICOS

### Caso 1: Agregar Doctor
```
Usuario: "Agregar doctor Juan García, cardiólogo, teléfono 555-1234"
App: Reconoce intención "crear"
     Parsea datos
     Inserta en tabla doctores
     Responde: "Doctor Juan García agregado exitosamente"
```

### Caso 2: Consultar Código de Puerta
```
Usuario: "¿Cuál es el código de la puerta principal?"
App: Reconoce "código" + "puerta principal"
     Busca en BD
     Lee en voz: "El código de la puerta principal es 4562"
     Muestra: Botón copiar
```

### Caso 3: Guardar IP
```
Usuario: "Nueva IP, servidor web, 192.168.1.100, usuario admin, contraseña segura123"
App: Inserta en numeros_ip (con contraseña encriptada)
     Responde: "Dirección IP guardada"
```

---

## 📦 LIBRERÍAS PRINCIPALES

```javascript
// React Native + Expo (Android only)
"react-native": "^0.73.0",
"expo": "^50.0.0",

// Base de Datos
"expo-sqlite": "^13.0.0",
"better-sqlite3": "^9.0.0",

// Voz - SpeechRecognizer Android (GRATUITO)
"react-native-voice": "^3.3.0", // Wrapper para SpeechRecognizer API
"expo-speech": "^12.5.0",        // Text-to-Speech nativo

// Encriptación
"react-native-crypto": "^2.2.0",
"tweetnacl-js": "^1.3.0",

// UI
"react-native-paper": "^5.10.0",
"@react-navigation/native": "^6.1.0",
"react-native-gesture-handler": "^2.14.0",

// Biometría (Android)
"expo-local-authentication": "^13.3.0",

// Storage
"expo-file-system": "^16.2.0",
"expo-secure-store": "^12.8.0",
```

**100% GRATUITO - Sin APIs pagadas - Android nativo**

---

## 📥 FORMATO DE RESPUESTAS DE LA APP

### Respuesta exitosa:
```json
{
  "exito": true,
  "tipo": "consulta",
  "respuesta_texto": "Encontré a 3 doctores",
  "respuesta_voz": "Se encontraron 3 doctores",
  "datos": [
    { "id": 1, "nombre": "Dr. García", "especialidad": "Cardiología" }
  ],
  "duracion_ms": 450
}
```

### Respuesta con error:
```json
{
  "exito": false,
  "error": "No hay conexión para Whisper",
  "sugerencia": "Por favor, revisa tu conexión a internet",
  "tipo_error": "red"
}
```

---

## 🔄 FLUJO TÍPICO DE INTERACCIÓN

```
1. Usuario toca botón micrófono
   ↓
2. App grabando audio (visual feedback)
   ↓
3. Usuario termina de hablar
   ↓
4. Envía audio a Whisper API
   ↓
5. Recibe texto transcrito
   ↓
6. Parser analiza intención
   ↓
7. Ejecuta consulta SQL
   ↓
8. Formatea respuesta
   ↓
9. Reproduce TTS
   ↓
10. Muestra en pantalla
    ↓
11. Guarda en historial
```

---

## 🛠️ INSTALACIÓN Y DESPLIEGUE

### Paso 1: Crear proyecto
```bash
npx create-expo-app AsistentePersonal
cd AsistentePersonal
```

### Paso 2: Instalar dependencias
```bash
npm install expo-sqlite expo-speech react-native-voice react-native-paper @react-navigation/native expo-local-authentication expo-file-system expo-secure-store
```

### Paso 3: Inicializar BD
```bash
# La app creará SQLite automáticamente en primer inicio
```

### Paso 4: Configurar permisos Android
```bash
# Se configurará automáticamente en app.json para:
# - RECORD_AUDIO (micrófono)
# - USE_FINGERPRINT (biometría)
# - READ_EXTERNAL_STORAGE (respaldos)
```

### Paso 5: Testing
```bash
npx expo start
# Escanear QR con Expo Go en tu dispositivo Android
```

### Paso 6: Build para Android (producción)
```bash
eas build --platform android
# Se generará archivo .apk que puedes instalar directamente
```

---

## 📊 REQUISITOS PREVIOS

Para crear y ejecutar el proyecto necesitas:

1. **Node.js y npm** (gratis)
   - Descargar desde https://nodejs.org (LTS)

2. **Expo CLI** (gratis)
   ```bash
   npm install -g expo-cli
   ```

3. **Android Studio** o **Emulador Android** (gratis, opcional)
   - O usar tu teléfono Android real

4. **Datos iniciales** (opcional)
   - Listado de doctores
   - Códigos de puertas conocidos
   - IPs a guardar

**Costo total: $0 - Todo es gratuito**

---

## ✅ ENTREGABLES

1. ✅ Código fuente completo en React Native
2. ✅ Schema SQLite con datos de prueba
3. ✅ Integración Whisper API
4. ✅ Text-to-Speech funcional
5. ✅ UI/UX responsive
6. ✅ Sistema de seguridad (biometría + PIN)
7. ✅ Documentación de uso
8. ✅ Scripts de backup/restore
9. ✅ Guía de troubleshooting
10. ✅ Ejemplos de comandos de voz

---

## 💡 VENTAJAS DE ESTA ARQUITECTURA

✅ **100% privacidad**: Todo local en tu móvil
✅ **Funciona offline**: Voz sin necesidad de internet
✅ **Solo Android**: Optimizado para el SO
✅ **Escalable**: Fácil agregar nuevas tablas
✅ **Seguro**: Encriptación AES-256 integrada
✅ **Intuitivo**: Comandos de voz naturales
✅ **Rápido**: Base de datos embebida
✅ **Bajo mantenimiento**: Sin servidor remoto
✅ **Completamente GRATIS**: $0 de costo recurrente

---

## 🔮 MEJORAS FUTURAS (No incluidas en v1)

- Sincronización con MariaDB en VPS
- Acceso desde web dashboard
- Compartir datos encriptados (por código QR)
- Integración con Telegram (opcional)
- AI avanzada (Claude API en lugar de parser simple)
- Recordatorios y notificaciones
- Integración con calendario
- Exportar reportes PDF

---

## 📞 SOPORTE DURANTE DESARROLLO

Durante la creación con Claude Code:
- Especifica errores exactos
- Proporciona screenshots
- Detalla SO del móvil (iOS/Android versión)
- Confirma que OpenAI API key está activa

---

## CONCLUSIÓN

Esta es una aplicación **professional-grade** que:
- Funciona como asistente personal real
- Almacena datos sensibles de forma segura
- Soporta voz nativa en español
- Se ejecuta completamente en tu dispositivo
- Puede expandirse fácilmente a futuro

¿Listo para pasar a Claude Code con este prompt?
