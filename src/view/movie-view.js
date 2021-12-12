import {formatDate} from '../helpers/common';
import AbstractView from './abstract-view';
import {Controls} from './buttons-view';
import {render} from '../render';

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
  </article>`;

class Movie extends AbstractView {
  #control = null;
  #movie = {
    id: '',
    title: '',
    rating: '',
    releaseDate: '',
    duration: '',
    genres: [],
    poster: '',
    description: '',
    comments: ''
  };

  constructor(movie) {
    super();

    this.#movie = movie;
    this.#control = new Controls(movie);
  }

  get template() {
    return getFilmTemplate(this.#movie);
  }

  updateControl = () => {
    this.#control.removeElement();
    render(this.element, this.#control.element);
  }
}

export default Movie;
