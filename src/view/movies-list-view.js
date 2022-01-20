import AbstractView from './abstract-view';

const getMoviesListTemplate = (header, isExtra, showHeader) =>
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${showHeader ? '' : 'visually-hidden'}">${header}</h2>
  </section>`;

class MoviesListView extends AbstractView {
  #header = null;
  #isExtra = null;
  #showHeader = false;

  constructor(header, isExtra, showHeader = false) {
    super();

    this.#header = header;
    this.#isExtra = isExtra;
    this.#showHeader = showHeader;
  }

  get template() {
    return getMoviesListTemplate(this.#header, this.#isExtra, this.#showHeader);
  }
}

export default MoviesListView;
