import AbstractView from './abstract-view';

const getMoviesTemplate = () => '<section class="films"></section>';

class MainContainer extends AbstractView {
  get template() {
    return getMoviesTemplate();
  }
}

export default MainContainer;
