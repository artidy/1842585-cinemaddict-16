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

  replaceElement = () => {
    if (this.#element && this.#element.parentElement) {
      const prevElement = this.#element;
      const parent = prevElement.parentElement;

      this.#element = null;

      const newElement = this.element;

      parent.replaceChild(newElement, prevElement);
    }
  }

  removeElement = () => {
    if (this.#element) {
      this.#element.remove();
      this.#element = null;
    }
  }
}

export default AbstractView;
