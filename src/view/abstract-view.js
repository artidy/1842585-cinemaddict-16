import {createElement} from '../render';

class AbstractView {
  #element = null;

  constructor() {
    if (new.target === AbstractView) {
      throw Error('You couldn\'t create class instance from abstract class.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return 'You should override template method.';
  }

  removeElement = () => {
    if (this.#element) {
      this.#element.remove();
      this.#element = null;
    }
  }
}

export default AbstractView;
