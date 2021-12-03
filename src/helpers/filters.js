const filterWatchingMovies = (movies) => movies.filter((movie) => movie.isInWatchlist);
const filterWatchedMovies = (movies) => movies.filter((movie) => movie.isWatched);
const filterFavoriteMovies = (movies) => movies.filter((movie) => movie.isFavorite);

export {
  filterWatchingMovies,
  filterWatchedMovies,
  filterFavoriteMovies,
};
