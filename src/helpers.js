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
  id: id,
  poster: poster,
  title: title,
  originalTitle: originalTitle,
  rating: rating,
  director: director,
  screenWriters: screenWriters,
  actors: actors,
  releaseDate: releaseDate,
  duration: duration,
  country: country,
  genres: genres,
  description: description,
  maturityRating: maturityRating,
  comments: comments,
  isInWatchlist: isInWatchlist,
  isWatched: isWatched,
  isFavorite: isFavorite,
});

const normalizeComment = ({id, text, emotion, author, date}) => ({
  id: id,
  text: text,
  emotion: emotion,
  author: author,
  date: date,
});

const normalizeUser = ({avatar, rating}) => ({
  avatar: avatar,
  rating: rating,
});

const normalizeArray = (list, callback) => list.map((value) => callback(value));

const formatDate = (date, format) => dayjs(date).format(format);

const filterWatchingFilms = (films) => films.filter((film) => film.isInWatchlist);

const filterWatchedFilms = (films) => films.filter((film) => film.isWatched);

const filterFavoriteFilms = (films) => films.filter((film) => film.isFavorite);

export {
  normalizeArray,
  normalizeFilm,
  normalizeComment,
  normalizeUser,
  formatDate,
  filterWatchingFilms,
  filterWatchedFilms,
  filterFavoriteFilms,
};
