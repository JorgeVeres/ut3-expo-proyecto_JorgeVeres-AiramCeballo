import { Movie } from '../types/movie';

/**
 * Tipos de ordenación
 */
export type SortOption = 'date' | 'title' | 'rating' | 'year';
export type SortOrder = 'asc' | 'desc';

/**
 * Ordenar películas
 */
export const sortMovies = (
  movies: Movie[],
  sortBy: SortOption,
  order: SortOrder = 'desc'
): Movie[] => {
  const sorted = [...movies].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      
      case 'rating':
        const ratingA = a.myRating || 0;
        const ratingB = b.myRating || 0;
        comparison = ratingA - ratingB;
        break;
      
      case 'year':
        const yearA = parseInt(a.releaseDate?.split('-')[0] || '0');
        const yearB = parseInt(b.releaseDate?.split('-')[0] || '0');
        comparison = yearA - yearB;
        break;
      
      default:
        comparison = 0;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

/**
 * Filtrar películas por búsqueda
 */
export const filterMovies = (movies: Movie[], searchQuery: string): Movie[] => {
  if (!searchQuery.trim()) {
    return movies;
  }

  const query = searchQuery.toLowerCase();
  
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query) ||
    movie.overview?.toLowerCase().includes(query) ||
    movie.notes?.toLowerCase().includes(query) ||
    movie.genres?.some(g => g.toLowerCase().includes(query))
  );
};

/**
 * Filtrar solo favoritos
 */
export const filterFavorites = (movies: Movie[]): Movie[] => {
  return movies.filter((movie) => movie.isFavorite);
};

/**
 * Formatear duración (minutos a horas y minutos)
 */
export const formatRuntime = (minutes?: number): string => {
  if (!minutes) return 'Duración desconocida';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}min`;
  }
  
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

/**
 * Formatear fecha (ISO a formato legible)
 */
export const formatDate = (isoDate?: string): string => {
  if (!isoDate) return 'Fecha desconocida';
  
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString('es-ES', options);
};

/**
 * Formatear año desde fecha ISO
 */
export const getYear = (isoDate?: string): string => {
  if (!isoDate) return '????';
  return isoDate.split('-')[0];
};

/**
 * Formatear rating (0-10 a 0-5 estrellas)
 */
export const getRatingStars = (rating?: number): string => {
  if (!rating) return '☆☆☆☆☆';
  
  const stars = Math.round(rating / 2);
  const filled = '★'.repeat(stars);
  const empty = '☆'.repeat(5 - stars);
  
  return filled + empty;
};

/**
 * Validar URL de imagen
 */
export const isValidImageUrl = (url?: string): boolean => {
  if (!url) return false;
  return url.startsWith('http') || url.startsWith('file://');
};

/**
 * Obtener póster (priorizar custom, luego API)
 */
export const getPosterUri = (movie: Movie): string | undefined => {
  if (movie.customPosterUri) {
    return movie.customPosterUri;
  }
  if (movie.posterPath) {
    return movie.posterPath;
  }
  return undefined;
};

/**
 * Generar ID único
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Truncar texto
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Obtener color según rating
 */
export const getRatingColor = (rating?: number): string => {
  if (!rating) return '#757575';
  if (rating >= 8) return '#4CAF50'; // Verde
  if (rating >= 6) return '#FF9800'; // Naranja
  return '#F44336'; // Rojo
};