import MainContainer from '../view/movies-view';
import MoviesList from '../view/movies-list-view';
import MoviesContainer from '../view/movies-container-view';
import MoviesEmpty from '../view/movies-empty';
import {render, RenderPosition} from '../render';
import Rating from '../view/rating-view';
import MainMenu from '../view/menu-view';
import Sorting from '../view/sort-view';
import {MAX_FILMS_EXTRA, MAX_FILMS_GAP, MIN_FILMS, SortType} from '../constants';
import Statistic from '../view/statistics-view';
import {onClickCloseBtn, onKeydownEsc, onShowMoreMovies} from '../helpers/events';
import {filterFavoriteMovies, filterWatchedMovies, filterWatchingMovies} from '../helpers/filters';
import {sortMoviesByComments, sortMoviesByDate, sortMoviesByRating,} from '../helpers/sorting';
import MovieDetails from '../view/details-view';
import Movie from '../view/movie-view';
import MovieDetailsFormView from '../view/movie-details-form-view';
import MovieDetailsContainerView from '../view/movie-details-container-view';
import MovieDetailsWrap from '../view/movie-details-wrap-view';
import MovieDetailsCommentsView from '../view/movie-details-comments-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import CloseDetailsBtnView from '../view/close-details-btn-view';
import ControlsView from '../view/controls-view';

class MoviesPresenter {
  #header = null;
  #main = null;
  #footer = null;
  #moviesModel = null;
  #currentUser = null;
  #movieDetails = null;
  #currentSort = 'default';
  #comments = [];
  #watchMovies = [];
  #watchedMovies = [];
  #favoriteMovies = [];

  #mainContainer = new MainContainer();
  #mainMoviesList = new MoviesList('All movies. Upcoming', false);
  #topMoviesList = new MoviesList('Top rated', true);
  #recommendMoviesList = new MoviesList('Most commented', true);
  #mainMoviesContainer = new MoviesContainer();
  #topMoviesContainer = new MoviesContainer();
  #recommendMoviesContainer = new MoviesContainer();
  #sortingMenu = new Sorting();
  #moreButton = new ShowMoreBtnView();
  #mainMenu = new MainMenu(0, 0, 0);

