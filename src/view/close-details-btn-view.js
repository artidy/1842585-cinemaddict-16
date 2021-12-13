import AbstractEventView from './abstract-event-view';

const getCloseDetailsTemplate = () => '<div class="film-details__close"><button class="film-details__close-btn" type="button">close</button></div>';

class CloseDetailsBtnView extends AbstractEventView {
  get template() {
    return getCloseDetailsTemplate();
  }
}

export default CloseDetailsBtnView;
