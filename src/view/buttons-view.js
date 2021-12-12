import AbstractEventView from './abstract-event-view';
import {EMPTY_MOVIE} from '../constants';

const getShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

const getCloseDetailsTemplate = () => '<div class="film-details__close"><button class="film-details__close-btn" type="button">close</button></div>';

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

class ShowMore extends AbstractEventView {
  get template() {
    return getShowMoreTemplate();
  }
}

class CloseDetails extends AbstractEventView {
  get template() {
    return getCloseDetailsTemplate();
  }
}

class Controls extends AbstractEventView {
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

  onClickControls = (updateElement) => (evt) => {
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
      updateElement();
    }
  }
}

export {ShowMore, CloseDetails, Controls};
