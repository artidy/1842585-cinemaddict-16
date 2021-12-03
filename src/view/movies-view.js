import AbstractEventView from './abstract-event-view';

const getMoviesTemplate = () => '<section class="films"></section>';

class MainContainer extends AbstractEventView {
  get template() {
    return getMoviesTemplate();
  }
}

export default MainContainer;
