import MainContainer from '../view/movies-view';
import MoviesList from '../view/movies-list-view';
import MoviesContainer from '../view/movies-container-view';
import MoviesEmpty from '../view/movies-empty';
import {render, RenderPosition} from '../render';
import Rating from '../view/rating-view';
import MainMenu from '../view/menu-view';
import Sorting from '../view/sort-view';
import {
  ActionType,
  FilterType,
  MAX_FILMS_EXTRA,
  MAX_FILMS_GAP,
  MIN_FILMS,
  SortType,
  UpdateType,
  UserRatings
} from '../constants';
import Statistic from '../view/statistics-view';
import {onClickCloseBtn, onKeydownEsc} from '../helpers/events';
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
import StatsView from '../view/stats-view';
import LoadingView from '../view/loading-view';

class MoviesPresenter {
  #header = null;
  #main = null;
  #footer = null;
  #moviesModel = null;
  #filterModel = null;
  #sortModel = null;
  #commentsModel = null;
  #currentUser = null;
  #currentMovie = null;
  #watchMovies = [];
  #watchedMovies = [];
  #favoriteMovies = [];
  #currentMoviesGap = MAX_FILMS_GAP;

  #userRating = new Rating();
  #mainContainer = new MainContainer();
  #mainMoviesList = new MoviesList('All movies. Upcoming', false);
  #topMoviesList = new MoviesList('Top rated', true);
  #recommendMoviesList = new MoviesList('Most commented', true);
  #mainMoviesContainer = new MoviesContainer();
  #topMoviesContainer = new MoviesContainer();
  #recommendMoviesContainer = new MoviesContainer();
  #movieDetails = null;
  #sortingMenu = null;
  #moreButton = new ShowMoreBtnView();
  #mainMenu = new MainMenu();
  #movieWrap = new MovieDetailsWrap();
  #movieCommentsView = null;
  #movieDetailsContainer = new MovieDetailsContainerView();
  #movieDetailsClose = new CloseDetailsBtnView();
  #movieForm = new MovieDetailsFormView();
  #loadingView = new LoadingView();
  #statsView = null;
  #loading = true;

  constructor(header, main, footer, moviesModel, filterModel, sortModel, commentsModel, currentUser) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#sortModel = sortModel;
    this.#commentsModel = commentsModel;
    this.#sortingMenu = new Sorting(this.#sortModel.currentSort);
    this.#currentUser = currentUser;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    let movies = [...this.#moviesModel.movies];

    switch (this.#filterModel.currentFilter) {
      case FilterType.WATCHLIST:
        movies = this.#watchMovies;
        break;
      case FilterType.HISTORY:
        movies = this.#watchedMovies;
        break;
      case FilterType.FAVORITES:
        movies = this.#favoriteMovies;
        break;
    }

