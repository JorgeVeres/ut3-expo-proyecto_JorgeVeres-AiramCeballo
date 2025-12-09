export interface Movie {
  id: string;
  tmdbId?: number;
  title: string;
  posterPath?: string;
  customPosterUri?: string;
  overview?: string;
  releaseDate?: string;
  voteAverage?: number;
  myRating?: number;
  notes?: string;
  isFavorite: boolean;
  watchedDate?: string;
  genres?: string[];
  runtime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}