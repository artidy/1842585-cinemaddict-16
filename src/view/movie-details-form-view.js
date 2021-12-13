import AbstractEventView from './abstract-event-view';

const getFormTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';

class MovieDetailsFormView extends AbstractEventView {
  get template() {
    return getFormTemplate();
  }
}

export default MovieDetailsFormView;
