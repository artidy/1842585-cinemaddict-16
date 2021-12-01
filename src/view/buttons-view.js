import {createElement} from '../render';

const getShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMore {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getShowMoreTemplate();
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export {ShowMore};