  constructor(header, main, footer, moviesModel) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#moviesModel = moviesModel;
  }

  get movies() {
    switch(this.#sortingMenu.currentSort) {
      case SortType.DATE:
        return sortMoviesByDate(this.#moviesModel.movies);
      case SortType.RATING:
        return sortMoviesByRating(this.#moviesModel.movies);
      default:
        return [...this.#moviesModel.movies];
    }
  }

  get topRatedMovies() {
    return sortMoviesByRating(this.movies).slice(MIN_FILMS, MAX_FILMS_EXTRA);
  }

  get mostCommentedMovies() {
    return sortMoviesByComments(this.movies).slice(MIN_FILMS, MAX_FILMS_EXTRA);
  }

  load = (comments, currentUser) => {
    this.#comments = [...comments];
    this.#currentUser = {...currentUser};

    render(this.#header,  new Rating(this.#currentUser));
    this.#updateMovies();
    render(this.#footer, new Statistic(this.movies.length));
  }

  #renderMainMenu = () => {
    this.#mainMenu = new MainMenu(this.#watchMovies.length, this.#watchedMovies.length, this.#favoriteMovies.length);

    render(this.#main, this.#mainMenu, RenderPosition.AFTERBEGIN);
  }

  #renderMainMovies = () => {
    render(this.#mainMoviesList, this.#mainMoviesContainer);
    this.#addClickMainContainer();
  }

  #renderTopMovies = () => {
    render(this.#mainContainer, this.#topMoviesList);
    render(this.#topMoviesList, this.#topMoviesContainer);
  }

  #renderRecommendedMovies = () => {
    render(this.#mainContainer, this.#recommendMoviesList);
    render(this.#recommendMoviesList, this.#recommendMoviesContainer);
  }

  #renderMoreButton = () => {
    render(this.#mainMoviesList, this.#moreButton);
    this.#addClickMoreButton();
  }

  #renderMovies = (container, movies) => {
    movies.forEach((movie) => {
      const movieCard = new Movie(movie);

      render(container, movieCard);
      this.#addNewControl(movieCard, movie);
    });
  }

  #addNewControl = (parent, movie, isDetails = false, renderPosition = RenderPosition.BEFOREEND) => {
    const movieCardControls = new ControlsView(movie, isDetails);
    ControlsView.addControl(movie, movieCardControls);

    render(parent, movieCardControls, renderPosition);

    movieCardControls.restoreHandlers();
  }

  #renderMovieDetails = (filmCard) => {
    const movieCard = filmCard.closest('.film-card__link');

    if (!movieCard) {
      return;
    }

    if (this.#movieDetails !== null) {
      this.#movieDetails.removeElement();
    }

    const id = movieCard.dataset.id;
    const movie = this.movies.find((item) => item.id === id);
    const {comments: commentsIds} = movie;
    const movieComments = this.#comments.filter((comment) => commentsIds.includes(comment.id));
    this.#movieDetails = new MovieDetails();
    const movieForm = new MovieDetailsFormView();
    const movieContainer = new MovieDetailsContainerView();
    const movieWrap = new MovieDetailsWrap(movie);
    const movieClose = new CloseDetailsBtnView();
    const movieCommentsView = new MovieDetailsCommentsView(movieComments);

    render(this.#main, this.#movieDetails);
    render(this.#movieDetails, movieForm);
    render(movieForm, movieContainer);
    render(movieForm, movieCommentsView);
    movieCommentsView.restoreHandlers();
    render(movieContainer, movieClose);
    render(movieContainer, movieWrap);
    this.#addNewControl(movieWrap, movie, true, RenderPosition.AFTEREND);

    document.addEventListener('keydown', onKeydownEsc(this.#movieDetails));
    movieClose.addEvent('onClickCloseBtn', 'click', onClickCloseBtn(this.#movieDetails));

    document.body.classList.add('hide-overflow');
  }

  #renderSortMenu = () => {
    render(this.#mainContainer, this.#sortingMenu, RenderPosition.BEFOREBEGIN);
    this.#sortingMenu.addEvent('onClickSortBtn', 'click', this.#sortingMenu.onClickSortBtn(this.#updateMovies));
  }

  #onOpenMovieDetails = (evt) => {
    evt.preventDefault();

    this.#renderMovieDetails(evt.target);
  }

  #addClickMoreButton = () => {
    this.#moreButton.addEvent(
      'onShowMoreMovies',
      'click',
      onShowMoreMovies(
        this.movies,
        this.#mainMoviesContainer,
        this.#moreButton,
        this.#renderMovies)
    );
  }

  #addClickMainContainer = () => {
    this.#mainContainer.addEvent('onOpenMovieDetails', 'click', this.#onOpenMovieDetails);
  }

  #updateFilters = () => {
    this.#watchMovies = filterWatchingMovies(this.movies);
    this.#watchedMovies = filterWatchedMovies(this.movies);
    this.#favoriteMovies = filterFavoriteMovies(this.movies);
  }

  #updateMovies = () => {
    ControlsView.clearControl();
    this.#mainContainer.removeElement();
    this.#mainMoviesContainer.removeElement();
    this.#moreButton.removeElement();
    this.#sortingMenu.removeElement();
    this.#mainMenu.removeElement();

    this.#updateFilters();

    this.#renderMainMenu();
    render(this.#main, this.#mainContainer);
    render(this.#mainContainer, this.#mainMoviesList);

    if (this.movies.length === 0) {
      render(this.#mainMoviesList, new MoviesEmpty());
      return;
    }

    this.#renderSortMenu(this.#currentSort);
    this.#renderMainMovies();
    this.#renderMovies(this.#mainMoviesContainer, this.movies.slice(MIN_FILMS, MAX_FILMS_GAP));
    this.#updateExtraMovies();
    this.#renderMoreButton();
  }

  #updateExtraMovies = () => {
    this.#topMoviesContainer.removeElement();
    this.#recommendMoviesContainer.removeElement();

    this.#renderTopMovies();
    this.#renderMovies(this.#topMoviesContainer, this.topRatedMovies);
    this.#renderRecommendedMovies();
    this.#renderMovies(this.#recommendMoviesContainer, this.mostCommentedMovies);
  }
}

export default MoviesPresenter;
