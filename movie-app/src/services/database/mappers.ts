import { Movie } from '@/src/types/movie';

export const movieToDb = (movie: Movie): any => ({
  id: movie.id,
  tmdbId: movie.tmdbId || null,
  title: movie.title,
  posterPath: movie.posterPath || null,
  customPosterUri: movie.customPosterUri || null,
  overview: movie.overview || null,
  releaseDate: movie.releaseDate || null,
  voteAverage: movie.voteAverage || null,
  myRating: movie.myRating || null,
  notes: movie.notes || null,
  isFavorite: movie.isFavorite ? 1 : 0,
  watchedDate: movie.watchedDate || null,
  genres: movie.genres ? JSON.stringify(movie.genres) : null,
  runtime: movie.runtime || null,
  createdAt: movie.createdAt,
  updatedAt: movie.updatedAt,
});

export const dbToMovie = (row: any): Movie => ({
  id: row.id,
  tmdbId: row.tmdbId,
  title: row.title,
  posterPath: row.posterPath,
  customPosterUri: row.customPosterUri,
  overview: row.overview,
  releaseDate: row.releaseDate,
  voteAverage: row.voteAverage,
  myRating: row.myRating,
  notes: row.notes,
  isFavorite: row.isFavorite === 1,
  watchedDate: row.watchedDate,
  genres: row.genres ? JSON.parse(row.genres) : undefined,
  runtime: row.runtime,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});