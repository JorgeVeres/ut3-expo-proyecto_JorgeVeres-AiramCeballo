// src/config/env.ts

/**
 * Configuración de variables de entorno
 * Asegúrate de crear un archivo .env en la raíz del proyecto
 */

export const ENV = {
  // OMDb API (recomendada - más fácil)
  OMDB_API_KEY: process.env.EXPO_PUBLIC_OMDB_API_KEY || '',
  OMDB_BASE_URL: 'https://www.omdbapi.com',
  
  // API alternativa: The Movie Database (TMDB)
  TMDB_API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY || '',
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  
  // Configuración de la app
  APP_NAME: 'Movie Tracker',
  APP_VERSION: '1.0.0',
} as const;

// Validación de variables requeridas
export const validateEnv = () => {
  if (!ENV.OMDB_API_KEY && !ENV.TMDB_API_KEY) {
    console.warn(
      '⚠️ No se encontró ninguna API key. Por favor configura EXPO_PUBLIC_OMDB_API_KEY o EXPO_PUBLIC_TMDB_API_KEY en tu archivo .env'
    );
  }
};

// Tipo para el provider de API que se está usando
export type ApiProvider = 'omdb' | 'tmdb';

// Detectar qué API está configurada
export const getApiProvider = (): ApiProvider => {
  if (ENV.OMDB_API_KEY) return 'omdb';
  if (ENV.TMDB_API_KEY) return 'tmdb';
  return 'omdb'; // default
};