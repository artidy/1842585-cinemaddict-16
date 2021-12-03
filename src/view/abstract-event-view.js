import AbstractView from './abstract-view';

class AbstractEventView extends AbstractView {
  #events = {};

  constructor() {
    super();

    if (new.target === AbstractEventView) {
      throw Error('You couldn\'t create class instance from abstract class.');
    }
  }

  addEvent = (eventTitle, event, callback, element = this.element) => {
    this.#events[eventTitle] = callback;
    element.addEventListener(event, callback);
  }

  removeEvent = (eventTitle, event, element = this.element) => {
    element.removeEventListener(event, this.#events[eventTitle]);
    delete this.#events[eventTitle];
  }
}

export default AbstractEventView;
