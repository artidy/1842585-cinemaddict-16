import {RenderPosition, render} from './render';
import Rating from './view/rating-view';
import Sorting from './view/sort-view';
import MoviesList from './view/movies-list-view';
import MainContainer from './view/movies-view';
import MovieContainer from './view/movies-container-view';
import MovieDetails from './view/details-view';
import MainMenu from './view/menu-view';
import Statistic from './view/statistics-view';
import {ShowMore} from './view/buttons-view';
import MoviesEmpty from './view/movies-empty';
import {generateFilms} from './mock/films-list';
import {
  normalizeFilm,
  normalizeArray,
  normalizeComment,
  normalizeUser,
  filterWatchingFilms,
  filterWatchedFilms,
  filterFavoriteFilms,
  sortTopRatedFilms,
  sortMostCommentedFilms, addMovies,
} from './helpers';
import {generateComments} from './mock/comments';
import {user} from './mock/user';
import {MAX_FILMS_EXTRA, MAX_FILMS_GAP} from './constants';

const currentUser = normalizeUser(user);
const movies = normalizeArray(generateFilms(), normalizeFilm);
const topRatedMovies = sortTopRatedFilms(movies);
const recommendMovies = sortMostCommentedFilms(movies);
const moviesCount = movies.length;
const comments = normalizeArray(generateComments(movies), normalizeComment);
const inWatchListFilms = filterWatchingFilms(movies);
const isWatchedFilms = filterWatchedFilms(movies);
const isFavoriteFilms = filterFavoriteFilms(movies);
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const mainContainer = new MainContainer();
const mainMoviesList = new MoviesList('All movies. Upcoming', false);
const topMoviesList = new MoviesList('Top rated', true);
const recommendMoviesList = new MoviesList('Most commented', true);
const mainMoviesContainer = new MovieContainer();
const topMoviesContainer = new MovieContainer();
const recommendMoviesContainer = new MovieContainer();
const moreButton = new ShowMore();

let offset = 5;

render(header, new Rating(currentUser));
render(main, new MainMenu(inWatchListFilms.length, isWatchedFilms.length, isFavoriteFilms.length), RenderPosition.AFTERBEGIN);
render(main, mainContainer);
render(mainContainer, mainMoviesList);

if (moviesCount > 0) {
  render(mainContainer, new Sorting(), RenderPosition.BEFOREBEGIN);
  render(mainContainer, topMoviesList);
  render(mainContainer, recommendMoviesList);
  render(mainMoviesList, mainMoviesContainer);
  render(topMoviesList, topMoviesContainer);
  render(recommendMoviesList, recommendMoviesContainer);
  addMovies(mainMoviesContainer, movies.slice(0, MAX_FILMS_GAP));
  addMovies(topMoviesContainer, topRatedMovies.slice(0, MAX_FILMS_EXTRA));
  addMovies(recommendMoviesContainer, recommendMovies.slice(0, MAX_FILMS_EXTRA));
  render(mainMoviesList, moreButton);
} else {
  render(mainMoviesList, new MoviesEmpty());
}

render(footer, new Statistic(moviesCount));

const onShowMoreMovies = (evt) => {
  evt.preventDefault();
  addMovies(mainMoviesContainer, movies.slice(offset, offset + MAX_FILMS_GAP));
  offset += MAX_FILMS_GAP;

  if (offset >= moviesCount) {
    moreButton.removeElement();
  }
};

moreButton.addEvent('click', onShowMoreMovies);

const onKeydownEsc = (popup) => (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popup.removeElement();
    document.removeEventListener('keydown', onKeydownEsc);
  }
};

const onClickCloseBtn = (popup) => () => {
  popup.removeElement();
  document.removeEventListener('keydown', onKeydownEsc);
};

const onOpenDetails = (evt) => {
  evt.preventDefault();

  const movieCard = evt.target.closest('.film-card__link');
  if (movieCard) {
    const movie = movies.find((item) => item.id === movieCard.dataset.id);
    const {comments: commentsIds} = movie;
    const movieComments = comments.filter((comment) => commentsIds.includes(comment.id));
    const movieDetails = new MovieDetails(movie, movieComments);
    const filmDetailsCloseBtn = movieDetails.element.querySelector('.film-details__close-btn');

    render(main, movieDetails);
    document.body.classList.add('hide-overflow');

    document.addEventListener('keydown', onKeydownEsc(movieDetails));
    filmDetailsCloseBtn.addEventListener('click', onClickCloseBtn(movieDetails));
  }
};

mainContainer.addEvent('click', onOpenDetails);
