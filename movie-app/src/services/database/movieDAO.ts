import { Movie } from '@/src/types/movie';
import { getDatabase } from './db';
import { movieToDb, dbToMovie } from './mappers';

export const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const db = getDatabase();
    const result = await db.getAllAsync('SELECT * FROM movies ORDER BY createdAt DESC');
    return result.map(dbToMovie);
  } catch (error) {
    console.error('Error getting movies:', error);
    return [];
  }
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
  try {
    const db = getDatabase();
    const result = await db.getFirstAsync('SELECT * FROM movies WHERE id = ?', [id]);
    return result ? dbToMovie(result) : null;
  } catch (error) {
    console.error('Error getting movie:', error);
    return null;
  }
};

export const insertMovie = async (movie: Movie): Promise<void> => {
  try {
    const db = getDatabase();
    const dbMovie = movieToDb(movie);
    
    await db.runAsync(
      `INSERT INTO movies (
        id, tmdbId, title, posterPath, customPosterUri, overview, 
        releaseDate, voteAverage, myRating, notes, isFavorite, 
        watchedDate, genres, runtime, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dbMovie.id, dbMovie.tmdbId, dbMovie.title, dbMovie.posterPath,
        dbMovie.customPosterUri, dbMovie.overview, dbMovie.releaseDate,
        dbMovie.voteAverage, dbMovie.myRating, dbMovie.notes,
        dbMovie.isFavorite, dbMovie.watchedDate, dbMovie.genres,
        dbMovie.runtime, dbMovie.createdAt, dbMovie.updatedAt,
      ]
    );
  } catch (error) {
    console.error('Error inserting movie:', error);
  }
};

export const updateMovie = async (movie: Movie): Promise<void> => {
  try {
    const db = getDatabase();
    const dbMovie = movieToDb({ ...movie, updatedAt: new Date().toISOString() });
    
    await db.runAsync(
      `UPDATE movies SET 
        tmdbId = ?, title = ?, posterPath = ?, customPosterUri = ?,
        overview = ?, releaseDate = ?, voteAverage = ?, myRating = ?,
        notes = ?, isFavorite = ?, watchedDate = ?, genres = ?,
        runtime = ?, updatedAt = ?
      WHERE id = ?`,
      [
        dbMovie.tmdbId, dbMovie.title, dbMovie.posterPath,
        dbMovie.customPosterUri, dbMovie.overview, dbMovie.releaseDate,
        dbMovie.voteAverage, dbMovie.myRating, dbMovie.notes,
        dbMovie.isFavorite, dbMovie.watchedDate, dbMovie.genres,
        dbMovie.runtime, dbMovie.updatedAt, dbMovie.id,
      ]
    );
  } catch (error) {
    console.error('Error updating movie:', error);
  }
};

export const deleteMovie = async (id: string): Promise<void> => {
  try {
    const db = getDatabase();
    await db.runAsync('DELETE FROM movies WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};