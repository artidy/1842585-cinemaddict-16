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

render(header, new Rating(currentUser).element);
render(main, new MainMenu(inWatchListFilms.length, isWatchedFilms.length, isFavoriteFilms.length).element, RenderPosition.AFTERBEGIN);
render(main, mainContainer.element);
render(mainContainer.element, mainMoviesList.element);

if (moviesCount > 0) {
  render(mainContainer.element, new Sorting().element, RenderPosition.BEFOREBEGIN);
  render(mainContainer.element, topMoviesList.element);
  render(mainContainer.element, recommendMoviesList.element);
  render(mainMoviesList.element, mainMoviesContainer.element);
  render(topMoviesList.element, topMoviesContainer.element);
  render(recommendMoviesList.element, recommendMoviesContainer.element);
  addMovies(mainMoviesContainer.element, movies.slice(0, MAX_FILMS_GAP));
  addMovies(topMoviesContainer.element, topRatedMovies.slice(0, MAX_FILMS_EXTRA));
  addMovies(recommendMoviesContainer.element, recommendMovies.slice(0, MAX_FILMS_EXTRA));
  render(mainMoviesList.element, moreButton.element);
} else {
  render(mainMoviesList.element, new MoviesEmpty().element);
}

render(footer, new Statistic(moviesCount).element);

if (moreButton.element) {
  const onShowMoreMovies = (evt) => {
    evt.preventDefault();
    addMovies(mainMoviesContainer.element, movies.slice(offset, offset + MAX_FILMS_GAP));
    offset += MAX_FILMS_GAP;

    if (offset >= moviesCount) {
      moreButton.removeElement();
    }
  };

  moreButton.element.addEventListener('click', onShowMoreMovies);
}

const onKeydownEsc = (popup) => (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popup.removeElement();
    document.removeEventListener('keydown', onKeydownEsc);
    document.body.classList.remove('hide-overflow');
  }
};

const onClickCloseBtn = (popup) => () => {
  popup.removeElement();
  document.removeEventListener('keydown', onKeydownEsc);
  document.body.classList.remove('hide-overflow');
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

    render(main, movieDetails.element);
    document.body.classList.add('hide-overflow');

    document.addEventListener('keydown', onKeydownEsc(movieDetails));
    filmDetailsCloseBtn.addEventListener('click', onClickCloseBtn(movieDetails));
  }
};

mainContainer.element.addEventListener('click', onOpenDetails);
