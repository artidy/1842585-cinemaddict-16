import AbstractView from './abstract-view';
import ControlsView from './controls-view';
import {formatDate} from '../helpers/common';
import {render} from '../render';

const checkDescription = (description) => description.length > 140 ? `${description.slice(0, 140)}...` : description;

const getMovieTemplate = ({id, title, rating, releaseDate, duration, genres, poster, description, comments}) =>
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
  #extraMovies = new Set();
  #mainCard = null;
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

  constructor(movie, mainCard = null) {
    super();

    this.#movie = movie;
    this.#mainCard = mainCard;
    this.#control = new ControlsView(movie);
  }

  get template() {
    return getMovieTemplate(this.#movie);
  }

  addExtra = (movieCard) => {
    this.#extraMovies.add(movieCard);
  }

  updateControl = (updateMainCard = true, extraElement = null) => {
    this.#control.removeElement();
    render(this.element, this.#control.element);
    this.#control.addEvent('onClickControls', 'click', this.#control.onClickControls(this.updateControl));

    if (this.#mainCard && updateMainCard) {
      this.#mainCard.updateControl(this);
    }

    this.#extraMovies.forEach((movie) => {
      if (extraElement !== movie) {
        movie.updateControl(false);
      }
    });
  }
}

export default Movie;
