const MAX_FILMS_GAP = 5;
const MAX_FILMS_EXTRA = 2;
const MIN_FILMS = 0;
const BAR_HEIGHT = 50;
const MINUTES_IN_HOUR = 60;
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
const FilterStats = {
  All: 'all',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};
const TimeUnits = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export {
  MAX_FILMS_GAP,
  MAX_FILMS_EXTRA,
  MIN_FILMS,
  EMPTY_MOVIE,
  MINUTES_IN_HOUR,
  BAR_HEIGHT,
  SortType,
  UpdateType,
  FilterType,
  FilterStats,
  ActionType,
  TimeUnits,
};
