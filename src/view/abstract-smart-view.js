import AbstractEventView from './abstract-event-view';

class AbstractSmartView extends AbstractEventView {
  #data = {}

  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this.#data = {...this.data, ...update};

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement = () => {
    this.replaceElement();
    this.clearEvents();
    this.restoreHandlers();
  }

  restoreHandlers = () => {
    throw new Error('Необходимо реализовать метод restoreHandlers');
  }
}

export default AbstractSmartView;
