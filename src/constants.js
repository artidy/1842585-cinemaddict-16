const MAX_FILMS_GAP = 5;
const MAX_FILMS_EXTRA = 2;
const MIN_FILMS = 0;
const EMPTY_MOVIE = {
  id: '',
  poster: '',
  title: '',
  originalTitle: '',
  rating: '',
  director: '',
  screenWriters: [],
  actors: [],
  releaseDate: '',
  duration: '',
  country: '',
  genres: [],
  description: '',
  maturityRating: '',
  isInWatchlist: false,
  isWatched: false,
  isFavorite: false,
};
const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export {MAX_FILMS_GAP, MAX_FILMS_EXTRA, EMPTY_MOVIE, SortType, MIN_FILMS};
