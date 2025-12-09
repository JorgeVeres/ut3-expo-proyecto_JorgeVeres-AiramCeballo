import { create } from 'zustand';
import { Movie } from '@/src/types/movie';
import { getAllMovies, insertMovie, updateMovie, deleteMovie as deleteMovieDb } from '@/src/services/database/movieDao';

interface MoviesState {
  movies: Movie[];
  searchQuery: string;
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  loadMovies: () => Promise<void>;
  addMovie: (movie: Partial<Movie>) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
  getRandomMovie: () => Movie | undefined;
  getFilteredMovies: () => Movie[];
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  movies: [],
  searchQuery: '',
  isLoading: false,

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  getFilteredMovies: () => {
    const { movies, searchQuery } = get();
    if (!searchQuery.trim()) {
      return movies;
    }
    const query = searchQuery.toLowerCase();
    return movies.filter(m =>
      m.title.toLowerCase().includes(query) ||
      m.overview?.toLowerCase().includes(query) ||
      m.notes?.toLowerCase().includes(query)
    );
  },

  loadMovies: async () => {
    try {
      set({ isLoading: true });
      const movies = await getAllMovies();
      set({ movies, isLoading: false });
    } catch (error) {
      console.error('Error loading movies:', error);
      set({ isLoading: false });
    }
  },

  addMovie: async (movieData: Partial<Movie>) => {
    try {
      const newMovie: Movie = {
        id: Date.now().toString(),
        title: movieData.title || '',
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...movieData,
      };
      
      await insertMovie(newMovie);
      await get().loadMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  },

  toggleFavorite: async (id: string) => {
    try {
      const movie = get().movies.find(m => m.id === id);
      if (movie) {
        const updated = { ...movie, isFavorite: !movie.isFavorite };
        await updateMovie(updated);
        await get().loadMovies();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },

  deleteMovie: async (id: string) => {
    try {
      await deleteMovieDb(id);
      await get().loadMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  },

  getRandomMovie: () => {
    const movies = get().movies;
    if (movies.length === 0) return undefined;
    return movies[Math.floor(Math.random() * movies.length)];
  },
}));