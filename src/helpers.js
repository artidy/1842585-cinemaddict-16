import dayjs from 'dayjs';
import Movie from './view/movie-view';
import {render} from './render';

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
const filterWatchingFilms = (movies) => movies.filter((movie) => movie.isInWatchlist);
const filterWatchedFilms = (movies) => movies.filter((movie) => movie.isWatched);
const filterFavoriteFilms = (movies) => movies.filter((movie) => movie.isFavorite);
const sortTopRatedFilms = (movies) => movies.slice().sort(({rating: firstRating}, {rating: secondRating}) => firstRating < secondRating);
const sortMostCommentedFilms = (movies) => movies.slice().sort(({comments: firstComments}, {comments: secondComments}) => firstComments.length < secondComments.length);
const addMovies = (container, movies) => {
  movies.forEach((movie) => {
    render(container, new Movie(movie).element);
  });
};

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
  sortTopRatedFilms,
  sortMostCommentedFilms,
  addMovies,
};
