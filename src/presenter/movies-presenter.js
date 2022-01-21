import MainContainerView from '../view/main-container-view';
import MoviesListView from '../view/movies-list-view';
import MoviesContainerView from '../view/movies-container-view';
import MoviesEmptyView from '../view/movies-empty-view';
import MenuView from '../view/menu-view';
import SortingView from '../view/sorting-view';
import MovieDetailsView from '../view/movie-details-view';
import MovieView from '../view/movie-view';
import MovieDetailsFormView from '../view/movie-details-form-view';
import MovieDetailsContainerView from '../view/movie-details-container-view';
import MovieDetailsWrapView from '../view/movie-details-wrap-view';
import MovieDetailsCommentsView from '../view/movie-details-comments-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import CloseDetailsBtnView from '../view/close-details-btn-view';
import ControlsView from '../view/controls-view';
import StatsView from '../view/stats-view';
import LoadingView from '../view/loading-view';
import {render, RenderPosition} from '../render';
import {
  ActionType,
  FilterType,
  MAX_FILMS_EXTRA,
  MAX_FILMS_GAP,
  MIN_FILMS,
  SortType,
  UpdateType
} from '../constants';
import {onClickCloseBtn, onKeydownEsc} from '../helpers/events';
import {
  filterCommentedMovies,
  filterFavoriteMovies,
  filterRatingMovies,
  filterWatchedMovies,
  filterWatchingMovies
} from '../helpers/filters';
import {sortMoviesByComments, sortMoviesByDate, sortMoviesByRating} from '../helpers/sorting';

class MoviesPresenter {
  #main = null;
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

  #mainContainerView = new MainContainerView();
  #mainMoviesListView = new MoviesListView('All movies. Upcoming', false);
  #topMoviesListView = new MoviesListView('Top rated', true, true);
  #recommendMoviesListView = new MoviesListView('Most commented', true, true);
  #mainMoviesContainerView = new MoviesContainerView();
  #topMoviesContainerView = new MoviesContainerView();
  #recommendMoviesContainerView = new MoviesContainerView();
  #movieDetailsView = null;
  #sortingView = null;
  #moreButton = new ShowMoreBtnView();
  #menuView = new MenuView();
  #movieDetailsWrapView = new MovieDetailsWrapView();
  #movieCommentsView = new MovieDetailsCommentsView();
  #movieDetailsContainer = new MovieDetailsContainerView();
  #movieDetailsClose = new CloseDetailsBtnView();
  #movieForm = new MovieDetailsFormView();
  #loadingView = new LoadingView();
  #statsView = null;
  #loading = true;
  #loadingComments = true;
  #renderBothExtra = true;

  constructor(main, moviesModel, filterModel, sortModel, commentsModel, currentUser) {
    this.#main = main;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#sortModel = sortModel;
    this.#commentsModel = commentsModel;
    this.#sortingView = new SortingView(this.#sortModel.currentSort);
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
    return sortMoviesByRating(filterRatingMovies(this.movies)).slice(MIN_FILMS, MAX_FILMS_EXTRA);
  }

  get mostCommentedMovies() {
    return sortMoviesByComments(filterCommentedMovies(this.movies)).slice(MIN_FILMS, MAX_FILMS_EXTRA);
  }

  load = () => {
    render(this.#main, this.#mainContainerView);
    this.#updateMovies();
  }

  #renderMainMenu = () => {
    this.#menuView.watchListCount = this.#watchMovies.length;
    this.#menuView.historyCount = this.#watchedMovies.length;
    this.#menuView.favoriteCount = this.#favoriteMovies.length;

    render(this.#main, this.#menuView, RenderPosition.AFTERBEGIN);
    this.#menuView.restoreHandlers(this.#handleViewAction);
  }

  #updateFilters = () => {
    this.#watchMovies = filterWatchingMovies(this.#moviesModel.movies);
    this.#watchedMovies = filterWatchedMovies(this.#moviesModel.movies);
    this.#favoriteMovies = filterFavoriteMovies(this.#moviesModel.movies);
  }

  #renderMainMovies = () => {
    render(this.#mainMoviesListView, this.#mainMoviesContainerView);
    this.#addClickMainContainer();
  }

  #renderTopMovies = () => {
    this.#topMoviesListView = new MoviesListView('Top rated', this.#renderBothExtra, true);

