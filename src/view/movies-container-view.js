import {createElement} from '../render';

const generateMoviesContainer = () => '<div class="films-list__container"></div>';

class MovieContainer {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return generateMoviesContainer();
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default MovieContainer;