    switch(this.#sortModel.currentSort) {
      case SortType.DATE:
        return sortMoviesByDate(movies);
      case SortType.RATING:
        return sortMoviesByRating(movies);
      default:
        return movies;
    }
  }

  get topRatedMovies() {
    return sortMoviesByRating(this.movies).slice(MIN_FILMS, MAX_FILMS_EXTRA);
  }

  get mostCommentedMovies() {
    return sortMoviesByComments(this.movies).slice(MIN_FILMS, MAX_FILMS_EXTRA);
  }

  load = () => {
    render(this.#main, this.#mainContainer);
    this.#updateMovies();
    if (!this.#loading) {
      render(this.#footer, new Statistic(this.#moviesModel.movies.length));
    }
  }

  #renderMainMenu = () => {
    this.#mainMenu.watchListCount = this.#watchMovies.length;
    this.#mainMenu.historyCount = this.#watchedMovies.length;
    this.#mainMenu.favoriteCount = this.#favoriteMovies.length;

    render(this.#main, this.#mainMenu, RenderPosition.AFTERBEGIN);
    this.#mainMenu.restoreHandlers(this.#handleViewAction);
  }

  #updateFilters = () => {
    this.#watchMovies = filterWatchingMovies(this.#moviesModel.movies);
    this.#watchedMovies = filterWatchedMovies(this.#moviesModel.movies);
    this.#favoriteMovies = filterFavoriteMovies(this.#moviesModel.movies);
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
    if (this.#currentMoviesGap >= this.movies.length) {
      return;
    }

    render(this.#mainMoviesList, this.#moreButton);
    this.#moreButton.addEvent('onShowMoreMovies', 'click', this.#onShowMoreMovies);
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

    movieCardControls.restoreHandlers(this.#handleViewAction);
  }

  #renderMovieDetails = () => {
    if (this.#movieDetails) {
      this.#clearDetails();
    } else {
      this.#movieDetails = new MovieDetails();
      render(this.#main, this.#movieDetails);
    }

    this.#movieWrap.movie = this.#currentMovie;
    const {id, comments: commentsIds} = this.#currentMovie;
    const movieComments = this.#commentsModel.comments.filter((comment) => commentsIds.includes(comment.id));
    this.#movieCommentsView = new MovieDetailsCommentsView(id, movieComments);

    render(this.#movieDetails, this.#movieForm);
    render(this.#movieForm, this.#movieDetailsContainer);
    render(this.#movieForm, this.#movieCommentsView);
    this.#movieCommentsView.restoreHandlers(this.#handleViewAction);
    this.#movieForm.restoreHandlers(this.#handleViewAction);
    render(this.#movieDetailsContainer, this.#movieDetailsClose);
    render(this.#movieDetailsContainer, this.#movieWrap);
    this.#addNewControl(this.#movieWrap, this.#currentMovie, true, RenderPosition.AFTEREND);

    document.addEventListener('keydown', onKeydownEsc(this.#onClickCloseDetails));
    this.#movieDetailsClose.addEvent('onClickCloseBtn', 'click', onClickCloseBtn(this.#onClickCloseDetails));

    document.body.classList.add('hide-overflow');
  }

  #clearDetails = () => {
    this.#movieWrap.removeElement();
    this.#movieDetailsClose.removeElement();
    this.#movieCommentsView.removeElement();
    this.#movieDetailsContainer.removeElement();
    this.#movieForm.removeElement();
  }

  #onClickCloseDetails = () => {
    this.#clearDetails();
    this.#movieDetails.removeElement();
    this.#currentMovie = null;
    this.#movieDetails = null;
  }

  #renderSortMenu = () => {
    render(this.#mainContainer, this.#sortingMenu, RenderPosition.BEFOREBEGIN);
    this.#sortingMenu.restoreHandlers(this.#handleViewAction);
  }

  #onOpenMovieDetails = (evt) => {
    evt.preventDefault();

    const movieCard = evt.target.closest('.film-card__link');

    if (!movieCard) {
      return;
    }

    const id = movieCard.dataset.id;
    this.#currentMovie = this.movies.find((item) => item.id === id);

    this.#commentsModel.loadComments(id);
  }

  #onShowMoreMovies = (evt) => {
    evt.preventDefault();

    this.#renderMovies(this.#mainMoviesContainer, this.movies.slice(this.#currentMoviesGap, this.#currentMoviesGap + MAX_FILMS_GAP));
    this.#currentMoviesGap += MAX_FILMS_GAP;

    if (this.#currentMoviesGap >= this.movies.length) {
      this.#moreButton.removeElement();
    }
  };

  #addClickMainContainer = () => {
    this.#mainContainer.addEvent('onOpenMovieDetails', 'click', this.#onOpenMovieDetails);
  }

  #updateMovies = () => {
    this.#mainContainer.replaceElement();
    this.#loadingView.removeElement();
    this.#mainMenu.removeElement();
    this.#mainMoviesList.removeElement();
    this.#topMoviesList.removeElement();
    this.#recommendMoviesList.removeElement();
    this.#sortingMenu.removeElement();
    this.#mainMoviesContainer.removeElement();
    this.#topMoviesContainer.removeElement();
    this.#recommendMoviesContainer.removeElement();
    this.#moreButton.removeElement();
    this.#userRating.removeElement();

    if (this.#statsView) {
      this.#statsView.removeElement();
    }

    if (this.#userRating.rating !== UserRatings.NONE) {
      render(this.#header, this.#userRating);
    }

    this.#renderMainMenu();

    if (this.#filterModel.currentFilter === FilterType.STATS) {
      this.#statsView = new StatsView(this.#watchedMovies, this.#userRating.rating);
      render(this.#mainContainer, this.#statsView);
      this.#statsView.updateElement();
      return;
    }

    if (this.#loading) {
      render(this.#mainContainer, this.#loadingView);
      return;
    }

    render(this.#mainContainer, this.#mainMoviesList);

    if (this.movies.length === 0) {
      render(this.#mainMoviesList, new MoviesEmpty());
      return;
    }

    if (this.#currentMovie !== null) {
      this.#renderMovieDetails();
    }

    this.#sortingMenu.updateElement(this.#sortModel.currentSort);
    this.#renderSortMenu();
    this.#renderMainMovies();
    render(this.#mainMoviesList, this.#mainMoviesContainer);
    this.#renderMovies(this.#mainMoviesContainer, this.movies.slice(MIN_FILMS, this.#currentMoviesGap));
    this.#updateExtraMovies();

    this.#renderMoreButton();
  }

  #handleViewAction = (actionType, updateType, data) => {
    switch (actionType) {
      case ActionType.CHANGE_SORT:
        this.#currentMoviesGap = MAX_FILMS_GAP;
        this.#sortModel.updateSort(updateType, data);
        break;
      case ActionType.UPDATE_MOVIE:
        if (this.#movieDetails !== null && this.#movieWrap.movie.id === data.id) {
          this.#movieWrap.movie = data;
        }
        this.#userRating.rating = this.#watchedMovies.length;
        this.#moviesModel.updateMovie(updateType, data);
        break;
      case ActionType.CHANGE_FILTER:
        this.#currentMoviesGap = MAX_FILMS_GAP;
        this.#sortModel.currentSort = SortType.DEFAULT;
        this.#filterModel.updateFilter(updateType, data);
        break;
      case ActionType.DELETE_COMMENT:
        this.#moviesModel.deleteComment(data);
        this.#commentsModel.deleteComment(data);
        break;
      case ActionType.ADD_COMMENT:
        this.#movieCommentsView.resetData();
        this.#commentsModel.addComment(data.movieId, data);
        this.#moviesModel.addComment(data.movieId, data.id);
        break;
    }
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.LOAD_COMMENTS) {
      this.#renderMovieDetails();
      return;
    }

    this.#updateFilters();
    this.#currentUser.changeRating(this.#watchedMovies.length);
    this.#userRating.rating = this.#currentUser.rating;

    if (updateType === UpdateType.INIT) {
      this.#loading = false;
      this.load();
    } else {
      this.#updateMovies();
    }
  }

  #updateExtraMovies = () => {
    this.#renderTopMovies();
    this.#renderMovies(this.#topMoviesContainer, this.topRatedMovies);
    this.#renderRecommendedMovies();
    this.#renderMovies(this.#recommendMoviesContainer, this.mostCommentedMovies);
  }
}

export default MoviesPresenter;
