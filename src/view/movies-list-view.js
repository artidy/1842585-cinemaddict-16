import AbstractView from './abstract-view';

const getMoviesListTemplate = (header) => `<section class="films-list"><h2 class="films-list__title visually-hidden">${header}</h2></section>`;

const getMoviesListExtraTemplate = (header) => `<section class="films-list films-list--extra"><h2 class="films-list__title">${header}</h2></section>`;

class MoviesList extends AbstractView {
  #header = null;
  #isExtra = null;

  constructor(header, isExtra) {
    super();
    this.#header = header;
    this.#isExtra = isExtra;
  }

  get template() {
    return this.#isExtra ? getMoviesListExtraTemplate(this.#header) : getMoviesListTemplate(this.#header);
  }
}

export default MoviesList;
