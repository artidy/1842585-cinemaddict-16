import {createElement} from '../render';

const getMoviesEmptyTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

class MoviesEmpty {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getMoviesEmptyTemplate();
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default MoviesEmpty;
