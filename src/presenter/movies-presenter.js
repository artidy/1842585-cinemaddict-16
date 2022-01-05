import MainContainer from '../view/movies-view';
import MoviesList from '../view/movies-list-view';
import MoviesContainer from '../view/movies-container-view';
import MoviesEmpty from '../view/movies-empty';
import {render, RenderPosition} from '../render';
import Rating from '../view/rating-view';
import MainMenu from '../view/menu-view';
import Sorting from '../view/sort-view';
import {ActionType, FilterType, MAX_FILMS_EXTRA, MAX_FILMS_GAP, MIN_FILMS, SortType} from '../constants';
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

class MoviesPresenter {
  #header = null;
  #main = null;
  #footer = null;
  #moviesModel = null;
  #filterModel = null;
  #sortModel = null;
  #commentsModel = null;
  #currentUser = null;
  #movieDetails = null;
  #watchMovies = [];
  #watchedMovies = [];
  #favoriteMovies = [];
  #currentMoviesGap = MAX_FILMS_GAP;

  #mainContainer = new MainContainer();
  #mainMoviesList = new MoviesList('All movies. Upcoming', false);
  #topMoviesList = new MoviesList('Top rated', true);
  #recommendMoviesList = new MoviesList('Most commented', true);
  #mainMoviesContainer = new MoviesContainer();
  #topMoviesContainer = new MoviesContainer();
  #recommendMoviesContainer = new MoviesContainer();
  #sortingMenu = null;
  #moreButton = new ShowMoreBtnView();
  #mainMenu = new MainMenu();
  #movieWrap = new MovieDetailsWrap();
  #movieCommentsView = null;
  #movieDetailsContainer = new MovieDetailsContainerView();
  #movieDetailsClose = new CloseDetailsBtnView();
  #movieForm = new MovieDetailsFormView();

  constructor(header, main, footer, moviesModel, filterModel, sortModel, commentsModel) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#sortModel = sortModel;
    this.#commentsModel = commentsModel;
    this.#sortingMenu = new Sorting(this.#sortModel.currentSort);

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

  load = (currentUser) => {
    this.#currentUser = {...currentUser};

    render(this.#header,  new Rating(this.#currentUser));
    this.#renderMainMenu();
    render(this.#main, this.#mainContainer);
    render(this.#mainContainer, this.#mainMoviesList);

    if (this.movies.length === 0) {
      render(this.#mainMoviesList, new MoviesEmpty());
      return;
    }

    this.#renderSortMenu(this.#sortModel.currentSort);
    this.#renderMainMovies();
    this.#renderMovies(this.#mainMoviesContainer, this.movies.slice(MIN_FILMS, this.#currentMoviesGap));
    this.#updateExtraMovies();
    this.#renderMoreButton();
    render(this.#footer, new Statistic(this.#moviesModel.movies.length));
  }

  #renderMainMenu = () => {
    this.#updateFilters();
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

  #renderMovieDetails = (movie) => {
    if (this.#movieDetails !== null) {
      this.#movieWrap.removeElement();
      this.#movieDetailsClose.removeElement();
      this.#movieDetailsContainer.removeElement();
      this.#movieDetails.removeElement();
      this.#movieCommentsView.removeElement();
      this.#movieForm.removeElement();
    }

    const {comments: commentsIds} = movie;
    const movieComments = this.#commentsModel.comments.filter((comment) => commentsIds.includes(comment.id));
    this.#movieDetails = new MovieDetails();
    this.#movieWrap.movie = movie;
    this.#movieCommentsView = new MovieDetailsCommentsView(movie.id, movieComments);

    render(this.#main, this.#movieDetails);
    render(this.#movieDetails, this.#movieForm);
    render(this.#movieForm, this.#movieDetailsContainer);
    render(this.#movieForm, this.#movieCommentsView);
    this.#movieCommentsView.restoreHandlers(this.#handleViewAction);
    this.#movieForm.restoreHandlers(this.#handleViewAction);
    render(this.#movieDetailsContainer, this.#movieDetailsClose);
    render(this.#movieDetailsContainer, this.#movieWrap);
    this.#addNewControl(this.#movieWrap, movie, true, RenderPosition.AFTEREND);

    document.addEventListener('keydown', onKeydownEsc(this.#movieDetails));
    this.#movieDetailsClose.addEvent('onClickCloseBtn', 'click', onClickCloseBtn(this.#movieDetails));

    document.body.classList.add('hide-overflow');
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
    const movie = this.movies.find((item) => item.id === id);

    this.#renderMovieDetails(movie);
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
    this.#mainMenu.updateElement(
      this.#handleViewAction,
      this.#watchMovies.length,
      this.#watchedMovies.length,
      this.#favoriteMovies.length,
    );
    this.#mainMoviesList.removeElement();
    this.#topMoviesList.removeElement();
    this.#recommendMoviesList.removeElement();
    this.#sortingMenu.removeElement();
    this.#mainMoviesContainer.removeElement();
    this.#topMoviesContainer.removeElement();
    this.#recommendMoviesContainer.removeElement();
    this.#moreButton.removeElement();

    if (this.#filterModel.currentFilter === FilterType.STATS) {
      return;
    }

    if (this.movies.length === 0) {
      render(this.#mainMoviesList, new MoviesEmpty());
      return;
    }

    this.#sortingMenu.updateElement(this.#sortModel.currentSort);
    this.#renderSortMenu();
    render(this.#mainContainer, this.#mainMoviesList);
    this.#renderMainMovies();
    render(this.#mainMoviesList, this.#mainMoviesContainer);
    this.#renderMovies(this.#mainMoviesContainer, this.movies.slice(MIN_FILMS, this.#currentMoviesGap));
    this.#updateExtraMovies();

    if (this.#movieDetails !== null) {
      this.#updateMovieDetails();
    }

    this.#renderMoreButton();
  }

  #updateMovieDetails = () => {
    if (this.#movieDetails === null) {
      return;
    }

    const {comments: commentsIds} = this.#movieWrap.movie;
    this.#movieCommentsView.comments = this.#commentsModel.comments.filter((comment) => commentsIds.includes(comment.id));
    this.#movieCommentsView.updateElement(this.#handleViewAction);
    this.#movieDetailsContainer.replaceElement();
    this.#movieWrap.replaceElement();
    render(this.#movieDetailsContainer, this.#movieDetailsClose);
    render(this.#movieDetailsContainer, this.#movieWrap);
    this.#addNewControl(this.#movieWrap, this.#movieWrap.movie, true, RenderPosition.AFTEREND);
    this.#movieDetailsClose.addEvent('onClickCloseBtn', 'click', onClickCloseBtn(this.#movieDetails));
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
        this.#moviesModel.addComment(data.movieId, data.id);
        this.#commentsModel.addComment(data);
        break;
    }
  }

  #handleModelEvent = () => {
    this.#updateFilters();
    this.#updateMovies();
  }

  #updateExtraMovies = () => {
    this.#renderTopMovies();
    this.#renderMovies(this.#topMoviesContainer, this.topRatedMovies);
    this.#renderRecommendedMovies();
    this.#renderMovies(this.#recommendMoviesContainer, this.mostCommentedMovies);
  }
}

export default MoviesPresenter;
