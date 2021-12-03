import AbstractView from './abstract-view';

class AbstractEventView extends AbstractView {

  constructor() {
    super();
    if (new.target === AbstractEventView) {
      throw Error('You couldn\'t create class instance from abstract class.');
    }
  }

  addEvent = (eventName, callback, element = this.element) => {
    element.addEventListener(eventName, callback);
  }

  removeEvent = (eventName, callback, element = this.element) => {
    element.removeEventListener(eventName, callback);
  }
}

export default AbstractEventView;
