import AbstractView from './abstract-view';

class AbstractEventView extends AbstractView {

  constructor() {
    super();
    if (new.target === AbstractEventView) {
      throw Error('You couldn\'t create class instance from abstract class.');
    }
  }

  addEvent = (element = this.element, eventName, callback) => {
    element.addEventListener(eventName, callback);
  }

  removeEvent = (element = this.element, eventName, callback) => {
    element.removeEventListener(eventName, callback);
  }
}

export default AbstractEventView;
