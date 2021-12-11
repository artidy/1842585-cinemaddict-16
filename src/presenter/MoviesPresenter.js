import MainContainer from '../view/movies-view';
import MoviesList from '../view/movies-list-view';
import MovieContainer from '../view/movies-container-view';
import {ShowMore} from '../view/buttons-view';
import MoviesEmpty from '../view/movies-empty';
import {render, RenderPosition} from '../render';
import Rating from '../view/rating-view';
import MainMenu from '../view/menu-view';
import Sorting from '../view/sort-view';
import {addMovies} from '../helpers/renders';
import {MAX_FILMS_EXTRA, MAX_FILMS_GAP} from '../constants';
import Statistic from '../view/statistics-view';
import {onOpenMovieDetails, onShowMoreMovies} from '../helpers/events';
import {filterFavoriteMovies, filterWatchedMovies, filterWatchingMovies} from '../helpers/filters';
import {sortMostCommentedMovies, sortTopRatedMovies} from '../helpers/sorting';

class MoviesPresenter {
  #header = null;
  #main = null;
  #footer = null;
  #currentUser = null;
  #movies = [];
  #comments = [];
  #watchMovies = [];
  #watchedMovies = [];
  #favoriteMovies = [];
  #topRatedMovies = [];
  #recommendMovies = [];

  #mainContainer = new MainContainer();
  #mainMoviesList = new MoviesList('All movies. Upcoming', false);
  #topMoviesList = new MoviesList('Top rated', true);
  #recommendMoviesList = new MoviesList('Most commented', true);
  #mainMoviesContainer = new MovieContainer();
  #topMoviesContainer = new MovieContainer();
  #recommendMoviesContainer = new MovieContainer();
  #moreButton = new ShowMore();

  constructor(header, main, footer) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
  }

  load(movies, comments, currentUser) {
    this.#movies = [...movies];
    this.#comments = [...comments];
    this.#currentUser = {...currentUser};

    this.#updateFilters();
    this.#updateSorting();
    this.#renderRating();
    this.#renderMainMenu();
    this.#renderMainContainer();
    this.#renderMainMoviesList();
    if (this.#movies.length > 0) {
      this.#renderSorting();
      this.#renderMainMovies();
      this.#renderTopMovies();
      this.#renderRecommendedMovies();
      this.#renderMoreButton();
    } else {
      this.#renderEmpty();
    }
    this.#renderStatistic();
  }

  #renderRating() {
    render(this.#header,  new Rating(this.#currentUser));
  }

  #renderMainMenu() {
    render(this.#main,
      new MainMenu(
        this.#watchMovies.length,
        this.#watchedMovies.length,
        this.#favoriteMovies.length),
      RenderPosition.AFTERBEGIN
    );
  }

  #renderMainContainer() {
    render(this.#main, this.#mainContainer);
  }

  #renderMainMoviesList() {
    render(this.#mainContainer, this.#mainMoviesList);
  }

  #renderSorting() {
    render(this.#mainContainer, new Sorting(), RenderPosition.BEFOREBEGIN);
  }

  #renderMainMovies() {
    render(this.#mainMoviesList, this.#mainMoviesContainer);
    addMovies(this.#mainMoviesContainer, this.#movies.slice(0, MAX_FILMS_GAP));
    this.#addClickMainContainer();
  }

  #renderTopMovies() {
    render(this.#mainContainer, this.#topMoviesList);
    render(this.#topMoviesList, this.#topMoviesContainer);
    addMovies(this.#topMoviesContainer, this.#topRatedMovies.slice(0, MAX_FILMS_EXTRA));
  }

  #renderRecommendedMovies() {
    render(this.#mainContainer, this.#recommendMoviesList);
    render(this.#recommendMoviesList, this.#recommendMoviesContainer);
    addMovies(this.#recommendMoviesContainer, this.#recommendMovies.slice(0, MAX_FILMS_EXTRA));
  }

  #renderMoreButton() {
    render(this.#mainMoviesList, this.#moreButton);
    this.#addClickMoreButton();
  }

  #renderStatistic() {
    render(this.#footer, new Statistic(this.#movies.length));
  }

  #renderEmpty() {
    render(this.#mainMoviesList, new MoviesEmpty());
  }

  #addClickMoreButton() {
    this.#moreButton.addEvent(
      'onShowMoreMovies',
      'click',
      onShowMoreMovies(
        this.#movies,
        this.#mainMoviesContainer,
        this.#moreButton)
    );
  }

  #addClickMainContainer() {
    this.#mainContainer.addEvent(
      'onOpenMovieDetails',
      'click',
      onOpenMovieDetails(
        this.#main,
        this.#movies,
        this.#comments)
    );
  }

  #updateFilters() {
    this.#watchMovies = filterWatchingMovies(this.#movies);
    this.#watchedMovies = filterWatchedMovies(this.#movies);
    this.#favoriteMovies = filterFavoriteMovies(this.#movies);
  }

  #updateSorting() {
    this.#topRatedMovies = sortTopRatedMovies(this.#movies);
    this.#recommendMovies = sortMostCommentedMovies(this.#movies);
  }
}

export default MoviesPresenter;
