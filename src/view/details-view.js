import AbstractEventView from './abstract-event-view';

const getTemplate = () => '<section class="film-details"></section>';

class MovieDetails extends AbstractEventView {
  get template() {
    return getTemplate();
  }
}

export default MovieDetails;