    render(this.#mainContainerView, this.#topMoviesListView);
    render(this.#topMoviesListView, this.#topMoviesContainerView);
  }

  #renderRecommendedMovies = () => {
    this.#recommendMoviesListView = new MoviesListView('Most commented', this.#renderBothExtra, true);

    render(this.#mainContainerView, this.#recommendMoviesListView);
    render(this.#recommendMoviesListView, this.#recommendMoviesContainerView);
  }

  #renderMoreButton = () => {
    if (this.#currentMoviesGap >= this.movies.length) {
      return;
    }

    render(this.#mainMoviesListView, this.#moreButton);
    this.#moreButton.addEvent('onShowMoreMovies', 'click', this.#onShowMoreMovies);
  }

  #renderMovies = (container, movies) => {
    movies.forEach((movie) => {
      const movieView = new MovieView(movie);

      render(container, movieView);
      this.#addNewControl(movieView, movie);
    });
  }

  #addNewControl = (parent, movie, isDetails = false, renderPosition = RenderPosition.BEFOREEND) => {
    const movieCardControls = new ControlsView(movie, isDetails);
    ControlsView.addControl(movie, movieCardControls);

    render(parent, movieCardControls, renderPosition);

    movieCardControls.restoreHandlers(this.#handleViewAction);
  }

  #renderMovieDetails = () => {
    if (this.#movieDetailsView) {
      this.#clearDetails();
    } else {
      this.#movieDetailsView = new MovieDetailsView();
      render(this.#main, this.#movieDetailsView);
    }

    this.#movieDetailsWrapView.movie = this.#currentMovie;

    render(this.#movieDetailsView, this.#movieForm);
    render(this.#movieForm, this.#movieDetailsContainer);

    if (this.#loadingComments) {
      render(this.#movieForm, new LoadingView());
    } else {
      this.#movieCommentsView.comments = this.#commentsModel.comments;
      this.#movieCommentsView.movieId = this.#currentMovie.id;

      render(this.#movieForm, this.#movieCommentsView);
    }

    render(this.#movieDetailsContainer, this.#movieDetailsClose);
    render(this.#movieDetailsContainer, this.#movieDetailsWrapView);
    this.#addNewControl(this.#movieDetailsWrapView, this.#currentMovie, true, RenderPosition.AFTEREND);

    if (!this.#movieCommentsView.disableForm) {
      this.#movieCommentsView.restoreHandlers(this.#handleViewAction);
      this.#movieForm.restoreHandlers(this.#handleViewAction);
      this.#movieDetailsView.addEvent('onEscClickBtn', 'keydown', onKeydownEsc(this.#onClickCloseDetails), document);
      this.#movieDetailsClose.addEvent('onClickCloseBtn', 'click', onClickCloseBtn(this.#onClickCloseDetails));
    }

    document.body.classList.add('hide-overflow');
  }

  #clearDetails = () => {
    this.#movieDetailsWrapView.removeElement();
    this.#movieDetailsClose.removeElement();
    this.#movieCommentsView.removeElement();
    this.#movieDetailsContainer.removeElement();
    this.#movieForm.removeElement();
  }

  #onClickCloseDetails = () => {
    this.#clearDetails();
    this.#movieDetailsView.removeEvent('onEscClickBtn', 'keydown', document);
    this.#movieDetailsView.removeElement();
    this.#currentMovie = null;
    this.#movieDetailsView = null;
  }

  #renderSortMenu = () => {
    render(this.#mainContainerView, this.#sortingView, RenderPosition.BEFOREBEGIN);
    this.#sortingView.restoreHandlers(this.#handleViewAction);
  }

  #onOpenMovieDetails = (evt) => {
    evt.preventDefault();

    const movieCard = evt.target.closest('.film-card__link');

    if (!movieCard) {
      return;
    }

    const id = movieCard.dataset.id;
    this.#currentMovie = this.movies.find((item) => item.id === id);
    this.#loadingComments = true;
    this.#movieCommentsView.disableForm = true;

    this.#renderMovieDetails();

    this.#commentsModel.loadComments(id);
  }

  #onShowMoreMovies = (evt) => {
    evt.preventDefault();

    this.#renderMovies(this.#mainMoviesContainerView, this.movies.slice(this.#currentMoviesGap, this.#currentMoviesGap + MAX_FILMS_GAP));
    this.#currentMoviesGap += MAX_FILMS_GAP;

    if (this.#currentMoviesGap >= this.movies.length) {
      this.#moreButton.removeElement();
    }
  };

  #addClickMainContainer = () => {
    this.#mainContainerView.addEvent('onOpenMovieDetails', 'click', this.#onOpenMovieDetails);
  }

  #updateMovies = () => {
    this.#mainContainerView.replaceElement();
    this.#loadingView.removeElement();
    this.#menuView.removeElement();
    this.#mainMoviesListView.removeElement();
    this.#topMoviesListView.removeElement();
    this.#recommendMoviesListView.removeElement();
    this.#sortingView.removeElement();
    this.#mainMoviesContainerView.removeElement();
    this.#topMoviesContainerView.removeElement();
    this.#recommendMoviesContainerView.removeElement();
    this.#moreButton.removeElement();

    if (this.#statsView) {
      this.#statsView.removeElement();
    }

    this.#currentUser.changeRating(this.#watchedMovies.length);
    this.#renderMainMenu();

    if (this.#filterModel.currentFilter === FilterType.STATS) {
      this.#statsView = new StatsView(this.#watchedMovies, this.#currentUser.rating);
      render(this.#mainContainerView, this.#statsView);
      this.#statsView.updateElement();
      return;
    }

    if (this.#loading) {
      render(this.#mainContainerView, this.#loadingView);
      return;
    }

    render(this.#mainContainerView, this.#mainMoviesListView);

    if (this.movies.length === 0) {
      render(this.#mainMoviesListView, new MoviesEmptyView());
      return;
    }

    if (this.#currentMovie !== null) {
      this.#renderMovieDetails();
    }

    this.#sortingView.updateElement(this.#sortModel.currentSort);
    this.#renderSortMenu();
    this.#renderMainMovies();
    render(this.#mainMoviesListView, this.#mainMoviesContainerView);
    this.#renderMovies(this.#mainMoviesContainerView, this.movies.slice(MIN_FILMS, this.#currentMoviesGap));
    this.#updateExtraMovies();

    this.#renderMoreButton();
  }

  #handleViewAction = (actionType, updateType, data) => {
    this.#movieForm.isError = false;

    switch (actionType) {
      case ActionType.CHANGE_SORT:
        this.#currentMoviesGap = MAX_FILMS_GAP;
        this.#sortModel.updateSort(updateType, data);
        break;
      case ActionType.UPDATE_MOVIE:
        if (this.#movieDetailsView !== null && this.#movieDetailsWrapView.movie.id === data.id) {
          this.#movieDetailsWrapView.movie = data;
        }
        this.#moviesModel.updateMovie(updateType, data);
        break;
      case ActionType.CHANGE_FILTER:
        this.#currentMoviesGap = MAX_FILMS_GAP;
        this.#sortModel.currentSort = SortType.DEFAULT;
        this.#filterModel.updateFilter(updateType, data);
        break;
      case ActionType.DELETE_COMMENT:
        this.#commentsModel.deleteComment(data, this.#moviesModel.deleteComment);
        break;
      case ActionType.ADD_COMMENT:
        this.#movieCommentsView.disableForm = true;
        this.#renderMovieDetails();
        this.#commentsModel.addComment(data.movieId, data, this.#moviesModel.addComment);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    this.#movieCommentsView.isError = false;

    if (updateType === UpdateType.LOAD_COMMENTS) {
      this.#loadingComments = false;
      this.#movieCommentsView.resetData();
      this.#renderMovieDetails();
      return;
    }

    if (updateType === UpdateType.ERROR_ADD_COMMENT) {
      this.#movieForm.isError = true;
      this.#movieCommentsView.isError = true;
    }

    this.#movieCommentsView.resetData();

    if (updateType === UpdateType.ERROR_DELETE_COMMENT) {
      this.#movieCommentsView.setErrorComment(data);
    }

    if (updateType === UpdateType.INIT) {
      this.#loading = false;
    }

    this.#updateFilters();
    this.#updateMovies();
  }

  #updateExtraMovies = () => {
    const renderTopExtra = this.topRatedMovies.length > 0;
    const renderCommentedExtra = this.mostCommentedMovies.length > 0;
    this.#renderBothExtra = renderTopExtra && renderCommentedExtra;

    if (renderTopExtra) {
      this.#renderTopMovies();
      this.#renderMovies(this.#topMoviesContainerView, this.topRatedMovies);
    }

    if (renderCommentedExtra) {
      this.#renderRecommendedMovies();
      this.#renderMovies(this.#recommendMoviesContainerView, this.mostCommentedMovies);
    }
  }
}

export default MoviesPresenter;
