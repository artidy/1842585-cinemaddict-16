const MAX_FILMS_GAP = 5;
const MAX_FILMS_EXTRA = 2;
const MIN_FILMS = 0;
const BAR_HEIGHT = 50;
const MINUTES_IN_HOUR = 60;
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';
const KEY = 'GlshdG!jd4283@Hw32';
const USER_AVATAR = 'images/bitmap@2x.png';
const UserRatings = {
  NONE: null,
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};
const RatingValues = {
  NONE: 0,
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 21,
};
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
  INIT: 'INIT',
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
const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
const Urls = {
  MOVIES: 'movies',
};

export {
  MAX_FILMS_GAP,
  MAX_FILMS_EXTRA,
  MIN_FILMS,
  EMPTY_MOVIE,
  MINUTES_IN_HOUR,
  BAR_HEIGHT,
  END_POINT,
  KEY,
  USER_AVATAR,
  UserRatings,
  RatingValues,
  SortType,
  UpdateType,
  FilterType,
  FilterStats,
  ActionType,
  TimeUnits,
  Methods,
  Urls,
};
