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
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
const ActionType = {
  CHANGE_SORT: 'CHANGE_SORT',
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  CHANGE_FILTER: 'CHANGE_FILTER',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};
const FilterType = {
  All: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATS: 'stats',
};

export {MAX_FILMS_GAP, MAX_FILMS_EXTRA, MIN_FILMS, EMPTY_MOVIE, SortType, UpdateType, FilterType, ActionType};
