import AbstractView from './abstract-view';

const getTemplate = () => '<div class="film-details__top-container"></div>';

class MovieDetailsContainerView extends AbstractView {
  get template() {
    return getTemplate();
  }
}

export default MovieDetailsContainerView;
