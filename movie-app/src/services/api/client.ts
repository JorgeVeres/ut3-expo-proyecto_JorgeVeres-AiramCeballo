
// src/services/api/client.ts

import axios, { AxiosInstance, AxiosError } from 'axios';
import { ENV } from '../../config/env';

/**
 * Cliente HTTP genérico con interceptores
 */

// Cliente para OMDb
export const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.OMDB_BASE_URL,
  timeout: 10000,
  params: {
    apikey: ENV.OMDB_API_KEY,
  },
});

// Cliente para TMDB (alternativo)
export const tmdbClient: AxiosInstance = axios.create({
  baseURL: ENV.TMDB_BASE_URL,
  timeout: 10000,
  params: {
    api_key: ENV.TMDB_API_KEY,
    language: 'es-ES',
  },
});

// Interceptor de request para logging (desarrollo)
const requestInterceptor = (config: any) => {
  if (__DEV__) {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
};

// Interceptor de errores
const errorInterceptor = (error: AxiosError) => {
  if (__DEV__) {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
  }

  // Mensajes de error personalizados
  if (!error.response) {
    throw new Error('Error de conexión. Verifica tu internet.');
  }

  switch (error.response.status) {
    case 401:
      throw new Error('API Key inválida. Verifica tu configuración.');
    case 404:
      throw new Error('Película no encontrada.');
    case 429:
      throw new Error('Límite de requests excedido. Intenta más tarde.');
    default:
      throw new Error('Error al conectar con el servidor.');
  }
};

// Aplicar interceptores
apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  (response) => response,
  errorInterceptor
);

tmdbClient.interceptors.request.use(requestInterceptor);
tmdbClient.interceptors.response.use(
  (response) => response,
  errorInterceptor
);

export default apiClient;