const MAX_FILMS_GAP = 5;
const MAX_FILMS_EXTRA = 2;
const MIN_FILMS = 0;
const BAR_HEIGHT = 50;
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';
const USER_AVATAR = 'images/bitmap@2x.png';
const Rating = {
  NONE: null,
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};
const RatingValue = {
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
  ERROR_DELETE_COMMENT: 'ERROR_DELETE_COMMENT',
  ERROR_ADD_COMMENT: 'ERROR_ADD_COMMENT',
  ERROR_UPDATE_MOVIE: 'ERROR_UPDATE_MOVIE',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
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
const FilterState = {
  All: 'all',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};
const TimeUnit = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
const Url = {
  MOVIES: 'movies',
  COMMENTS: 'comments',
};

export {
  MAX_FILMS_GAP,
  MAX_FILMS_EXTRA,
  MIN_FILMS,
  EMPTY_MOVIE,
  BAR_HEIGHT,
  END_POINT,
  USER_AVATAR,
  Rating,
  RatingValue,
  SortType,
  UpdateType,
  FilterType,
  FilterState,
  ActionType,
  TimeUnit,
  Method,
  Url
};
