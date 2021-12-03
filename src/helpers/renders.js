import {render} from '../render';
import Movie from '../view/movie-view';
import MovieDetails from '../view/details-view';

const addMovies = (container, movies) => {
  movies.forEach((movie) => {
    render(container, new Movie(movie));
  });
};

const renderMovieDetails = (container, movies, comments, filmCard) => {
  const movieCard = filmCard.closest('.film-card__link');
  let movieDetails = null;

  if (movieCard) {
    const movie = movies.find((item) => item.id === movieCard.dataset.id);
    const {comments: commentsIds} = movie;
    const movieComments = comments.filter((comment) => commentsIds.includes(comment.id));
    movieDetails = new MovieDetails(movie, movieComments);

    render(container, movieDetails);

    document.body.classList.add('hide-overflow');
  }

  return movieDetails;
};

export {
  addMovies,
  renderMovieDetails,
};
