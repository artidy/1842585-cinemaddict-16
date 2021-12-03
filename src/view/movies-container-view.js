import AbstractView from './abstract-view';

const generateMoviesContainer = () => '<div class="films-list__container"></div>';

class MovieContainer extends AbstractView {
  get template() {
    return generateMoviesContainer();
  }
}

export default MovieContainer;
