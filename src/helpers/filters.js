import {FilterStats, TimeUnits} from '../constants';
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
    case FilterStats.TODAY:
      return filterMoviesByDate(movies, TimeUnits.DAY);
    case FilterStats.WEEK:
      return filterMoviesByDate(movies, TimeUnits.WEEK);
    case FilterStats.MONTH:
      return filterMoviesByDate(movies, TimeUnits.MONTH);
    case FilterStats.YEAR:
      return filterMoviesByDate(movies, TimeUnits.YEAR);
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
  filterStats,
};
