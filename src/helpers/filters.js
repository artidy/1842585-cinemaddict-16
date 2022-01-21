import {FilterState, TimeUnit} from '../constants';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const filterWatchingMovies = (movies) => movies.filter((movie) => movie.isInWatchlist);
const filterWatchedMovies = (movies) => movies.filter((movie) => movie.isWatched);
const filterFavoriteMovies = (movies) => movies.filter((movie) => movie.isFavorite);
const filterRatingMovies = (movies) => movies.filter((movie) => movie.rating > 0);
const filterCommentedMovies = (movies) => movies.filter((movie) => movie.comments.length > 0);
const filterMoviesByDate = (movies, timeUnit) => movies.filter(({watchingDate}) => dayjs(watchingDate).isBetween(dayjs().subtract(1, timeUnit), dayjs()));
const filterStats = (movies, filter) => {
  switch (filter) {
    case FilterState.TODAY:
      return filterMoviesByDate(movies, TimeUnit.DAY);
    case FilterState.WEEK:
      return filterMoviesByDate(movies, TimeUnit.WEEK);
    case FilterState.MONTH:
      return filterMoviesByDate(movies, TimeUnit.MONTH);
    case FilterState.YEAR:
      return filterMoviesByDate(movies, TimeUnit.YEAR);
    default:
      return movies;
  }
};

export {
  filterWatchingMovies,
  filterWatchedMovies,
  filterFavoriteMovies,
  filterRatingMovies,
  filterCommentedMovies,
  filterStats
};
