import {RenderPosition, render} from './render';
import Rating from './view/rating-view';
import Sorting from './view/sort-view';
import MoviesList from './view/movies-list-view';
import MainContainer from './view/movies-view';
import MovieContainer from './view/movies-container-view';
import MainMenu from './view/menu-view';
import Statistic from './view/statistics-view';
import {ShowMore} from './view/buttons-view';
import MoviesEmpty from './view/movies-empty';
import {generateFilms} from './mock/films-list';
import {normalizeArray} from './helpers/common';
import {normalizeMovie, normalizeComment, normalizeUser} from './helpers/normalize';
import {filterWatchingMovies, filterWatchedMovies, filterFavoriteMovies} from './helpers/filters';
import {sortTopRatedMovies, sortMostCommentedMovies} from './helpers/sorting';
import {onOpenMovieDetails, onShowMoreMovies} from './helpers/events';
import {addMovies} from './helpers/renders';
import {generateComments} from './mock/comments';
import {user} from './mock/user';
import {MAX_FILMS_EXTRA, MAX_FILMS_GAP} from './constants';

const currentUser = normalizeUser(user);
const movies = normalizeArray(generateFilms(), normalizeMovie);
const topRatedMovies = sortTopRatedMovies(movies);
const recommendMovies = sortMostCommentedMovies(movies);
const moviesCount = movies.length;
const comments = normalizeArray(generateComments(movies), normalizeComment);
const inWatchListMovies = filterWatchingMovies(movies);
const isWatchedMovies = filterWatchedMovies(movies);
const isFavoriteMovies = filterFavoriteMovies(movies);
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

render(header, new Rating(currentUser));
render(main, new MainMenu(inWatchListMovies.length, isWatchedMovies.length, isFavoriteMovies.length), RenderPosition.AFTERBEGIN);
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

moreButton.addEvent('onShowMoreMovies', 'click', onShowMoreMovies(movies, mainMoviesContainer, moreButton));
mainContainer.addEvent('onOpenMovieDetails', 'click', onOpenMovieDetails(main, movies, comments));
