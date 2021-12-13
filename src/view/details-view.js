import AbstractEventView from './abstract-event-view';

const getMovieDetailsTemplate = () => '<section class="film-details"></section>';

class MovieDetails extends AbstractEventView {
  get template() {
    return getMovieDetailsTemplate();
  }
}

export default MovieDetails;
