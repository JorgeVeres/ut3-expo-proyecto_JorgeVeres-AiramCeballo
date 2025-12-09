# 🎬 Movie Tracker

**Movie Tracker** es una aplicación móvil multiplataforma para iOS, Android y Web que permite a los usuarios gestionar su colección personal de películas. Los usuarios pueden añadir películas manualmente, marcarlas como favoritas, añadir notas personales, valoraciones y pósters personalizados. Incluye funcionalidades únicas como la búsqueda avanzada, modo oscuro/claro y la capacidad de obtener una película aleatoria agitando el dispositivo.

## 🛠️ Tecnologías Principales

- **React Native 0.81.5** - Framework para aplicaciones móviles multiplataforma
- **Expo ~54** - Plataforma de desarrollo que simplifica el flujo de trabajo de React Native
- **TypeScript ~5.9** - Superset de JavaScript con tipado estático
- **Zustand 5.0** - Librería ligera para gestión de estado global
- **Expo SQLite** - Base de datos local para persistencia de datos
- **Expo Router 6.0** - Sistema de navegación basado en el sistema de archivos
- **AsyncStorage** - Almacenamiento clave-valor para preferencias de usuario
- **Axios 1.13** - Cliente HTTP para peticiones a APIs externas
- **Expo Sensors** - Acceso a sensores del dispositivo (acelerómetro)
- **Expo Image Picker** - Selección de imágenes desde galería o cámara

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js >= 18.0.0
- npm >= 9.0.0 o pnpm >= 8.0.0

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/movie-tracker.git
cd movie-tracker
```

2. **Instalar dependencias**
```bash
# Con npm
npm install

# Con pnpm
pnpm install
```

3. **Configurar variables de entorno** (opcional)

Crear un archivo `.env` en la raíz del proyecto:
```env
EXPO_PUBLIC_OMDB_API_KEY=tu_api_key_aqui
EXPO_PUBLIC_OMDB_BASE_URL=http://www.omdbapi.com
EXPO_PUBLIC_API_TIMEOUT=10000
```

> **Nota**: La aplicación funciona completamente sin configurar la API externa, ya que permite añadir películas manualmente.

4. **Ejecutar la aplicación**
```bash
npx expo start
```

Esto abrirá Expo DevTools en el navegador. Desde ahí puedes:
- Presionar `i` para abrir en simulador iOS
- Presionar `a` para abrir en emulador Android
- Escanear el QR con la app Expo Go en tu dispositivo físico
- Presionar `w` para abrir en navegador web

## ✨ Funcionalidades Principales

### Gestión de Películas
- **Añadir películas manualmente**: Formulario completo con título, año, valoración, notas y póster personalizado
- **Edición de películas**: Modificar cualquier campo de una película existente
- **Eliminación de películas**: Borrar películas de la colección

### Organización
- **Sistema de favoritos**: Marcar películas con ⭐ para acceso rápido
- **Búsqueda inteligente**: Busca por título, sinopsis o notas personales
- **Vista de favoritos**: Pestaña dedicada para ver solo las películas marcadas como favoritas

### Personalización
- **Modo oscuro/claro**: Alternancia entre temas con persistencia de preferencia
- **Pósters personalizados**: Añade imágenes desde la galería o toma fotos con la cámara
- **Notas personales**: Campo de texto libre para comentarios y opiniones sobre cada película
- **Valoración personal**: Sistema de puntuación de 0 a 10

### Funcionalidades Únicas
- **Película aleatoria por agitado**: Activa el acelerómetro para que al agitar el dispositivo se abra una película al azar de tu colección
- **Autenticación simple**: Sistema de login con captcha matemático para acceso básico
- **Actualización pull-to-refresh**: Desliza hacia abajo para recargar la lista de películas

### Persistencia
- **Base de datos SQLite local**: Todos los datos se almacenan localmente sin necesidad de conexión
- **AsyncStorage**: Preferencias de usuario (tema, configuración de shake) persistentes

## 🌐 APIs Externas

### OMDb API (Open Movie Database)
- **URL Base**: `http://www.omdbapi.com`
- **Documentación**: https://www.omdbapi.com/
- **Clave API**: Requiere registro gratuito en https://www.omdbapi.com/apikey.aspx

#### Uso en la aplicación
Aunque la aplicación está **diseñada para funcionar completamente sin API externa** (modo manual), se dejó preparada la infraestructura para futuras mejoras que permitan:

**Endpoint potencial**: `GET /?s={título}&apikey={key}`
- **Propósito**: Buscar películas por título
- **Respuesta**: Lista de películas con metadata (póster, año, sinopsis)
- **Uso previsto**: Autocompletar formulario al buscar una película existente

**Endpoint potencial**: `GET /?i={imdbID}&apikey={key}`
- **Propósito**: Obtener detalles completos de una película específica
- **Respuesta**: Información detallada (director, actores, duración, valoraciones)
- **Uso previsto**: Enriquecer datos de películas añadidas

