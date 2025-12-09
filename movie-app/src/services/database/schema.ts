export const CREATE_MOVIES_TABLE = 
  `CREATE TABLE IF NOT EXISTS movies (
    id TEXT PRIMARY KEY,
    tmdbId INTEGER,
    title TEXT NOT NULL,
    posterPath TEXT,
    customPosterUri TEXT,
    overview TEXT,
    releaseDate TEXT,
    voteAverage REAL,
    myRating REAL,
    notes TEXT,
    isFavorite INTEGER DEFAULT 0,
    watchedDate TEXT,
    genres TEXT,
    runtime INTEGER,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );`
;