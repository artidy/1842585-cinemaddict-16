import AbstractView from './abstract-view';

const getMoviesContainerTemplate = () => '<div class="films-list__container"></div>';

class MoviesContainerView extends AbstractView {
  get template() {
    return getMoviesContainerTemplate();
  }
}

export default MoviesContainerView;
