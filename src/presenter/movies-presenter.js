import MainContainer from '../view/movies-view';
import MoviesList from '../view/movies-list-view';
import MovieContainer from '../view/movies-container-view';
import {CloseDetails, ShowMore} from '../view/buttons-view';
import MoviesEmpty from '../view/movies-empty';
import {render, RenderPosition} from '../render';
import Rating from '../view/rating-view';
import MainMenu from '../view/menu-view';
import Sorting from '../view/sort-view';
import {MAX_FILMS_EXTRA, MAX_FILMS_GAP} from '../constants';
import Statistic from '../view/statistics-view';
import {onClickCloseBtn, onKeydownEsc, onShowMoreMovies} from '../helpers/events';
import {filterFavoriteMovies, filterWatchedMovies, filterWatchingMovies} from '../helpers/filters';
import {sortMostCommentedMovies, sortTopRatedMovies} from '../helpers/sorting';
import MovieDetails from '../view/details-view';
import Movie from '../view/movie-view';
import MovieDetailsFormView from '../view/movie-details-form-view';
import MovieDetailsContainerView from '../view/movie-details-container-view';
import MovieDetailsWrap from '../view/movie-details-wrap-view';
import MovieDetailsCommentsView from '../view/movie-details-comments-view';

class MoviesPresenter {
  #header = null;
  #main = null;
  #footer = null;
  #currentUser = null;
  #movieDetails = null;
  #movies = [];
  #comments = [];
  #watchMovies = [];
  #watchedMovies = [];
  #favoriteMovies = [];
  #topRatedMovies = [];
  #recommendMovies = [];
  #moviesCards = new Map();

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
    render(this.#header,  new Rating(this.#currentUser));
    this.#renderMainMenu();
    render(this.#main, this.#mainContainer);
    render(this.#mainContainer, this.#mainMoviesList);
    if (this.#movies.length > 0) {
      render(this.#mainContainer, new Sorting(), RenderPosition.BEFOREBEGIN);
      this.#renderMainMovies();
      this.#renderMovies(this.#mainMoviesContainer, this.#movies.slice(0, MAX_FILMS_GAP));
      this.#renderTopMovies();
      this.#renderMovies(this.#topMoviesContainer, this.#topRatedMovies.slice(0, MAX_FILMS_EXTRA));
      this.#renderRecommendedMovies();
      this.#renderMovies(this.#recommendMoviesContainer, this.#recommendMovies.slice(0, MAX_FILMS_EXTRA));
      this.#renderMoreButton();
    } else {
      render(this.#mainMoviesList, new MoviesEmpty());
    }
    render(this.#footer, new Statistic(this.#movies.length));
  }

  #renderMainMenu = () => {
    render(this.#main,
      new MainMenu(
        this.#watchMovies.length,
        this.#watchedMovies.length,
        this.#favoriteMovies.length),
      RenderPosition.AFTERBEGIN
    );
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

      this.#moviesCards.set(movie.id, movieCard);

      render(container, movieCard);
      movieCard.updateControl();
    });
  }

  #renderMovieDetails = (filmCard) => {
    const movieCard = filmCard.closest('.film-card__link');

    if (movieCard) {
      if (this.#movieDetails !== null) {
        this.#movieDetails.removeElement();
      }

      const id = movieCard.dataset.id;
      const movie = this.#movies.find((item) => item.id === id);
      const {comments: commentsIds} = movie;
      const movieComments = this.#comments.filter((comment) => commentsIds.includes(comment.id));
      this.#movieDetails = new MovieDetails();
      const movieForm = new MovieDetailsFormView();
      const movieContainer = new MovieDetailsContainerView();
      const movieWrap = new MovieDetailsWrap(movie, this.#moviesCards.get(id));
      const movieClose = new CloseDetails();
      const movieCommentsView = new MovieDetailsCommentsView(movieComments);

      render(this.#main, this.#movieDetails);
      render(this.#movieDetails, movieForm);
      render(movieForm, movieContainer);
      render(movieForm, movieCommentsView);
      render(movieContainer, movieClose);
      render(movieContainer, movieWrap);
      movieWrap.updateControl();

      document.addEventListener('keydown', onKeydownEsc(this.#movieDetails));
      movieClose.addEvent('onClickCloseBtn', 'click', onClickCloseBtn(this.#movieDetails));

      document.body.classList.add('hide-overflow');
    }
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
        this.#movies,
        this.#mainMoviesContainer,
        this.#moreButton,
        this.#renderMovies)
    );
  }

  #addClickMainContainer = () => {
    this.#mainContainer.addEvent('onOpenMovieDetails', 'click', this.#onOpenMovieDetails);
  }

  #updateFilters = () => {
    this.#watchMovies = filterWatchingMovies(this.#movies);
    this.#watchedMovies = filterWatchedMovies(this.#movies);
    this.#favoriteMovies = filterFavoriteMovies(this.#movies);
  }

  #updateSorting = () => {
    this.#topRatedMovies = sortTopRatedMovies(this.#movies);
    this.#recommendMovies = sortMostCommentedMovies(this.#movies);
  }
}

export default MoviesPresenter;
