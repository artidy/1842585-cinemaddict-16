import dayjs from 'dayjs';

const normalizeFilm = ({
  id,
  poster,
  title,
  originalTitle,
  rating,
  director,
  screenWriters,
  actors,
  releaseDate,
  duration,
  country,
  genres,
  description,
  maturityRating,
  comments,
  isInWatchlist,
  isWatched,
  isFavorite,
}) => ({
  id,
  poster,
  title,
  originalTitle,
  rating,
  director,
  screenWriters,
  actors,
  releaseDate,
  duration,
  country,
  genres,
  description,
  maturityRating,
  comments,
  isInWatchlist,
  isWatched,
  isFavorite,
});

const normalizeComment = ({id, text, emotion, author, date}) => ({
  id,
  text,
  emotion,
  author,
  date,
});

const normalizeUser = ({avatar, rating}) => ({
  avatar,
  rating,
});

const normalizeArray = (list, callback) => list.map((value) => callback(value));

const formatDate = (date, format) => dayjs(date).format(format);

const formatNumber = (number) => new Intl.NumberFormat('ru-RU').format(number);

const filterWatchingFilms = (films) => films.filter((film) => film.isInWatchlist);

const filterWatchedFilms = (films) => films.filter((film) => film.isWatched);

const filterFavoriteFilms = (films) => films.filter((film) => film.isFavorite);

export {
  normalizeArray,
  normalizeFilm,
  normalizeComment,
  normalizeUser,
  formatDate,
  formatNumber,
  filterWatchingFilms,
  filterWatchedFilms,
  filterFavoriteFilms,
};
