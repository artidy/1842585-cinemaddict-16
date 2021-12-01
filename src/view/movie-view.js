import {formatDate} from '../helpers';
import {createElement} from '../render';

const checkDescription = (description) => description.length > 140 ? `${description.slice(0, 140)}...` : description;

const getFilmTemplate = ({id, title, rating, releaseDate, duration, genres, poster, description, comments}) =>
  `<article class="film-card">
    <a class="film-card__link" data-id="${id}">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(releaseDate, 'YYYY')}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres.join(' ')}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${checkDescription(description)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;

class Movie {
  #element = null;
  #movie = null;

  constructor(movie) {
    this.#movie = movie;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getFilmTemplate(this.#movie);
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default Movie;
