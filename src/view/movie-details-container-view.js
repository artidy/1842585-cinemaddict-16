import AbstractView from './abstract-view';

const getMovieDetailsContainerTemplate = () => '<div class="film-details__top-container"></div>';

class MovieDetailsContainerView extends AbstractView {
  get template() {
    return getMovieDetailsContainerTemplate();
  }
}

export default MovieDetailsContainerView;
