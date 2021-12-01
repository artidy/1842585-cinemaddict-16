import {createElement} from '../render';

const getMoviesTemplate = () => '<section class="films"></section>';

class MainContainer {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getMoviesTemplate();
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default MainContainer;