> **Estado actual**: La API está configurada pero no se utiliza activamente. Las películas se añaden 100% manualmente. El código está preparado en `src/services/api/client.ts` para futuras implementaciones.

### TMDB API (The Movie Database) - Alternativa
- **URL Base**: `https://api.themoviedb.org/3`
- **Documentación**: https://developers.themoviedb.org/3
- Configurada como alternativa en el código pero no implementada

## 🔐 Permisos de la Aplicación

### Android
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS
```xml
<key>NSCameraUsageDescription</key>
<string>La app necesita acceso a tu cámara para tomar fotos de películas físicas.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>La app necesita acceso a tu galería para añadir pósters personalizados.</string>
```

### Justificación de permisos

1. **Cámara** (`CAMERA`)
   - **Uso**: Tomar fotografías de pósters de películas físicas o carátulas de DVDs/Blu-rays
   - **Implementación**: Componente `ImageSelector` en `src/components/movies/ImageSelector.tsx`
   - **Opcional**: El usuario puede optar por no usar esta funcionalidad

2. **Galería de fotos** (`READ_EXTERNAL_STORAGE`)
   - **Uso**: Seleccionar imágenes guardadas como pósters personalizados
   - **Implementación**: Hook `useImagePicker` en `src/hooks/useImagePicker.ts`
   - **Opcional**: Las películas pueden añadirse sin póster

3. **Acelerómetro** (automático, no requiere permiso explícito)
   - **Uso**: Detectar movimiento de agitado del dispositivo para mostrar película aleatoria
   - **Implementación**: Hook `useShakeDetector` en `src/hooks/useShakeDetector.ts`
   - **Configurable**: Se puede desactivar desde Ajustes

Todos los permisos son **opcionales** y la app funciona correctamente aunque el usuario los deniegue. Los permisos solo se solicitan cuando el usuario intenta usar la funcionalidad específica.

## 💭 Reflexión: React Native/Expo vs Jetpack Compose (Android Nativo)

### Experiencia de Desarrollo

**Ventajas de Expo/React Native:**

1. **Multiplataforma real**: Con una única base de código, la app funciona en iOS, Android y Web. En Jetpack Compose, solo tendrías Android.

2. **Hot Reload superior**: El Fast Refresh de Expo es instantáneo. Los cambios se ven en menos de un segundo sin perder el estado de la app. En Compose, aunque existe, es más lento.

3. **Ecosistema de librerías**: La comunidad JavaScript/React es enorme. Cualquier funcionalidad tiene múltiples paquetes npm disponibles. En Android nativo, el ecosistema es más limitado.

4. **Curva de aprendizaje**: Si ya conoces React, React Native es natural. Jetpack Compose tiene conceptos similares (componentes, estado), pero requiere aprender Kotlin y el ecosistema Android.

5. **Configuración inicial**: `npx create-expo-app` y en 30 segundos tienes una app funcionando. Android Studio + configuración de Gradle + emuladores puede tomar horas.

6. **Expo SDK**: Funcionalidades como cámara, sensores, SQLite vienen "listas para usar" con APIs simples. En Android nativo hay que lidiar con APIs más complejas y verbosas.

**Ventajas de Jetpack Compose:**

1. **Rendimiento**: Las apps nativas siempre serán más rápidas, especialmente en animaciones complejas y listas grandes.

2. **Acceso a APIs**: Jetpack Compose tiene acceso directo a todas las APIs de Android. En React Native, algunas funcionalidades nativas requieren módulos adicionales o escribir código nativo.

3. **Tamaño de la app**: Las apps Compose son más ligeras (~20-30 MB). Las apps React Native suelen ser más pesadas (~40-60 MB) por incluir el runtime de JavaScript.

4. **Integración con el sistema**: Widgets, notificaciones, servicios en segundo plano son más naturales en nativo.

5. **Debugging**: Android Studio tiene herramientas de debugging más potentes que las dev tools de React Native.

6. **Tipado**: Kotlin es un lenguaje fuertemente tipado. TypeScript ayuda mucho, pero aún es JavaScript en runtime.

### Conclusión Personal

Para **prototipos rápidos, MVPs o apps multiplataforma**, Expo/React Native es claramente superior. El desarrollo es más rápido, el ciclo de iteración es instantáneo y llegas a más plataformas.

Para **apps de alto rendimiento, con integraciones profundas del sistema o que solo necesiten Android**, Jetpack Compose es mejor opción. El control es total y el rendimiento óptimo.

En este proyecto, Expo fue la elección correcta: una app de catálogo de películas no requiere rendimiento extremo, y poder probarla instantáneamente en iOS, Android y Web durante el desarrollo fue invaluable. La experiencia de desarrollo fue fluida y productiva.
