import AbstractSmartView from './abstract-smart-view';
import {EMPTY_MOVIE, UpdateType} from '../constants';

const getControlsDetailsTemplate = ({isInWatchlist, isWatched, isFavorite}) =>
  `<section class="film-details__controls">
    <button
      type="button"
      class="film-details__control-button film-details__control-button--watchlist ${isInWatchlist ? 'film-details__control-button--active' : ''}"
      id="watchlist"
      name="watchlist"
    >${isInWatchlist ? 'Already in watchlist' : 'Add to watchlist'}</button>
    <button
      type="button"
      class="film-details__control-button film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}"
      id="watched"
      name="watched"
    >${isWatched ? 'Already watched' : 'Add to watched'}</button>
    <button
      type="button"
      class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}"
      id="favorite"
      name="favorite"
    >${isFavorite ? 'Already favorite' : 'Add to favorites'}</button>
  </section>`;

const getControlsTemplate = ({isInWatchlist, isWatched, isFavorite}) =>
  `<div class="film-card__controls">
    <button
      class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isInWatchlist ? 'film-card__controls-item--active' : ''}"
      type="button"
      name="watchlist"
    >${isInWatchlist ? 'Already in watchlist' : 'Add to watchlist'}</button>
    <button
      class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}"
      type="button"
      name="watched"
    >${isWatched ? 'Already watched' : 'Add to watched'}</button>
    <button
      class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}"
      type="button"
      name="favorite"
    >${isFavorite ? 'Already favorite' : 'Add to favorites'}</button>
  </div>`;

class ControlsView extends AbstractSmartView {
  static #controls = new Map();
  #movie = EMPTY_MOVIE;
  #isDetails = false;

  constructor(movie, isDetails = false) {
    super();

    this.#movie = movie;
    this.#isDetails = isDetails;
  }

  #toggleWatchlist = () => {
    this.#movie.isInWatchlist = !this.#movie.isInWatchlist;
  }

  #toggleWatched = () => {
    this.#movie.isWatched = !this.#movie.isWatched;
  }

  #toggleFavorite = () => {
    this.#movie.isFavorite = !this.#movie.isFavorite;
  }

  get template() {
    return this.#isDetails ? getControlsDetailsTemplate(this.#movie)
      : getControlsTemplate(this.#movie);
  }

  updateControl = () => {
    const currentMovieControls = ControlsView.#controls.get(this.#movie.id);

    if (currentMovieControls) {
      currentMovieControls.forEach((control) => {
        control.updateData(this.#movie, false);
      });
    }
  }

  static addControl = (movie, control) => {
    const mainControls  = ControlsView.#controls.get(movie.id);

    if (mainControls) {
      mainControls.push(control);
    } else {
      ControlsView.#controls.set(movie.id, [control]);
    }
  }

  static clearControl = () => {
    ControlsView.#controls = new Map();
  }

  updateElement = (updateElement) => {
    this.replaceElement();
    this.clearEvents();
    this.restoreHandlers(updateElement);
  }

  restoreHandlers = (updateElement) => {
    this.addEvent('onClickControls', 'click', this.#onClickControls(updateElement));
  }

  #onClickControls = (updateElement) => (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      switch(evt.target.getAttribute('name')) {
        case 'watchlist':
          this.#toggleWatchlist();
          break;
        case 'watched':
          this.#toggleWatched();
          break;
        case 'favorite':
          this.#toggleFavorite();
          break;
      }
      updateElement(UpdateType.MINOR, this.#movie);
    }
  }
}

export default ControlsView;
