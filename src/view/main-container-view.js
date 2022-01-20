import AbstractEventView from './abstract-event-view';

const getMainContainerTemplate = () => '<section class="films"></section>';

class MainContainerView extends AbstractEventView {
  get template() {
    return getMainContainerTemplate();
  }
}

export default MainContainerView;
