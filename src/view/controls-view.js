import dayjs from 'dayjs';
import AbstractSmartView from './abstract-smart-view';
import {ActionType, EMPTY_MOVIE, FilterType, UpdateType} from '../constants';

const getControlsDetailsTemplate = ({isInWatchlist, isWatched, isFavorite}) =>
  `<section class="film-details__controls">
    <button
      type="button"
      class="film-details__control-button film-details__control-button--watchlist ${isInWatchlist ? 'film-details__control-button--active' : ''}"
      id="watchlist"
      name="${FilterType.WATCHLIST}"
    >${isInWatchlist ? 'Already in watchlist' : 'Add to watchlist'}</button>
    <button
      type="button"
      class="film-details__control-button film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}"
      id="watched"
      name="${FilterType.HISTORY}"
    >${isWatched ? 'Already watched' : 'Add to watched'}</button>
    <button
      type="button"
      class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}"
      id="favorite"
      name="${FilterType.FAVORITES}"
    >${isFavorite ? 'Already favorite' : 'Add to favorites'}</button>
  </section>`;

const getControlsTemplate = ({isInWatchlist, isWatched, isFavorite}) =>
  `<div class="film-card__controls">
    <button
      class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isInWatchlist ? 'film-card__controls-item--active' : ''}"
      type="button"
      name="${FilterType.WATCHLIST}"
    >${isInWatchlist ? 'Already in watchlist' : 'Add to watchlist'}</button>
    <button
      class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}"
      type="button"
      name="${FilterType.HISTORY}"
    >${isWatched ? 'Already watched' : 'Add to watched'}</button>
    <button
      class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}"
      type="button"
      name="${FilterType.FAVORITES}"
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

  get template() {
    return this.#isDetails ? getControlsDetailsTemplate(this.#movie)
      : getControlsTemplate(this.#movie);
  }

  #toggleWatchlist = () => {
    this.#movie.isInWatchlist = !this.#movie.isInWatchlist;
  }

  #toggleWatched = () => {
    this.#movie.isWatched = !this.#movie.isWatched;
    this.#movie.watchingDate = this.#movie.isWatched ? dayjs().toDate() : null;
  }

  #toggleFavorite = () => {
    this.#movie.isFavorite = !this.#movie.isFavorite;
  }

  #onClickControls = (updateElement) => (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      switch(evt.target.getAttribute('name')) {
        case FilterType.WATCHLIST:
          this.#toggleWatchlist();
          break;
        case FilterType.HISTORY:
          this.#toggleWatched();
          break;
        case FilterType.FAVORITES:
          this.#toggleFavorite();
          break;
      }

      updateElement(ActionType.UPDATE_MOVIE, UpdateType.MINOR, this.#movie);
    }
  }

  updateControl = () => {
    const currentMovieControls = ControlsView.#controls.get(this.#movie.id);

    if (currentMovieControls) {
      currentMovieControls.forEach((control) => {
        control.updateData(this.#movie, false);
      });
    }
  }

  updateElement = (updateElement) => {
    this.replaceElement();
    this.clearEvents();
    this.restoreHandlers(updateElement);
  }

  restoreHandlers = (updateElement) => {
    this.addEvent('onClickControls', 'click', this.#onClickControls(updateElement));
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
}

export default ControlsView;
