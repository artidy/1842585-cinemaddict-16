import {createElement} from '../render';

const getMoviesListTemplate = (header) => `<section class="films-list"><h2 class="films-list__title visually-hidden">${header}</h2></section>`;

const getMoviesListExtraTemplate = (header) => `<section class="films-list films-list--extra"><h2 class="films-list__title">${header}</h2></section>`;

class MoviesList {
  #element = null;
  #header = null;
  #isExtra = null;

  constructor(header, isExtra) {
    this.#header = header;
    this.#isExtra = isExtra;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return this.#isExtra ? getMoviesListExtraTemplate(this.#header) : getMoviesListTemplate(this.#header);
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default MoviesList;
